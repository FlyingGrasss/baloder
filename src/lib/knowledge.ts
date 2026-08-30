import { createHash } from "node:crypto";
import knowledgeBase from "../data/knowledge-base.json";
import type { ChatMessage } from "./types";

type KnowledgeBase = {
  schema_version: number;
  source_file: string;
  source_sha256: string;
  approximate_tokens: number;
  content: string;
};

const source = knowledgeBase as KnowledgeBase;
const BAL_TOPIC_TERMS = [
  "bal",
  "bornova anadolu",
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
  "balev",
  "balmed",
  "balöder",
  "balpod",
  "balspor",
  "balkoop",
  "bal times",
  "bal asistan",
  "ege tanrıverdi",
  "emre bozkurt",
  "burak güldilek",
  "sekreterlik",
  "dernek",
  "bağış",
  "burs",
  "kantin",
  "kütüphane",
  "rehberlik",
  "mezun",
  "öğle arası",
  "ulaşım",
  "servis",
  "otobüs",
  "metro",
  "kulüp",
  "topluluk",
  "ballama",
] as const;

const SEARCH_GROUNDING_PATTERNS = [
  /\bgüncel\b/iu,
  /\bşu an\b/iu,
  /\bbugün\b/iu,
  /\bbu yıl\b/iu,
  /\bgelecek yıl\b/iu,
  /\bönümüzdeki yıl\b/iu,
  /\ben son\b/iu,
  /\bson durum\b/iu,
  /\byeni müdür\b/iu,
  /\bkim olacak\b/iu,
  /\bdeğişti mi\b/iu,
  /\binternetten\b/iu,
  /\bwebden\b/iu,
  /\bweb'den\b/iu,
  /\bgoogle'da\b/iu,
  /\baraştır\b/iu,
  /\bcurrent\b/iu,
  /\blatest\b/iu,
  /\btoday\b/iu,
  /\bsearch the web\b/iu,
] as const;

const VAGUE_FOLLOW_UP =
  /^(?:(?:peki|ve)\s+)?(?:tell me more|more|devam(?: et)?|biraz daha anlat|daha fazla anlat|detaylandır|detay verir misin|neden|nasıl yani|ne demek|nedir|ne dir|şu ana kadar ne yaptı(?:lar)?|şu ana kadar neler yaptı(?:lar)?|neler yaptı(?:lar)?|ne yaptı(?:lar)?|faaliyetleri nelerdir|faaliyetleri neler)[?.!\s]*$/iu;

if (createHash("sha256").update(source.content, "utf8").digest("hex") !== source.source_sha256) {
  throw new Error("knowledge-base.json içerik hash'i kayıtlı kaynak hash'iyle eşleşmiyor.");
}

export const KNOWLEDGE_BASE = source.content;
export const KNOWLEDGE_BASE_SOURCE = source.source_file;

type KnowledgeChunk = {
  text: string;
  tokens: string[];
};

const KNOWLEDGE_CHUNKS = chunkKnowledgeBase(KNOWLEDGE_BASE);
const KNOWLEDGE_INDEX = buildKnowledgeIndex(KNOWLEDGE_CHUNKS);
export const KNOWLEDGE_CONTEXT_STRATEGY = "contextual-bm25";
export const KNOWLEDGE_CONTEXT_MAX_CHUNKS = 6;

