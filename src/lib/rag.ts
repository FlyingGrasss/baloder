import vectorstore from "../data/vectorstore.json";
import { CONFIG } from "./config";
import { embedQuery } from "./embeddings";
import type { ChatMessage, RetrievedChunk } from "./types";

type VectorChunk = {
  id: number;
  text: string;
  breadcrumb?: string;
  section_title?: string;
  embedding: number[];
};

const chunks = vectorstore.chunks as VectorChunk[];

const RETRIEVAL_STOP_WORDS = new Set([
  "acaba",
  "bir",
  "bu",
  "da",
  "de",
  "hangi",
  "hakkında",
  "ile",
  "kim",
  "kimdir",
  "mi",
  "mı",
  "mu",
  "mü",
  "nasıl",
  "ne",
  "nedir",
  "nelerdir",
  "olan",
  "ve",
  "ya",
]);

function retrievalTokens(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFC")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(
      (token) => token.length >= 3 && !RETRIEVAL_STOP_WORDS.has(token),
    );
}

const BAL_TOPIC_TERMS = [
  "bal",
  "bornova",
  "okul",
  "lise",
  "lgs",
  "yks",
  "hazırlık",
  "kayıt",
  "nakil",
  "öğrenci",
  "öğretmen",
  "müdür",
  "ders",
  "sınav",
  "puan",
  "yüzdelik",
  "kontenjan",
  "pansiyon",
  "yurt",
  "kampüs",
  "ayran günü",
  "balev",
  "balmed",
  "balöder",
  "balpod",
  "balspor",
  "balkoop",
  "ege tanrıverdi",
  "emre bozkurt",
  "burak güldilek",
  "tiyatro",
  "müzik",
  "spor",
  "dsd",
  "delf",
  "dalf",
  "pasch",
  "advanced placement",
  "kulüp",
  "topluluk",
  "ulaşım",
  "servis",
  "otobüs",
  "metro",
  "forma",
  "devamsızlık",
  "kantin",
  "kütüphane",
  "rehberlik",
  "yabancı dil",
  "ingilizce",
  "almanca",
  "fransızca",
  "mezun",
  "öğle arası",
  "öğle yemeği",
  "kahvaltı",
  "akşam yemeği",
  "giriş saati",
  "çıkış saati",
  "olimpiyat",
  "bilim",
  "matematik",
  "tübitak",
  "teknofest",
  "yarışma",
  "ballama",
  "gelenek",
] as const;

const VAGUE_FOLLOW_UP = /^(tell me more|more|devam|devam et|biraz daha anlat|daha fazla anlat|detaylandır|detay verir misin|peki|neden|nasıl yani|ne demek|nedir|ne dir)[?.!\s]*$/iu;
const SEARCH_GROUNDING_TERMS = [
  "güncel",
  "şu an",
  "bugün",
  "bu yıl",
  "gelecek yıl",
  "önümüzdeki yıl",
  "en son",
  "son durum",
  "yeni müdür",
  "kim olacak",
  "değişti mi",
  "internetten",
  "webden",
  "web'den",
  "google'da",
  "araştır",
  "current",
  "latest",
  "today",
  "search the web",
] as const;

export function buildRetrievalQuery(message: string, history: ChatMessage[]) {
  if (!VAGUE_FOLLOW_UP.test(message.trim())) return message;
  const previousUserMessage = [...history]
    .reverse()
    .find((item) => item.role === "user")?.content;
  return previousUserMessage ? `${previousUserMessage}\n${message}` : message;
}

export function isBalRelatedQuery(query: string) {
  const normalized = query.toLocaleLowerCase("tr-TR");
  if (BAL_TOPIC_TERMS.some((term) => normalized.includes(term))) return true;

  const queryTokens = retrievalTokens(query);
  if (queryTokens.length < 2) return false;

  return chunks.some((chunk) => {
    const source = chunk.text.toLocaleLowerCase("tr-TR");
    const matchedTokens = queryTokens.filter((token) => source.includes(token));
    return matchedTokens.length >= 2;
  });
}

