---
name: Sumi-Ink Design Graph
status: current-spec
audience: agents-first
scope: web-first
source: conversation-lock-2026-08-22
---

# Sumi-Ink Design Graph

This is the locked contract for the Sumi-Ink design graph.

It is a generated, frozen HTML catalog of every approved component, sub-component, and visually distinct state.

It is not a screen map, not a Storybook app, and not a Figma source of truth.

Agents use it as visual law.

Humans can review it, but the page is not a marketing gallery.

## Why this exists

Thijs Verreck's method is the operating idea: agents build better UI when they can see every permutation of a control, including hover, focus, disabled, selected, and loading.

Apple's HIG and iOS kit are the catalog shape: foundations and components grouped by job, then each control shown as labeled strips of parts and states.

Sumi-Ink already has the written contract in DESIGN.md, the inventory in components/registry.json, and the look in implementations/web/sumi-components.css.

The current showcase only shows a few happy paths.

The design graph is the missing visual half of the contract.

## What the graph is

The graph hangs off components and the parts inside them.

A dropdown is not a page.

A dropdown is trigger, menu, option, selected option, destructive option, and group divider.

A field is label, input, focus marker, and validation copy.

A ledger is header, ruled row, and status stamp.

Screens do not own parts.

A later product surface may assemble proven parts, but if a state only exists inside a screen mock, it is not part of the system.

## Settled decisions

These answers are locked and should not be reopened without a new spec.

1. Audience: agents first, humans second.
2. Scope: the full approved catalog in the first slice.
3. Guidance families: icons and charts appear, with explicit MISSING cells until real primitives exist.
4. Cells: frozen production primitives, forced into one state.
5. Environment: compact and Arabic RTL as extra rows per family.
6. Reduced motion: one page-level strip, not a cell inside every part.
7. Inventory: components/design-graph.json owns parts and required cells.
8. Registry: components/registry.json stays the component inventory.
9. HTML: generated, not hand-maintained.
10. Showcase: examples/component-showcase.html stays a product sample.
11. Platform: web first.
12. SwiftUI: later, using the same part names and state names.
13. Look: Sumi-Ink materials, lab catalog layout.
14. No app shell, no fake transaction screen, no Apple glass.
15. Validation: a missing required cell fails npm run check.
16. Same pass: build the graph and fill the missing web primitives it must show.
17. CSS: correct known contract breaks while doing this.
18. Cell identity: stable ids such as dropdown-menus/option/selected.
19. Missing cells: ruled empty cells with written MISSING.
20. Forced states: production classes in implementations/web/sumi-components.css.
21. Shape: one long page with a family index and anchors.
22. Generator: scripts/generate-design-graph.mjs, called from npm run generate.
23. Commit the generated HTML.
24. Frozen catalog cells are not interactive.
24a. Motion and interaction live in a separate page-level strip. Those cells are live and do not change the frozen catalog.
24b. Every approved reference family has one live exemplar. Icons and charts stay MISSING until they have real primitives.
25. Copy is short operational Sumi-Ink language.
26. RTL rows use real Arabic.
27. Compact rows use the 34px target class, not a scaled iframe.
28. DESIGN.md names the graph as source of truth.
29. Visible UI changes need a graph cell on the approval checklist.
30. Capture proof screenshots into proof/ after the page exists.

## Sources of truth

