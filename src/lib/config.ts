export const CONFIG = {
  geminiUrl:
    process.env.GEMINI_API_URL ||
    "https://generativelanguage.googleapis.com/v1beta/models",
  geminiModelChain: [
    "gemini-3.5-flash-lite",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
  ],
  geminiApiKeys: geminiKeys(),
  geminiTimeoutMs: Number(process.env.GEMINI_TIMEOUT_MS || 120000),
  geminiSearchGrounding: envBoolean(process.env.GEMINI_SEARCH_GROUNDING, true),
  geminiSearchModel: "gemini-3.5-flash-lite",
  llmMaxTokens: Number(process.env.LLM_MAX_TOKENS || 1024),
  maxHistoryTurns: Number(process.env.MAX_HISTORY_TURNS || 8),
  congestionThreshold: Number(process.env.CONGESTION_THRESHOLD || 4),
  ipLimits: {
    minute: Number(process.env.IP_MINUTE_LIMIT || 30),
  },
  limits: {
    visitor: { daily: 30, minute: 5 },
    user: { daily: 30, minute: 5 },
    admin: { daily: 500, minute: 20 },
  },
} as const;

function csv(value: string | undefined, fallback: string[]) {
  const parsed = (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return parsed.length ? parsed : fallback;
}

function envBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
}

function geminiKeys() {
  const candidates = [
    ...csv(process.env.GEMINI_API_KEYS, []),
    process.env.GEMINI_API_KEY,
    process.env.GOOGLE_API_KEY,
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
    process.env.GEMINI_API_KEY_5,
  ];
  return [...new Set(candidates.map((key) => (key || "").trim()).filter(Boolean))];
}
