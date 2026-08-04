import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const errors = [];

const readJson = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));
const exists = async (path) => {
  try {
    await access(join(root, path));
    return true;
  } catch {
    return false;
  }
};

const tokens = await readJson("tokens.json");
const registry = await readJson("components/registry.json");
const design = await readFile(join(root, "DESIGN.md"), "utf8");

if (tokens.version !== "0.1.0") errors.push(`tokens.json version is ${tokens.version}, expected 0.1.0`);
if (registry.version !== tokens.version) errors.push("registry version does not match tokens version");
for (const section of ["Source of truth", "Creative north star", "Foundations", "Component registry", "Component contract", "Cross-platform contract", "Governance", "Adoption contract", "Approval checklist"]) {
  if (!design.includes(`## ${section}`)) errors.push(`DESIGN.md is missing section: ${section}`);
}

const colors = Object.entries(tokens.colors);
if (colors.length < 10) errors.push("tokens.json must define at least ten semantic colors");
for (const [name, value] of colors) {
  if (!/^#[0-9A-F]{6}$/i.test(value)) errors.push(`color ${name} is not a six-digit hex value`);
}

const ids = new Set();
for (const component of registry.components) {
  if (ids.has(component.id)) errors.push(`duplicate component id: ${component.id}`);
  ids.add(component.id);
  if (!["proposed", "approved", "experimental", "deprecated"].includes(component.status)) errors.push(`invalid status for ${component.id}`);
  if (!["reference", "guidance"].includes(component.implementation)) errors.push(`invalid implementation status for ${component.id}`);
  if (!(await exists(component.spec))) errors.push(`missing component spec for ${component.id}: ${component.spec}`);
}

for (const generated of ["implementations/web/tokens.css", "implementations/swiftui/SumiInkTokens.swift"]) {
  if (!(await exists(generated))) errors.push(`missing generated output: ${generated}`);
  else if (!(await readFile(join(root, generated), "utf8")).includes("Generated from tokens.json")) errors.push(`generated output is missing its source marker: ${generated}`);
}

if (design.includes("\u2014")) errors.push("DESIGN.md contains an em dash");

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Sumi-Ink v${tokens.version} valid: ${registry.components.length} components, ${colors.length} colors.`);
