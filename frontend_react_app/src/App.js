import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import TodoApp from "./components/todos/TodoApp";

/**
 * Root app shell. Keeps global concerns here (e.g., theme) and delegates the app body
 * to feature components.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const nextThemeLabel = useMemo(
    () => (theme === "light" ? "dark" : "light"),
    [theme],
  );

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="App">
      <header className="app-header container">
        <div className="app-header-row">
          <div>
            <h1 className="title">Retro Todo</h1>
            <p className="subtitle">Add, complete, delete, and filter. Stored locally.</p>
          </div>

          <button
            className="btn theme-toggle-inline"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextThemeLabel} mode`}
            type="button"
          >
            Theme: {theme}
          </button>
        </div>
      </header>

      <main className="container">
        <TodoApp />
      </main>
    </div>
  );
}

export default App;
