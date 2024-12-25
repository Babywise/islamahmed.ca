import "./App.css";

import { Route, Routes } from "react-router-dom";

import Cursor from "./components/cursor/Cursor";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/home/Home";

/**
 * The main application component.
 */
function App() {
  return (
    <>
      <Cursor />
      <Header />
      <main aria-label="Main content">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
