# Sumi-Ink Command System

Sumi-Ink is the canonical design system for the user's product family.

The current release is `v0.1.0`.

The system defines visual foundations, interaction contracts, component behavior, accessibility expectations, platform mappings, and project adoption rules.

The root [DESIGN.md](DESIGN.md) is the human-readable source of truth.

The machine-readable design values live in [tokens.json](tokens.json).

The machine-readable component inventory lives in [components/registry.json](components/registry.json).

The web and SwiftUI reference outputs are generated from the token source.

## Validation

Run `npm run check` to regenerate platform outputs and validate the canonical system plus the three connected projects.

The project adapters must identify the canonical version and point to the sibling Sumi-Ink repository.

## Adoption rule

Projects may add product language, product workflows, and product-specific patterns.

Projects may not silently redefine global tokens or approved component behavior.

Every intentional deviation must be documented in the project's root `DESIGN.md`.
