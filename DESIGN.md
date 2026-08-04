---
name: Sumi-Ink Command System
version: 0.1.0
status: approved-baseline
owner: product-design-system
canonical: true
---

# Sumi-Ink Command System

Sumi-Ink is a quiet white-paper command system for products that need operational clarity, truthful state, and deliberate human decisions.

This document is the globally approved design contract for the product family.

It is intentionally product-independent.

Projects add their own language, workflows, data boundaries, and product patterns in their local adapter documents.

## Source of truth

The canonical human-readable rules live in this file.

The canonical machine-readable values live in `tokens.json`.

The canonical component inventory lives in `components/registry.json`.

The canonical component contracts live in `components/`.

The web reference outputs live in `implementations/web/`.

The SwiftUI reference outputs live in `implementations/swiftui/`.

The validation contract is executable through `npm run check`.

No project may silently redefine a token or an approved component.

## Creative north star

The interface should feel like a private command ledger rather than a generic SaaS dashboard.

White paper carries the workspace.

Black ink defines architecture, primary action, selected state, and evidence frames.

Pale rules create hierarchy without decorative containers.

Red seal marks attention, focus, freshness, approval, commitment, and destructive consequence.

Editorial serif typography makes the interface feel authored and deliberate.

Operational labels make important state readable without depending on color.

The system is calm, exact, and honest about uncertainty.

## Global principles

### Truth before decoration

Every visible state must correspond to a real product state.

Missing data must look different from zero.

Loading, unavailable, blocked, and error states must use written language.

The interface must not imply an action succeeded before durable confirmation exists.

### One seal rule

Sumi Seal is the only saturated product accent.

Use it sparingly enough that it signals a decision or attention.

Do not create new saturated category colors without an approved proposal.

### Flat ledger rule

Surfaces are flat by default.

Depth comes from paper, soft paper, mist, rules, and ink frames.

Decorative shadow stacks, glass effects, gradients, and floating card piles are not part of Sumi-Ink.

### Written state rule

Color may reinforce state but may not be the only way state is communicated.

Selected, healthy, unavailable, waiting, blocked, destructive, and error states need visible text or accessible equivalent.

### Square command rule

Controls and containers use zero radius by default.

Rounded identity imagery is allowed when it represents a real identity object.

## Foundations

All values in this section are backed by `tokens.json`.

### Color

Sumi Ink is `#0D0A0A` and is used for structure, primary action, selected state, and strong text.

Sumi Paper is `#FFFFFF` and is used for the main workspace, panels, fields, and menus.

Sumi Soft Paper is `#FAFAFA` and is used for secondary and selected operational surfaces.

Sumi Mist is `#F5F5F5` and is used for quiet, loading, empty, and disabled surfaces.

Sumi Wash is `#F7F5F4` and is used for calm explanatory surfaces.

Sumi Pale Rule is `#EDEDED` and is used for quiet dividers.

Sumi Rule is `#E0E0E0` and is used for stronger frames and section boundaries.

Sumi Muted is `#545554` and is used for metadata and secondary copy.

Sumi Seal is `#C23A2E` and is used for attention, focus, approval, and commitment.

Sumi Seal Deep is `#8F211A` and is used for destructive depth and severe blocked state.

Sumi Seal Wash is `#F5E5E3` and is used for light attention and destructive hover surfaces.

Sumi Okay is `#2F3A2F` and is used for healthy state with a written label.

Danger Field is `#FFEDED` and is used for error surfaces with seal-deep text.

### Typography

Display and body text use the editorial serif stacks defined in `tokens.json`.

Labels, metadata, command codes, and dense operational state use the monospace label stack.

Display size is reserved for the primary purpose of a page.

Headline size is reserved for decisive sections and empty states.

Body copy stays readable and avoids long unbroken lines.

Labels use uppercase treatment and tracked spacing where the context is operational.

### Spacing and shape

The spacing scale is the named scale in `tokens.json`.

The default radius is zero pixels.

The default border is one pixel.

The preferred touch target is `44px`.

The compact command target is `34px`.

### Motion

Control feedback uses the `160ms` control duration.

Panel transitions use the `200ms` panel duration.

Motion must communicate state rather than decorate navigation.

Reduced-motion settings reduce spatial movement and preserve readable state feedback.

## Layout and direction

Wide layouts may use a command index, a workspace, and a utility rail when the product requires them.

Compact layouts collapse secondary rails and preserve the primary action order.

Mobile layouts preserve evidence order, touch targets, and written state labels.

No critical action may exist only on hover.

