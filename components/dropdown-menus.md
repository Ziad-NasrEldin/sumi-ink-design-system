# Dropdown menus and selectors

## Purpose

Dropdown menus expose a bounded set of commands or choices without taking the user away from the current surface.

Use a dropdown for a small or medium set of known choices.

Use a dedicated picker or searchable list for large or complex collections.

## Trigger

Use a plain button or selector label as the trigger.

The trigger uses Sumi Paper, a one-pixel rule, zero radius, and a visible selected value.

The trigger exposes expanded state and an accessible hint.

## Menu

The menu uses Sumi Paper background and a one-pixel Sumi Ink border.

The menu uses zero radius and a default minimum width of `216px`.

The menu is content-aligned and must not clip its options at compact widths.

## Options

Options are plain buttons with a minimum height of `34px` and `10px` horizontal padding.

Options may contain a line icon and a written label.

Selected options use Sumi Ink background, Sumi Paper text, and a written `SELECTED` state.

Ordinary hover uses Sumi Soft Paper.

Destructive hover uses Sumi Seal Wash and Sumi Seal Deep text.

Grouped options use a one-pixel Sumi Rule divider.

## Motion and dismissal

The menu uses the `160ms` control duration and opacity-first feedback.

Reduced motion removes spatial movement while retaining visibility changes.

Escape, outside activation, and selection dismiss the menu according to the platform contract.

## Native controls

Use a native picker only when native behavior is intentional and documented.

Use the Sumi-Ink dropdown for branded menu surfaces where native popup styling would break the visual contract.

## Accessibility

The trigger exposes expanded state.

Each option exposes selected state.

Keyboard users can open, navigate, select, and dismiss the menu.

VoiceOver users hear the label, current value, expanded state, and option state.

RTL layouts mirror directional indicators and preserve option reading order.
