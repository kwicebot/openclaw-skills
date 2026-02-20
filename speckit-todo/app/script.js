const STORAGE_KEY = 'skeuo.todos.v1';

const state = {
  todos: loadTodos(),
  filter: 'all'
};

const listEl = document.getElementById('list');
const countEl = document.getElementById('count');
const addForm = document.getElementById('addForm');
const inputEl = document.getElementById('todoInput');
const clearBtn = document.getElementById('clearCompleted');
const filterBtns = [...document.querySelectorAll('.chip')];

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
}

function filteredTodos() {
  if (state.filter === 'active') return state.todos.filter(t => !t.completed);
  if (state.filter === 'completed') return state.todos.filter(t => t.completed);
  return state.todos;
}

function render() {
  const items = filteredTodos();
  listEl.innerHTML = items.map(todo => `
    <li class="item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
      <button class="check" aria-label="toggle complete"></button>
      <span class="text">${escapeHtml(todo.text)}</span>
      <button class="remove" aria-label="delete task">Delete</button>
    </li>
  `).join('');

  const activeCount = state.todos.filter(t => !t.completed).length;
  countEl.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;

  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === state.filter);
  });
}

function addTodo(text) {
  state.todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now()
  });
  saveTodos();
  render();
}

function toggleTodo(id) {
  const todo = state.todos.find(t => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveTodos();
  render();
}

function removeTodo(id) {
  state.todos = state.todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

function clearCompleted() {
  state.todos = state.todos.filter(t => !t.completed);
  saveTodos();
  render();
}

function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

addForm.addEventListener('submit', e => {
  e.preventDefault();
  const value = inputEl.value.trim();
  if (!value) return;
  addTodo(value);
  inputEl.value = '';
  inputEl.focus();
});

listEl.addEventListener('click', e => {
  const item = e.target.closest('.item');
  if (!item) return;
  const id = item.dataset.id;

  if (e.target.classList.contains('check')) toggleTodo(id);
  if (e.target.classList.contains('remove')) removeTodo(id);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener('click', clearCompleted);

render();
