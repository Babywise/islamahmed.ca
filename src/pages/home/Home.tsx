import { useState } from "react";

/**
 * Home page component.
 */
function Home() {
  const INITIAL_COUNT = 0;
  const [count, setCount] = useState(INITIAL_COUNT);

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vite.dev" rel="noreferrer" target="_blank">
          <img
            alt="Vite logo"
            className="logo"
            src={`${import.meta.env.BASE_URL}/images/vite.svg`}
          />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img
            alt="React logo"
            className="logo react logo-spin"
            src={`${import.meta.env.BASE_URL}/images/react.svg`}
          />
        </a>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold">Vite + React</h1>
        <button
          className="my-2 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
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
    </>
  );
}

export default Home;
