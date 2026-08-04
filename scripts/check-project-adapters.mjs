import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const canonicalRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const expectedVersion = "Sumi-Ink Command System v0.1.0";
const expectedLink = "../Sumi-Ink/DESIGN.md";
const projectRoots = process.argv.slice(2);
const errors = [];

if (!projectRoots.length) errors.push("no project adapters were provided");

for (const projectRoot of projectRoots) {
  const absoluteRoot = resolve(canonicalRoot, projectRoot);
  const path = join(absoluteRoot, "DESIGN.md");
  try {
    const content = await readFile(path, "utf8");
    if (!content.includes(expectedVersion)) errors.push(`${projectRoot}/DESIGN.md does not identify ${expectedVersion}`);
    if (!content.includes(expectedLink)) errors.push(`${projectRoot}/DESIGN.md does not link to ${expectedLink}`);
  } catch (error) {
    errors.push(`${projectRoot}/DESIGN.md could not be read: ${error.message}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Project adapters valid: ${projectRoots.join(", ")}.`);
