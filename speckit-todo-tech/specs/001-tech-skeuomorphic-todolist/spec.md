# Spec: Tech Skeuomorphic Todo List

## ID
001-tech-skeuomorphic-todolist

## Goal
Create a single-page todo application with a tech-themed skeuomorphic UI that supports common todo workflows and persists state locally.

## In Scope
- Add todo
- Toggle completion state
- Delete todo
- Filter todos by all, active, completed
- Clear completed todos
- Persist todos in `localStorage` using key `skeuo.todos.v2`
- Keyboard-friendly interactions and clear focus states
- Tech skeuomorphic visual treatment (neon cyan/blue/purple glow, dark glass panel, tactile controls)

## Out of Scope
- Multi-user sync
- Back-end storage
- Drag-and-drop sorting
- Due dates, tags, priorities

## Functional Requirements
1. User can add a non-empty todo from the input control.
2. User can mark a todo complete/incomplete.
3. User can remove a todo.
4. User can switch list filters: all, active, completed.
5. User can clear all completed todos in one action.
6. App must restore todos from `localStorage` key `skeuo.todos.v2` on load.
7. App must write updates back to the same key after state changes.

## Accessibility Requirements
1. All interactive controls are keyboard reachable.
2. Focus indicator is clearly visible on controls.
3. Form controls include labels or accessible names.
4. Filter controls expose active state.

## Acceptance Criteria
1. Todos remain after refresh.
2. Switching filters updates visible list correctly.
3. Clear completed removes only completed items.
4. App is fully operable without a mouse.
5. UI presents a cohesive dark neon tech-skeuomorphic style.
