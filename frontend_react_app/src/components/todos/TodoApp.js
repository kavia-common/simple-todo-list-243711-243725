import React, { useEffect, useMemo, useState } from "react";
import TodoInput from "./TodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";

const STORAGE_KEY = "todos.v1";

function createId() {
  // Small, dependency-free ID that’s good enough for local todos.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readTodosFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeTodosToStorage(todos) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

/**
 * Todo feature root. Owns todo state and persistence, renders smaller reusable UI parts.
 */
// PUBLIC_INTERFACE
export default function TodoApp() {
  const [todos, setTodos] = useState(() => readTodosFromStorage());
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    writeTodosToStorage(todos);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [filter, todos]);

  const counts = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    return { total, completed, active: total - completed };
  }, [todos]);

  // PUBLIC_INTERFACE
  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) => [{ id: createId(), text: trimmed, completed: false }, ...prev]);
  };

  // PUBLIC_INTERFACE
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  // PUBLIC_INTERFACE
  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.completed));

  return (
    <section className="card" aria-label="Todo application">
      <TodoInput onAdd={addTodo} />

      <div className="todo-meta" aria-live="polite">
        <span>
          Active: <strong>{counts.active}</strong>
        </span>
        <span>
          Completed: <strong>{counts.completed}</strong>
        </span>
        <span>
          Total: <strong>{counts.total}</strong>
        </span>
      </div>

      <TodoFilters
        filter={filter}
        onChange={setFilter}
        onClearCompleted={clearCompleted}
        hasCompleted={counts.completed > 0}
      />

      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </section>
  );
}
