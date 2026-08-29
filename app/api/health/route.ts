import knowledgeBase from "../../../src/data/knowledge-base.json";
import {
  KNOWLEDGE_CONTEXT_MAX_CHUNKS,
  KNOWLEDGE_CONTEXT_STRATEGY,
} from "../../../src/lib/knowledge";
import { providerStatus } from "../../../src/lib/llm";
import { databaseReady } from "../../../src/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const dbReady = await databaseReady();
  const provider = providerStatus();
  return Response.json({
    knowledge_base: true,
    knowledge_base_sha256: knowledgeBase.source_sha256,
    knowledge_base_approximate_tokens: knowledgeBase.approximate_tokens,
    knowledge_context_strategy: KNOWLEDGE_CONTEXT_STRATEGY,
    knowledge_context_max_chunks: KNOWLEDGE_CONTEXT_MAX_CHUNKS,
    database: dbReady,
    ...provider,
    status: provider.status === "ok" && dbReady ? "ok" : "degraded",
  });
}