export function shouldUseGoogleSearch(query: string) {
  const normalized = query.toLocaleLowerCase("tr-TR");
  return SEARCH_GROUNDING_TERMS.some((term) => normalized.includes(term));
}

export async function retrieve(query: string, topK = CONFIG.retrievalTopK): Promise<RetrievedChunk[]> {
  const queryEmbedding = await embedQuery(query);
  const normalizedQuery = query.trim().toLocaleLowerCase("tr-TR");
  const queryTokens = retrievalTokens(query);
  const exactMatches = chunks
    .filter((chunk) =>
      chunk.text.toLocaleLowerCase("tr-TR").includes(normalizedQuery),
    )
    .map((chunk) => ({ ...chunk, relevance_score: 1 }));

  const exactIds = new Set(exactMatches.map((chunk) => chunk.id));
  const lexicalMatches = chunks
    .filter((chunk) => !exactIds.has(chunk.id) && queryTokens.length >= 2)
    .map((chunk) => {
      const source = chunk.text.toLocaleLowerCase("tr-TR");
      const matchedTokens = queryTokens.filter((token) => source.includes(token));
      return {
        ...chunk,
        relevance_score:
          0.9 + 0.1 * (matchedTokens.length / queryTokens.length),
        matchedTokenCount: matchedTokens.length,
      };
    })
    .filter((chunk) => chunk.matchedTokenCount >= 2)
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .map(({ matchedTokenCount: _matchedTokenCount, ...chunk }) => chunk);
  const lexicalIds = new Set(lexicalMatches.map((chunk) => chunk.id));
  const semanticMatches = chunks
    .map((chunk) => ({
      ...chunk,
      relevance_score: dot(queryEmbedding, chunk.embedding),
    }))
    .filter((chunk) => !exactIds.has(chunk.id) && !lexicalIds.has(chunk.id));

  return [...exactMatches, ...lexicalMatches, ...semanticMatches]
    .sort((a, b) => b.relevance_score - a.relevance_score)
    .slice(0, topK)
    .map(({ embedding: _embedding, ...chunk }) => chunk);
}

export function formatContext(retrieved: RetrievedChunk[], threshold = CONFIG.retrievalScoreThreshold) {
  if (!retrieved.length) return "Bağlamda ilgili bilgi bulunamadı.";

  const parts = retrieved
    .filter((chunk) => chunk.relevance_score >= threshold)
    .map((chunk) => `[Kaynak: ${chunk.breadcrumb || ""}]\n${chunk.text}`);

  return parts.length ? parts.join("\n\n---\n\n") : "Bağlamda yeterince ilgili bilgi bulunamadı.";
}

export function buildAugmentedUserMessage(userInput: string, context: string) {
  const normalized = userInput.toLocaleLowerCase("tr-TR");
  const exactContactContext =
    /(adres|telefon|iletişim)/u.test(normalized)
      ? `## Öncelikli İletişim Bilgisi\n\nTam resmî adres: Mevlana Mahallesi, Ord. Prof. Dr. Muhiddin Erel Caddesi, Bornova Anadolu Lisesi Blok No: 15A, Bornova / İzmir\nTelefon: 0232 388 10 39\n\nAdres sorusunu yanıtlarken bu tam adresi kullan; yalnızca IKEA, Yeni Garaj Yolu veya Altay Ticaret Meslek Lisesi gibi konum tarifleriyle yetinme.\n\n---\n\n`
      : "";

  return `${exactContactContext}## İlgili Bağlam (Okul Bilgi Kaynağı)\n\n${context}\n\n---\n\n## Kullanıcı Sorusu\n\n${userInput}`;
}

export function buildSourcesPayload(retrieved: RetrievedChunk[], threshold = CONFIG.retrievalScoreThreshold) {
  return retrieved
    .slice(0, 3)
    .filter((chunk) => chunk.relevance_score >= threshold)
    .map((chunk) => ({
      breadcrumb: chunk.breadcrumb || "",
      score: Math.round(chunk.relevance_score * 1000) / 1000,
    }));
}

function dot(a: number[], b: number[]) {
  let score = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i += 1) score += a[i] * b[i];
  return score;
}
