import "./App.css";

import { Route, Routes } from "react-router-dom";

import NotFound from "./pages/error/NotFound";
import Home from "./pages/home/Home";

/**
 * The main application component.
 */
function App() {
  return (
    <main>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </main>
  );
}

export default App;