Arabic interfaces must use logical properties, correct RTL reading order, and mirrored navigation where the direction is meaningful.

Icons that communicate direction must be mirrored in RTL when their meaning requires it.

## Component registry

The complete registry is machine-readable in `components/registry.json`.

Every registry entry has a stable ID, approval status, implementation status, platform scope, and detailed specification link.

The current approved component families are:

- App shell and command index.
- Buttons and links.
- Text fields and form validation.
- Dropdown menus and selectors.
- Segmented controls, toggles, and check controls.
- Date and time controls.
- Tabs and navigation.
- Status stamps and written feedback.
- Dialogs, sheets, and popovers.
- Ledger tables, ruled rows, paper sheets, and slips.
- Empty, loading, unavailable, and error states.
- Line iconography.
- Evidence charts.

An entry marked `approved` is approved as a design contract.

An entry marked `reference` has a reference implementation but may still require product-specific integration.

An entry marked `guidance` defines behavior and visual rules without claiming a complete production component.

## Component contract

Every component specification must answer the following questions.

- What problem does the component solve?
- When should it be used?
- When should it not be used?
- What is its anatomy?
- What variants are approved?
- What are its dimensions and token dependencies?
- What are its default, hover, focus, selected, disabled, loading, success, warning, destructive, and error states?
- How does it behave with keyboard and VoiceOver?
- How does it behave at compact widths and on touch devices?
- How does it behave in Arabic and RTL layouts?
- What happens when reduced motion is enabled?
- What content and localization rules apply?
- Where is the web reference implementation?
- Where is the SwiftUI reference implementation?
- What screenshot or test proves the component?

## Cross-platform contract

Web and SwiftUI implementations must share token names and state meaning.

Platform-native behavior is allowed when it is explicitly approved in the component contract.

A native control must not be used merely because it is convenient when it visibly breaks the approved Sumi-Ink surface.

The Sumi-Ink dropdown is the reference for branded menus.

Native pickers remain allowed for platform-specific date and time behavior when their native presentation is intentional and documented.

## Content and localization

Labels should be concise, factual, and operational.

Avoid shame, guilt, disappointment, ceremonial language, and fabricated precision.

Do not use color as a replacement for written state.

Arabic translations must preserve meaning, state, and action consequence.

English validation text must not leak into an Arabic interface without an explicit product decision.

Privacy-sensitive product surfaces must not expose credentials, private message contents, raw URLs, or private observation values in screenshots or accessibility labels.

## Proof and verification

An approved component needs proof in the relevant platform before it is treated as integrated.

Proof should cover the normal state, focus state, selected state, destructive or error state, compact layout, and reduced motion when applicable.

Browser proof must use the built-in in-app Browser.

Native proof must identify the signed or installed artifact when release confidence matters.

Build success is not visual proof.

Reference screenshots belong in `proof/` and must not contain credentials or private customer data.

## Governance

The canonical system uses semantic versioning.

Patch releases correct wording, examples, or non-breaking documentation errors.

Minor releases add approved components or non-breaking tokens.

Major releases change existing behavior, token meaning, or migration requirements.

Every change must state its impact on existing projects.

Every new component begins as `proposed`.

A component becomes `approved` only after design review, implementation proof, accessibility review, and migration guidance exist.

Deprecated components remain documented until all connected projects migrate.

Project-specific deviations belong in the project adapter and may not silently change the global contract.

## Adoption contract

Each project root `DESIGN.md` must identify the canonical Sumi-Ink version it consumes.

Each project must link to the sibling canonical `DESIGN.md` or the approved remote source.

Each project must list intentional local deviations.

Each project should run the canonical adapter validation as part of its normal checks.

## Explicit exclusions

Do not use blue architecture, blue selected states, decorative gradients, glassmorphism, warm gold, neon accents, or novelty AI styling.

Do not use rounded pills as the default state treatment.

Do not use decorative shadows to imply hierarchy.

Do not show opaque focus scores or fabricated precision.

Do not claim an external write succeeded before the system receives durable confirmation.

Do not create product-specific colors that compete with Sumi Seal.

## Approval checklist

- The change is represented in `DESIGN.md`.
- The related token is represented in `tokens.json` when applicable.
- The related component is represented in `components/registry.json`.
- The detailed component contract exists.
- Web and SwiftUI reference behavior is documented.
- Keyboard, VoiceOver, reduced motion, mobile, and RTL behavior are addressed.
- Visual proof exists for visible UI changes.
- Existing project adapters remain on a known canonical version.
- `npm run check` passes.
