import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceFile = "src/data/BAL_Knowledge_Base.md";
const sourcePath = path.join(root, sourceFile);
const outputPath = path.join(root, "src/data/knowledge-base.json");
const source = readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, "");
const generated = JSON.parse(readFileSync(outputPath, "utf8"));
const sourceSha256 = createHash("sha256").update(source, "utf8").digest("hex");
const approximateTokens = Math.ceil(source.length / 4);

if (approximateTokens >= 150_000) {
  throw new Error(
    `Knowledge base is approximately ${approximateTokens} tokens. Reconsider full-context mode before deploying it.`,
  );
}

if (
  generated.schema_version !== 1 ||
  generated.source_file !== sourceFile ||
  generated.source_sha256 !== sourceSha256 ||
  generated.content !== source ||
  generated.approximate_tokens !== approximateTokens
) {
  throw new Error(
    "knowledge-base.json is stale or inconsistent with BAL_Knowledge_Base.md. Run the knowledge-base generator.",
  );
}

console.log(`Knowledge base verified: ${sourceSha256}`);
