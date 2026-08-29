CREATE SCHEMA IF NOT EXISTS "baloder";

ALTER TABLE IF EXISTS "public"."bal_asistan_chat_logs" SET SCHEMA "baloder";
ALTER TABLE IF EXISTS "public"."bal_asistan_response_cache" SET SCHEMA "baloder";
ALTER TABLE IF EXISTS "public"."bal_asistan_suggestions" SET SCHEMA "baloder";
ALTER TABLE IF EXISTS "public"."bal_asistan_usage_counters" SET SCHEMA "baloder";
ALTER TABLE IF EXISTS "public"."bal_asistan_users" SET SCHEMA "baloder";
