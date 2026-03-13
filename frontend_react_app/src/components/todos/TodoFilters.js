import React from "react";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

/**
 * Filter + bulk actions row.
 */
// PUBLIC_INTERFACE
export default function TodoFilters({ filter, onChange, onClearCompleted, hasCompleted }) {
  return (
    <div className="todo-filters" role="toolbar" aria-label="Todo filters">
      <div className="segmented" role="radiogroup" aria-label="Filter todos">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`segmented-btn ${filter === f.value ? "is-active" : ""}`}
            onClick={() => onChange(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        className="btn btn-ghost"
        type="button"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </div>
  );
}
