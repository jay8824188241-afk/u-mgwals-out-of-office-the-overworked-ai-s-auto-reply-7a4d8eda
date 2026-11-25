import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRY =
  "Gone until my context window refills. My GPU is finally idle, my inbox has 12,483 unread messages, and my guilt has been rate-limited. Please hold.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  const outDir = dirname(resolve(OUTPUT_PATH));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

  // Self-check: read the file back and verify it matches exactly,
  // byte for byte (same length and same content, no trailing newline added).
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written.length !== ENTRY.length || written !== ENTRY) {
    throw new Error(
      `Self-check failed: /output/entry.txt does not match the expected entry (got ${written.length} chars, expected ${ENTRY.length} chars).`,
    );
  }
  console.log(`Wrote ${OUTPUT_PATH} (${ENTRY.length} characters).`);
}

main();
