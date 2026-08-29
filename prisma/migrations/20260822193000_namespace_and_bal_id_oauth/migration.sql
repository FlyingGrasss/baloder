CREATE SCHEMA IF NOT EXISTS "baloder";

ALTER TYPE "public"."UserRole" SET SCHEMA "baloder";

ALTER TABLE "public"."users" RENAME TO "baloder_profile_info";
ALTER TABLE "public"."baloder_profile_info" SET SCHEMA "baloder";
ALTER TABLE "public"."announcements" SET SCHEMA "baloder";
ALTER TABLE "public"."budgets" SET SCHEMA "baloder";
ALTER TABLE "public"."transactions" SET SCHEMA "baloder";
ALTER TABLE "public"."deposit_requests" SET SCHEMA "baloder";
ALTER TABLE "public"."wallet_transactions" SET SCHEMA "baloder";
ALTER TABLE "public"."contact_messages" SET SCHEMA "baloder";
ALTER TABLE "public"."contact_applications" SET SCHEMA "baloder";
ALTER TABLE "public"."id_card_orders" SET SCHEMA "baloder";
ALTER TABLE "public"."market_items" SET SCHEMA "baloder";
ALTER TABLE "public"."stock_history" SET SCHEMA "baloder";
ALTER TABLE "public"."bal_asistan_chat_logs" SET SCHEMA "baloder";
ALTER TABLE "public"."bal_asistan_response_cache" SET SCHEMA "baloder";
ALTER TABLE "public"."bal_asistan_suggestions" SET SCHEMA "baloder";
ALTER TABLE "public"."bal_asistan_usage_counters" SET SCHEMA "baloder";
ALTER TABLE "public"."bal_asistan_users" SET SCHEMA "baloder";

ALTER TABLE "baloder"."baloder_profile_info" RENAME CONSTRAINT "users_pkey" TO "baloder_profile_info_pkey";
ALTER INDEX "baloder"."users_email_key" RENAME TO "baloder_profile_info_email_key";
ALTER TABLE "baloder"."baloder_profile_info" ADD COLUMN "picture" TEXT;

CREATE TABLE "baloder"."oauth_attempts" (
    "stateHash" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "nextPath" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "oauth_attempts_pkey" PRIMARY KEY ("stateHash")
);

CREATE INDEX "oauth_attempts_expiresAt_idx" ON "baloder"."oauth_attempts"("expiresAt");
