import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, "..");
const tokens = JSON.parse(await readFile(join(projectRoot, "tokens.json"), "utf8"));

const kebab = (value) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const cssLines = [
  `/* Generated from tokens.json for Sumi-Ink v${tokens.version}. Do not edit by hand. */`,
  ":root {"
];

for (const [sectionName, section] of Object.entries(tokens)) {
  if (!["colors", "typography", "spacing", "shape", "componentSizes", "motion", "breakpoints"].includes(sectionName)) continue;
  for (const [key, value] of Object.entries(section)) {
    const prefix = sectionName === "colors" ? "sumi" : `sumi-${kebab(sectionName)}`;
    const name = `--${prefix}-${kebab(key)}`;
    cssLines.push(`  ${name}: ${value};`);
  }
}

cssLines.push("}", "");
await mkdir(join(projectRoot, "implementations/web"), { recursive: true });
await writeFile(join(projectRoot, "implementations/web/tokens.css"), `${cssLines.join("\n")}\n`);

const colorValue = (hex) => {
  const value = hex.slice(1);
  const red = Number.parseInt(value.slice(0, 2), 16) / 255;
  const green = Number.parseInt(value.slice(2, 4), 16) / 255;
  const blue = Number.parseInt(value.slice(4, 6), 16) / 255;
  return `Color(red: ${red.toFixed(6)}, green: ${green.toFixed(6)}, blue: ${blue.toFixed(6)})`;
};

const swiftName = (value) => value.replace(/([A-Z])/g, (_, letter) => letter);
const swiftLines = [
  `// Generated from tokens.json for Sumi-Ink v${tokens.version}. Do not edit by hand.`,
  "import SwiftUI",
  "",
  "public enum SumiInkTokens {"
];

for (const [key, value] of Object.entries(tokens.colors)) {
  swiftLines.push(`    public static let ${swiftName(key)} = ${colorValue(value)}`);
}

swiftLines.push("");
for (const [key, value] of Object.entries(tokens.spacing)) {
  swiftLines.push(`    public static let space${key} = CGFloat(${Number.parseInt(value, 10)})`);
}

swiftLines.push(
  "",
  `    public static let controlDuration = 0.16`,
  `    public static let panelDuration = 0.20`,
  "}",
  ""
);

await mkdir(join(projectRoot, "implementations/swiftui"), { recursive: true });
await writeFile(join(projectRoot, "implementations/swiftui/SumiInkTokens.swift"), swiftLines.join("\n"));
