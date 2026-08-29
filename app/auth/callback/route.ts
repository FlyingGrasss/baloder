import { NextRequest, NextResponse } from "next/server";
import { appUrl, BAL_ID_STATE_COOKIE, hashOAuthToken } from "@/lib/bal-id-oauth";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  error?: string;
};

type UserInfo = {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
};

function authError(request: NextRequest, code: string) {
  return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(code)}`, request.url));
}

export async function GET(request: NextRequest) {
  const oauthError = request.nextUrl.searchParams.get("error");
  if (oauthError) return authError(request, oauthError);

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const cookieState = request.cookies.get(BAL_ID_STATE_COOKIE)?.value;
  if (!code || !state || !cookieState || state !== cookieState) return authError(request, "invalid-state");

  const attempt = await prisma.oAuthAttempt.findUnique({ where: { stateHash: hashOAuthToken(state) } });
  if (!attempt || attempt.expiresAt <= new Date()) return authError(request, "expired-attempt");
  await prisma.oAuthAttempt.delete({ where: { stateHash: attempt.stateHash } });

  const issuer = process.env.BAL_ID_ISSUER_URL?.replace(/\/$/, "");
  const clientId = process.env.BAL_ID_CLIENT_ID;
  const clientSecret = process.env.BAL_ID_CLIENT_SECRET;
  if (!issuer || !clientId || !clientSecret) return authError(request, "bal-id-config");

  try {
    const tokenResponse = await fetch(`${issuer}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        redirect_uri: appUrl("/auth/callback"),
        code_verifier: attempt.codeVerifier,
      }),
      cache: "no-store",
    });
    const tokens = (await tokenResponse.json()) as TokenResponse;
    if (!tokenResponse.ok || !tokens.access_token || !tokens.refresh_token) {
      return authError(request, tokens.error ?? "token-exchange");
    }

    const userResponse = await fetch(`${issuer}/oauth/userinfo`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
      cache: "no-store",
    });
    const info = (await userResponse.json()) as UserInfo;
    if (!userResponse.ok || !info.sub || !info.email || info.email_verified !== true) {
      return authError(request, "invalid-userinfo");
    }

    const supabase = await createClient();
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
    if (sessionError) return authError(request, "session-creation");

    const email = info.email.toLowerCase();
    const name = info.name?.trim() || email.split("@")[0];
    await prisma.user.upsert({
      where: { id: info.sub },
      create: { id: info.sub, email, name, picture: info.picture ?? null, verified: true },
      update: { email, name, picture: info.picture ?? null, verified: true },
    });

    const response = NextResponse.redirect(appUrl(attempt.nextPath));
    response.cookies.delete(BAL_ID_STATE_COOKIE);
    return response;
  } catch (error) {
    console.error("BAL ID callback failed", error);
    return authError(request, "bal-id-connection");
  }
}
