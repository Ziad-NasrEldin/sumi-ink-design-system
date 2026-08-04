# Buttons

## Purpose

Buttons perform an explicit action.

Use a button for a command, not for navigation to a known destination.

## Variants

- Primary buttons use Sumi Ink fill with Sumi Paper text.
- Quiet buttons use Sumi Paper fill with an ink rule.
- Attention buttons use Sumi Seal fill with paper text.
- Destructive buttons use Sumi Seal Deep fill with paper text and written consequence.
- Icon buttons are allowed only when the icon has an accessible written label.

## Contract

Buttons are square with zero radius.

The preferred touch target is `44px`.

The compact command target is `34px`.

Hover may change border, fill, or seal treatment.

Focus uses a visible Sumi Seal outline.

Disabled buttons use Mist and Muted rather than opacity-only treatment.

Loading buttons must preserve the action label and expose a written loading state.

Every state-changing button needs immediate visible feedback.

## Accessibility

The accessible name must describe the action and its object.

Destructive actions must state their consequence before confirmation.

Keyboard activation and VoiceOver activation must produce the same command.
