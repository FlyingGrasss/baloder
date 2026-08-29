import { createHash } from "node:crypto";
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceFile = "src/data/BAL_Knowledge_Base.md";
const sourcePath = path.join(root, sourceFile);
const outputPath = path.join(root, "src/data/knowledge-base.json");
const content = readFileSync(sourcePath, "utf8").replace(/^\uFEFF/, "");
const sourceSha256 = createHash("sha256").update(content, "utf8").digest("hex");
const approximateTokens = Math.ceil(content.length / 4);

if (approximateTokens >= 150_000) {
  throw new Error(
    `Knowledge base is approximately ${approximateTokens} tokens. Reconsider full-context mode before deploying it.`,
  );
}

const payload = {
  schema_version: 1,
  source_file: sourceFile,
  source_sha256: sourceSha256,
  approximate_tokens: approximateTokens,
  content,
};
const temporaryPath = `${outputPath}.${process.pid}.tmp`;

writeFileSync(temporaryPath, `${JSON.stringify(payload)}\n`, "utf8");
renameSync(temporaryPath, outputPath);

console.log(
  `Knowledge base written: ${sourceSha256} (${approximateTokens} approximate tokens)`,
);
