# Dialogs, sheets, and popovers

## Hierarchy

Prefer inline expansion, inspectors, and anchored sheets before full modal dialogs.

Use a dialog when the user must make a focused decision before returning to the underlying task.

Use a popover for short contextual actions or information.

Use a sheet for a bounded workflow that needs more space.

## Contract

Overlays use paper surfaces, one-pixel rules, and zero radius.

Destructive confirmation includes the object, consequence, and cancellation path.

Overlay focus is trapped while the overlay is active and returns to the trigger after dismissal.

Escape and cancellation must not mutate state.

The overlay must not claim success before the underlying operation confirms.

Reduced motion removes spatial travel while retaining state visibility.
