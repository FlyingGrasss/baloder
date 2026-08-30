import { performance } from "node:perf_hooks";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.BENCHMARK_URL || "http://localhost:3000";
const runId = Date.now().toString(36);
const spacingMs = Number(process.env.BENCHMARK_SPACING_MS || 2500);

const defaultQuestionsSource = readFileSync(
  path.join(root, "src/lib/defaultQuestions.ts"),
  "utf8",
);
const questions = [...defaultQuestionsSource.matchAll(/^\s+((?:"(?:\\.|[^"\\])*")|(?:'(?:\\.|[^'\\])*'))\s*,?\s*$/gm)]
  .map((match) => JSON.parse(match[1].startsWith('"') ? match[1] : `"${match[1].slice(1, -1)}"`));

if (!questions.length) throw new Error("No default questions found.");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestQuestion(message, index) {
  const started = performance.now();
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-client-fingerprint": `default_suite_${runId}_${index}`,
    },
    body: JSON.stringify({
      message,
      session_id: `default-suite-${runId}-${index}`,
    }),
  });

  const reader = response.body?.getReader();
  if (!reader) {
    return {
      status: response.status,
      answer: await response.text(),
      firstTokenMs: null,
      totalMs: Math.round(performance.now() - started),
    };
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let answer = "";
  let firstTokenMs = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      try {
        const event = JSON.parse(line.slice(5).trim());
        if (typeof event.token === "string") {
          if (firstTokenMs === null) firstTokenMs = performance.now() - started;
          answer += event.token;
        }
      } catch {
        // Ignore incomplete SSE lines.
      }
    }
  }

  return {
    status: response.status,
    answer,
    firstTokenMs: firstTokenMs === null ? null : Math.round(firstTokenMs),
    totalMs: Math.round(performance.now() - started),
  };
}

function specificCheck(question, answer) {
  if (question === "Hangi otobüsler okula gidiyor?") {
    return ["267", "268", "368", "59", "505"].every((value) => answer.includes(value));
  }
  if (question === "DSD programı nedir?") {
    return ["A2", "B1", "B2", "C1"].every((value) => answer.includes(value));
  }
  if (question === "2026 LGS taban puanları açıklandı mı?") {
    return answer.includes("484,4618") && answer.includes("475,1813");
  }
  if (question === "BAL'ın tarihçesi nedir?") {
    return answer.includes("1953") && answer.includes("1976");
  }
  if (question === "Bilim ve matematik olimpiyatları nasıl?") {
    return /olimpiyat|İZBO/i.test(answer);
  }
  if (question === "Tiyatro, müzik ve spor faaliyetleri nasıl?") {
    return ["tiyatro", "müzik", "spor"].every((value) =>
      answer.toLocaleLowerCase("tr-TR").includes(value),
    );
  }
  if (question === "Öğle yemeği saatleri nedir?") {
    return answer.includes("11:40") && answer.includes("13:15") && !answer.includes("13:50");
  }
  return true;
}

const results = [];
for (let index = 0; index < questions.length; index += 1) {
  const question = questions[index];
  const result = await requestQuestion(question, index);
  const normalized = result.answer.replace(/\s+/g, " ").trim();
  const accurate =
    result.status === 200 &&
    normalized.length > 0 &&
    !normalized.includes("Bu konuda bilgim yok") &&
    !normalized.includes("Dakikalık soru limit") &&
    specificCheck(question, normalized);

  results.push({
    index: index + 1,
    question,
    status: result.status,
    accurate,
    firstTokenMs: result.firstTokenMs,
    totalMs: result.totalMs,
    answer: normalized.slice(0, 220),
  });

  console.log(
    `${accurate ? "PASS" : "FAIL"} ${index + 1}/${questions.length} ${question} :: ${normalized.slice(0, 180)}`,
  );
  if (index < questions.length - 1) await sleep(spacingMs);
}

const successful = results.filter((result) => result.status === 200);
const accurate = results.filter((result) => result.accurate);
const average = (key) =>
  successful.length
    ? Math.round(successful.reduce((sum, result) => sum + (result[key] || 0), 0) / successful.length)
    : null;

console.log(JSON.stringify({
  baseUrl,
  totalQuestions: questions.length,
  successfulRequests: successful.length,
  accurateResponses: accurate.length,
  averageFirstTokenMs: average("firstTokenMs"),
  averageTotalMs: average("totalMs"),
}, null, 2));

if (accurate.length !== questions.length) process.exitCode = 1;
