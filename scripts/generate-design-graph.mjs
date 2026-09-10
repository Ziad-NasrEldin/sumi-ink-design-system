import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const graph = JSON.parse(await readFile(join(root, "components/design-graph.json"), "utf8"));

const escape = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderCell = (cell, dir = "ltr", lang = "en") => {
  const missing = cell.status === "missing";
  const interactive = cell.interactive === true;
  const body = missing
    ? `<p class="sumi-graph-missing__label">MISSING</p><p class="sumi-graph-missing__note">${escape(cell.note)}</p>`
    : cell.html;
  const classes = ["sumi-graph-cell"];
  if (missing) classes.push("sumi-graph-cell--missing");
  if (interactive) classes.push("sumi-graph-cell--live");
  return `<article class="${classes.join(" ")}" id="${escape(cell.id)}" data-cell-id="${escape(cell.id)}" dir="${dir}" lang="${lang}">
  <p class="sumi-kicker">${escape(cell.id)}</p>
  <h4>${escape(cell.title)}</h4>
  ${cell.note && !missing ? `<p class="sumi-graph-cell__note">${escape(cell.note)}</p>` : ""}
  <div class="sumi-graph-cell__stage">${body}</div>
</article>`;
};

const renderRow = (title, cells, dir = "ltr", lang = "en") => `
<section class="sumi-graph-row">
  <h3>${escape(title)}</h3>
  <div class="sumi-graph-grid">
    ${cells.map((cell) => renderCell(cell, dir, lang)).join("\n")}
  </div>
</section>`;

const index = graph.families.map((family) => `
  <a href="#family-${escape(family.id)}">${escape(family.name)}</a>`).join("");

const families = graph.families.map((family) => {
  const components = family.components.map((component) => {
    const parts = component.parts.map((part) => renderRow(part.name, part.cells)).join("\n");
    const compact = component.environments?.compact
      ? renderRow("Compact", component.environments.compact)
      : "";
    const rtl = component.environments?.rtl
      ? renderRow("Arabic RTL", component.environments.rtl, "rtl", "ar")
      : "";
    return `<section class="sumi-graph-component" id="component-${escape(component.id)}">
      <header class="sumi-graph-component__header">
        <p class="sumi-kicker">${escape(component.implementation)}</p>
        <h2>${escape(component.name)}</h2>
      </header>
      ${parts}
      ${compact}
      ${rtl}
    </section>`;
  }).join("\n");
  return `<section class="sumi-graph-family" id="family-${escape(family.id)}">
    <h2 class="sumi-graph-family__title">${escape(family.name)}</h2>
    ${components}
  </section>`;
}).join("\n");

const reduced = `
<section class="sumi-graph-family" id="family-reduced-motion">
  <h2 class="sumi-graph-family__title">${escape(graph.reducedMotion.title)}</h2>
  <p class="sumi-graph-family__note">${escape(graph.reducedMotion.note)}</p>
  ${renderRow("Reduced motion", graph.reducedMotion.cells)}
</section>`;

const interaction = graph.interaction ? `
<section class="sumi-graph-family" id="family-interaction">
  <h2 class="sumi-graph-family__title">${escape(graph.interaction.title)}</h2>
  <p class="sumi-graph-family__note">${escape(graph.interaction.note)}</p>
  ${renderRow("Live cells", graph.interaction.cells)}
</section>` : "";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sumi-Ink v${escape(graph.version)} design graph</title>
    <link rel="stylesheet" href="../implementations/web/tokens.css" />
    <link rel="stylesheet" href="../implementations/web/sumi-components.css" />
    <link rel="stylesheet" href="../implementations/web/sumi-design-graph.css" />
  </head>
  <body class="sumi-graph">
    <main>
      <header class="sumi-graph__header">
        <p class="sumi-kicker">${escape(graph.page.kicker)}</p>
        <h1>${escape(graph.page.title)}</h1>
        <p>${escape(graph.page.summary)}</p>
        <nav class="sumi-graph__index" aria-label="Component families">${index}
          <a href="#family-reduced-motion">Reduced motion</a>
          <a href="#family-interaction">Motion and interaction</a>
        </nav>
      </header>
      ${families}
      ${reduced}
      ${interaction}
    </main>
    <script src="../implementations/web/sumi-design-graph.js"></script>
  </body>
</html>
`;

await mkdir(join(root, "examples"), { recursive: true });
await writeFile(join(root, "examples/design-graph.html"), html);
console.log(`Generated design graph with ${graph.families.length} families.`);
