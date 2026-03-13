import React from "react";
import TodoItem from "./TodoItem";

/**
 * Renders a list of todos.
 */
// PUBLIC_INTERFACE
export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">Nothing here. Add your first todo above.</p>;
  }

  return (
    <ul className="todo-list" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
