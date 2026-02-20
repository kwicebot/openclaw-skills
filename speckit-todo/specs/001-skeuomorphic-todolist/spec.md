# Spec: Skeuomorphic TodoList

## Feature
A skeuomorphic styled Todo app that feels tactile and physical while remaining simple and fast.

## User Stories
1. As a user, I can add a todo with Enter or Add button.
2. As a user, I can mark a todo complete/incomplete.
3. As a user, I can delete a todo.
4. As a user, I can filter items by All / Active / Completed.
5. As a user, my todos are saved and restored after reload.

## Functional Requirements
- Input validation: ignore empty/whitespace items.
- Item object: `{ id, text, completed, createdAt }`.
- Display count of active tasks.
- Clear completed tasks button.
- Persist state to localStorage key: `skeuo.todos.v1`.

## Non-Functional Requirements
- Responsive layout (mobile-first).
- Keyboard accessible controls.
- No framework dependency.
