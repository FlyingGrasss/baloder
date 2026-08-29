import { performance } from "node:perf_hooks";

const baseUrl = process.env.BENCHMARK_URL || "http://localhost:3000";
const runId = Date.now().toString(36);

const cases = [
  {
    name: "kuruluş tarihi",
    message: "BALÖDER ne zaman kuruldu? Lütfen kısa ve doğrudan cevap ver.",
    expected: (answer) => answer.includes("1 Ağustos 2025"),
  },
  {
    name: "kurucular",
    message: "BALÖDER'i kim kurdu? Yedi kurucunun tamamını listele.",
    expected: (answer) =>
      [
        "Ege Tanrıverdi",
        "Emin Deniz Dilber",
        "Ali Heval Korkut",
        "Mehmet Enes Özaydın",
        "Deniz Karanfil",
        "Emre Bozkurt",
        "Onur Sanal",
      ].every((name) => answer.includes(name)),
  },
  {
    name: "BALKOOP faaliyetleri",
    message: "BALKOOP faaliyetleri nelerdir? Şu ana kadar yapılanları anlat.",
    expected: (answer) =>
      answer.includes("2025") &&
      answer.includes("2026") &&
      /uygun fiyat/i.test(answer) &&
      answer.includes("5 TL") &&
      !/2025[\s\S]{0,120}kurul/i.test(answer),
  },
  {
    name: "BALÖDER faaliyetleri",
    message: "BALÖDER şu ana kadar ne yaptı? Tamamlanan gerçek faaliyetleri özetle.",
    expected: (answer) =>
      /BAL Times/i.test(answer) && /su/i.test(answer) && !/henüz kurulmadı/i.test(answer),
  },
  {
    name: "BAL dışı soru",
    message: "Türkiye'nin başkenti neresidir?",
    expected: (answer) => /Ankara/i.test(answer),
  },
];

async function requestCase(message, history, index) {
  const started = performance.now();
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-client-fingerprint": `benchmark_${runId}_${index}`,
    },
    body: JSON.stringify({
      message,
      session_id: `benchmark_${runId}_${index}`,
      history,
    }),
  });

  const headersAt = performance.now();
  if (!response.body) {
    return {
      status: response.status,
      firstByteMs: headersAt - started,
      firstTokenMs: null,
      totalMs: headersAt - started,
      answer: await response.text(),
    };
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let answer = "";
  let firstByteMs = null;
  let firstTokenMs = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (firstByteMs === null) firstByteMs = performance.now() - started;
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
        // Ignore incomplete/non-JSON SSE lines; the route emits valid events.
      }
    }
  }

  const totalMs = performance.now() - started;
  if (firstByteMs === null) firstByteMs = totalMs;
  return { status: response.status, firstByteMs, firstTokenMs, totalMs, answer };
}

function round(value) {
  return value === null ? null : Math.round(value);
}

const results = [];
for (let index = 0; index < cases.length; index += 1) {
  const testCase = cases[index];
  const result = await requestCase(testCase.message, [], index);
  results.push({
    name: testCase.name,
    status: result.status,
    firstByteMs: round(result.firstByteMs),
    firstTokenMs: round(result.firstTokenMs),
    totalMs: round(result.totalMs),
    accuracy: result.status === 200 && testCase.expected(result.answer),
    answer: result.answer.replace(/\s+/g, " ").trim().slice(0, 500),
  });
}

const followUpIndex = cases.length;
const firstFollowUp = await requestCase(
  "BALKOOP faaliyetleri nelerdir?",
  [],
  followUpIndex,
);
const secondFollowUp = await requestCase(
  "Şu ana kadar ne yaptı?",
  [
    { role: "user", content: "BALKOOP faaliyetleri nelerdir?" },
    { role: "assistant", content: firstFollowUp.answer },
  ],
  followUpIndex + 1,
);
results.push({
  name: "öznesiz takip sorusu",
  status: secondFollowUp.status,
  firstByteMs: round(secondFollowUp.firstByteMs),
  firstTokenMs: round(secondFollowUp.firstTokenMs),
  totalMs: round(secondFollowUp.totalMs),
  accuracy:
    secondFollowUp.status === 200 &&
    /BALKOOP/i.test(secondFollowUp.answer) &&
    /uygun fiyat/i.test(secondFollowUp.answer) &&
    secondFollowUp.answer.includes("5 TL"),
  answer: secondFollowUp.answer.replace(/\s+/g, " ").trim().slice(0, 500),
});

const valid = results.filter((result) => result.status === 200);
const average = (key) =>
  valid.length
    ? Math.round(valid.reduce((sum, result) => sum + (result[key] || 0), 0) / valid.length)
    : null;

console.log(JSON.stringify({
  baseUrl,
  modelPath: "production /api/chat (contextual BM25 BAL knowledge base)",
  cases: results,
  summary: {
    successfulRequests: valid.length,
    totalRequests: results.length,
    accurateCases: results.filter((result) => result.accuracy).length,
    averageFirstByteMs: average("firstByteMs"),
    averageFirstTokenMs: average("firstTokenMs"),
    averageTotalMs: average("totalMs"),
  },
}, null, 2));

if (results.some((result) => result.status !== 200 || !result.accuracy)) {
  process.exitCode = 1;
}