export function buildKnowledgeContext(query: string) {
  const focused = buildFocusedKnowledgeContext(query);
  if (focused) return focused;

  const queryTokens = [...new Set(knowledgeTokens(query))];
  const ranked = KNOWLEDGE_CHUNKS
    .map((chunk) => ({
      text: chunk.text,
      score: bm25Score(queryTokens, chunk.tokens, KNOWLEDGE_INDEX),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, KNOWLEDGE_CONTEXT_MAX_CHUNKS)
    .map((chunk) => chunk.text);

  // Keep the verified source as a safe fallback for a BAL query whose terms
  // are too unusual for the local lexical index.
  if (!ranked.length) return KNOWLEDGE_BASE;
  return ranked.map((chunk) => `[Bilgi bölümü]\n${chunk}`).join("\n\n---\n\n");
}

function buildFocusedKnowledgeContext(query: string) {
  const normalized = query.toLocaleLowerCase("tr-TR");
  const sectionLabels =
    normalized.includes("tarihçe") || normalized.includes("tarihçesi")
      ? ["1.3 Tarihçe"]
      : normalized.includes("olimpiyat") && normalized.includes("matematik")
        ? ["B.3 Akademik ve Bilimsel Başarılar"]
        : ["tiyatro", "müzik", "spor"].filter((term) =>
            normalized.includes(term),
          ).length >= 2
          ? ["2.4 Müzik", "2.5 Tiyatro", "2.6 Spor"]
          : [];

  if (!sectionLabels.length) return null;

  const focusedChunks = KNOWLEDGE_CHUNKS.filter((chunk) =>
    sectionLabels.some((label) => chunk.text.includes(label)),
  );
  return focusedChunks.length
    ? focusedChunks.map((chunk) => `[Bilgi bölümü]\n${chunk.text}`).join("\n\n---\n\n")
    : null;
}

export function buildConversationQuestion(
  message: string,
  history: ChatMessage[],
) {
  const trimmedMessage = message.trim();
  if (!isVagueFollowUp(trimmedMessage)) return trimmedMessage;

  const previousUserMessage = [...history]
    .reverse()
    .find(
      (item) => item.role === "user" && !isVagueFollowUp(item.content),
    )?.content;

  return previousUserMessage
    ? `${previousUserMessage}\nTakip sorusu: ${trimmedMessage}`
    : trimmedMessage;
}

export function isBalRelatedQuery(query: string) {
  const normalized = query.toLocaleLowerCase("tr-TR");
  return BAL_TOPIC_TERMS.some((term) => {
    if (term === "bal") return /\bbal\b/iu.test(normalized);
    return normalized.includes(term);
  });
}

export function shouldUseGoogleSearch(query: string) {
  const normalized = query
    .toLocaleLowerCase("tr-TR")
    .replace(/\bşu ana kadar\b/giu, "");
  return SEARCH_GROUNDING_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function buildAugmentedUserMessage(
  userInput: string,
  resolvedQuestion: string,
) {
  if (userInput.trim() === resolvedQuestion.trim()) {
    return `## Kullanıcı Sorusu\n\n${userInput}`;
  }

  return `## Güncel Kullanıcı Sorusu\n\n${userInput}\n\n## Çözülen Konu\n\n${resolvedQuestion}\n\nBu, çözülen konuya ilişkin güncel bir takip sorusudur. Güncel soruyu yanıtla ve yanıtın ilk cümlesinde çözülen konunun öznesini açıkça belirt.`;
}

export function buildSourcesPayload(isBalRelated: boolean) {
  return isBalRelated
    ? [{ breadcrumb: "BALÖDER / BAL Bilgi Kaynağı", score: 1 }]
    : [];
}

function isVagueFollowUp(message: string) {
  return VAGUE_FOLLOW_UP.test(message.trim());
}

function chunkKnowledgeBase(markdown: string, maxChars = 1200): KnowledgeChunk[] {
  const blocks = markdown
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const chunks: KnowledgeChunk[] = [];
  const headings: string[] = [];
  let current = "";

  for (const rawBlock of blocks) {
    const heading = rawBlock.match(/^(#{1,6})\s+(.+)/);
    if (heading) {
      const level = heading[1].length;
      headings.splice(level - 1);
      headings[level - 1] = heading[2].trim();
    }

    const prefix = headings.filter(Boolean).join(" > ");
    const block = prefix ? `${prefix}\n\n${rawBlock}` : rawBlock;
    if (!current) {
      current = block;
    } else if (current.length + block.length + 2 <= maxChars) {
      current += `\n\n${block}`;
    } else {
      chunks.push({ text: current, tokens: knowledgeTokens(current) });
      current = block;
    }
  }

  if (current) chunks.push({ text: current, tokens: knowledgeTokens(current) });
  return chunks;
}

function buildKnowledgeIndex(chunks: KnowledgeChunk[]) {
  const documentFrequency = new Map<string, number>();
  for (const chunk of chunks) {
    for (const token of new Set(chunk.tokens)) {
      documentFrequency.set(token, (documentFrequency.get(token) || 0) + 1);
    }
  }

  return {
    documentFrequency,
    averageLength:
      chunks.reduce((sum, chunk) => sum + chunk.tokens.length, 0) /
      Math.max(chunks.length, 1),
    documentCount: chunks.length,
  };
}

function bm25Score(
  queryTokens: string[],
  documentTokens: string[],
  index: ReturnType<typeof buildKnowledgeIndex>,
) {
  const counts = new Map<string, number>();
  for (const token of documentTokens) counts.set(token, (counts.get(token) || 0) + 1);

  let score = 0;
  for (const token of queryTokens) {
    const termFrequency = counts.get(token) || 0;
    if (!termFrequency) continue;
    const documentFrequency = index.documentFrequency.get(token) || 0;
    const idf = Math.log(
      1 + (index.documentCount - documentFrequency + 0.5) /
        (documentFrequency + 0.5),
    );
    const lengthFactor =
      1 - 0.75 + 0.75 * (documentTokens.length / index.averageLength);
    score +=
      idf *
      ((termFrequency * (1.2 + 1)) /
        (termFrequency + 1.2 * lengthFactor));
  }
  return score;
}

function knowledgeTokens(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= 2);
}
