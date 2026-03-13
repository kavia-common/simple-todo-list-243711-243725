import React from "react";

/**
 * A single todo row.
 */
// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? "is-completed" : ""}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? "not completed" : "completed"}`}
        />
        <span className="todo-text">{todo.text}</span>
      </label>

      <button
        className="btn btn-danger"
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  );
}
