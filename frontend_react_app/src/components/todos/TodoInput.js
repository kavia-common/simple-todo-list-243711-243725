import React, { useState } from "react";

/**
 * Input row for creating a new todo.
 */
// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form className="todo-input" onSubmit={submit}>
      <label className="sr-only" htmlFor="new-todo">
        Add a todo
      </label>

      <input
        id="new-todo"
        className="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a task and hit Enter…"
        autoComplete="off"
      />

      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
