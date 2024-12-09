import "./App.css";

import { useState } from "react";

/**
 * The main application component.
 */
function App() {
  const INITIAL_COUNT = 0;
  const [count, setCount] = useState(INITIAL_COUNT);

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vite.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src="/assets/vite.svg" />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img
            alt="React logo"
            className="logo react"
            src="/assets/react.svg"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            const incrementValue = 1;
            setCount(prevCount => prevCount + incrementValue);
          }}
          type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
