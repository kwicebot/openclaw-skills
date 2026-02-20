(() => {
  const STORAGE_KEY = "skeuo.todos.v2";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const clearCompletedBtn = document.getElementById("clear-completed");
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const template = document.getElementById("todo-item-template");

  let todos = loadTodos();
  let currentFilter = "all";

  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function filteredTodos() {
    if (currentFilter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (currentFilter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }

  function setFilter(nextFilter) {
    currentFilter = nextFilter;
    filterButtons.forEach((button) => {
      const selected = button.dataset.filter === nextFilter;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    render();
  }

  function addTodo(text) {
    todos.unshift({
      id: Date.now() + Math.floor(Math.random() * 1000),
      text,
      completed: false
    });
    saveTodos();
    render();
  }

  function toggleTodo(id) {
    todos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return { ...todo, completed: !todo.completed };
    });
    saveTodos();
    render();
  }

  function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    render();
  }

  function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    render();
  }

  function render() {
    list.innerHTML = "";
    const visible = filteredTodos();

    visible.forEach((todo) => {
      const node = template.content.firstElementChild.cloneNode(true);
      const checkbox = node.querySelector(".todo-check");
      const text = node.querySelector(".todo-text");
      const del = node.querySelector(".delete-btn");

      checkbox.checked = todo.completed;
      text.textContent = todo.text;
      node.classList.toggle("completed", todo.completed);

      checkbox.addEventListener("change", () => toggleTodo(todo.id));
      del.addEventListener("click", () => deleteTodo(todo.id));

      list.appendChild(node);
    });

    clearCompletedBtn.disabled = !todos.some((todo) => todo.completed);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTodo(text);
    form.reset();
    input.focus();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });

  clearCompletedBtn.addEventListener("click", clearCompleted);

  setFilter("all");
})();