- Human contract: DESIGN.md
- Tokens: tokens.json
- Component inventory: components/registry.json
- Graph inventory: components/design-graph.json
- Specs: components/*.md
- Web primitives: implementations/web/sumi-components.css
- Generated tokens: implementations/web/tokens.css
- Generated graph: examples/design-graph.html
- Product sample: examples/component-showcase.html
- Proof: proof/

Figma is optional later, and only as a snapshot of the HTML.

Do not author components in Figma first.

## Graph file

components/design-graph.json is the machine-readable graph.

It must include the Sumi-Ink version, family grouping, each component id from the registry, named parts for that component, visually distinct states for each part, whether a cell is required or allowed to be missing, a stable cell id, and the production markup used to render the cell.

Do not encode every combinatorial explosion.

Show visually distinct states, not every variant times every interaction times every environment.

Environment axes stay outside the part: compact row, Arabic RTL row, and a page-level reduced-motion strip.

## Cell contract

Every cell is the real production primitive, frozen.

Use classes such as .is-hover, .is-focus, .is-selected, .is-disabled, and .is-loading.

Those classes live in implementations/web/sumi-components.css.

They are production classes, not graph-only hacks.

Each cell must show one part in one state, keep that state visible without hovering, use pointer-events none, keep open menus and overlay parts in-flow so they cannot cover neighbors, use a visible kicker that matches the stable id, and use operational copy such as Approve, Amount, and SELECTED.

Guidance families may render a ruled empty cell with written MISSING.

Do not omit the family.

Do not fake chart or icon markup.

## Family grouping

Group the catalog the way Apple groups components, mapped onto the current registry.

- Actions: buttons
- Selection and input: fields, dropdowns, segmented controls, toggles, date/time
- Navigation: app shell, command index, tabs
- Presentation: dialogs, sheets, slips
- Status: stamps, toast, empty / loading / error
- Content: ledgers, charts, icons

App shell, command index, and overlays appear as component families with their own parts.

They are not a screen layer sitting above the system.

## Required parts for the first pass

Approved reference families cannot pass with empty required cells.

At minimum, the first generated page must cover:

- Buttons: primary, quiet, attention, destructive, in default, hover, focus, disabled, and loading, plus compact and Arabic rows.
- Fields: default, focus, disabled, error, plus compact and Arabic rows.
- Dropdowns: trigger closed, trigger expanded, option default, option hover, option selected, option destructive hover, group divider.
- Segmented controls, toggles, and checks: unselected, selected, disabled.
- Tabs: inactive, active, focus.
- Status stamps: healthy, attention, waiting, error, blocked where the spec names them.
- Overlays: dialog header, body, confirm action, cancel action, destructive confirmation copy.
- Ledgers: header, ruled row, compact reading order.
- Empty, loading, and error surfaces: written state, not color-only.

Icons and charts may stay MISSING until they have real reference markup.

## Implementation pass

This spec and the first implementation are the same pass.

Do not freeze known contract breaks just to ship a catalog.

Correct CSS to the contract while generating the graph, including decorative dropdown shadows that violate the flat ledger rule.

Add missing web primitives the graph must show.

Keep token generation separate from graph generation.

npm run generate should regenerate tokens and generate examples/design-graph.html from components/design-graph.json.

npm run check should fail when an approved reference family is missing from the graph, a required part or state has no cell, a required cell is marked missing, or the generated HTML is absent or stale relative to the JSON.

Guidance families may be incomplete.

## DESIGN.md changes

When this spec is implemented, DESIGN.md must name components/design-graph.json and examples/design-graph.html in Source of truth, say that a visible UI change needs a graph cell, and keep the existing component-contract questions, now backed by the graph.

Do not treat the current showcase as visual proof.

## Out of scope

- SwiftUI graph page
- Figma as source
- Storybook
- Screen-first composition maps
- Merging the graph into the product showcase
- Interactive playground behavior inside graph cells
- New saturated colors or Apple glass materials

## Success

The first slice is done when:

- components/design-graph.json exists
- examples/design-graph.html is generated and committed
- every approved reference family has its required cells
- icons and charts exist as MISSING cells
- forced-state classes work in the production CSS
- npm run check fails if a required cell is missing
- DESIGN.md names the graph as source of truth
- proof screenshots of the graph exist in proof/

## References

- Thijs Verreck on design graphs: https://x.com/ThijsVerreck/status/2087088956236013653
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- iOS and iPadOS 27 Figma kit: https://www.figma.com/community/file/1651309003795292092/ios-and-ipados-27
