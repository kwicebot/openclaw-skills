# Implementation Plan

## Stack
- HTML5 + CSS3 + Vanilla JavaScript (ES6)
- Storage: browser localStorage

## Architecture
- `app/index.html`: structure and semantic controls
- `app/styles.css`: skeuomorphic theme system, components, responsive behavior
- `app/script.js`: state management, rendering, event handling, persistence

## Data Model
```js
Todo = {
  id: string,
  text: string,
  completed: boolean,
  createdAt: number
}
```

## Key Decisions
- Use event delegation on list for scalable interactions.
- Keep one source of truth state object and pure-ish render pipeline.
- Keep CSS tokens in `:root` for easy visual tuning.
