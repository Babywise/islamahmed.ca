import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/home/Home";

/**
 * The main application component.
 */
function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route element={<Home />} path={`${import.meta.env.BASE_URL}/`} />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </main>
    </>
  );
}

export default App;
