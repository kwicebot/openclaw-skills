# Implementation Plan: Tech Skeuomorphic Todo List

## Architecture
- Static client app with three files in `app/`:
  - `index.html`: structure and accessible controls
  - `styles.css`: skeuomorphic tech visual system and focus styles
  - `script.js`: state management, rendering, persistence

## Data Model
- `todos: Array<{ id: number, text: string, completed: boolean }>`
- `currentFilter: "all" | "active" | "completed"`
- Persistence key: `skeuo.todos.v2`

## Interaction Flow
1. Load: parse persisted todos from localStorage.
2. Add: validate trimmed input, append item, save, render.
3. Toggle: update item completed flag, save, render.
4. Delete: remove by id, save, render.
5. Filter: set active filter and re-render.
6. Clear completed: drop completed items, save, render.

## Accessibility Plan
- Semantic form and buttons.
- Checkbox control per todo for keyboard toggling.
- Visible `:focus-visible` ring and glow.
- `aria-pressed` on filter buttons for selected state.

## Verification
- Manual smoke checks for all feature requirements.
- Keyboard-only pass for add, toggle, delete, filter, clear.
- Refresh persistence check for `skeuo.todos.v2`.
