# Project Constitution — Skeuomorphic Todo

## Principles
1. **Visual realism first**: UI should use layered shadows, soft highlights, tactile controls, and subtle gradients.
2. **Fast interactions**: Common operations (add, complete, delete, filter) should be one-click and instant.
3. **Accessible by default**: Keyboard support, proper labels, visible focus, adequate contrast.
4. **Local-first reliability**: Data persists in localStorage; app remains fully functional offline.
5. **Simple architecture**: Vanilla HTML/CSS/JS, minimal dependencies, clean separation of state/render/events.

## Quality Gates
- No console errors in normal usage.
- Works on modern Chromium at mobile and desktop widths.
- Empty-state, validation-state, and persistence behavior covered.

## Performance Targets
- First render under 200ms on typical laptop.
- Main interaction (toggle/add/delete) under 16ms perceptual latency.
