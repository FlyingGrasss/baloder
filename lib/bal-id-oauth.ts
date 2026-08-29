import "server-only";

import { createHmac, randomBytes } from "node:crypto";

export const BAL_ID_STATE_COOKIE = "baloder_bal_id_state";

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export function hashOAuthToken(token: string) {
  const secret = process.env.AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be configured in production.");
  }
  return createHmac("sha256", secret ?? "baloder-development-only-secret")
    .update(token)
    .digest("hex");
}

export function safePath(value: string | null | undefined, fallback = "/") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  try {
    const url = new URL(value, "https://baloder.local");
    return url.origin === "https://baloder.local"
      ? `${url.pathname}${url.search}${url.hash}`
      : fallback;
  } catch {
    return fallback;
  }
}

export function appUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
