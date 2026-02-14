# Hero Viewport Fix Verification

## Objective
Ensure the Hero section fits exactly within the viewport on first load, eliminating scroll.

## Changes
- Modified `Hero.tsx` to replace `min-h-screen` with `min-h-[calc(100svh_-_5rem)]`.
- This ensures the Hero height accounts for the 5rem (80px) sticky header.
- Used `svh` (Small Viewport Height) for accurate mobile sizing.

## Constraints Check
- [x] Typography scale unchanged.
- [x] Hero image positioning logic unchanged.
- [x] Header/navigation structure unchanged.
- [x] Global spacing unchanged.
- [x] No transforms or sticky behavior introduced.
- [x] maintain desktop editorial balance.

## Expected Outcome
The total height of `Header (5rem) + Hero (100svh - 5rem)` equals exactly `100svh`, eliminating the initial vertical scroll bar on load while keeping the hero content visible.
