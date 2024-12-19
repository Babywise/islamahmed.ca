import { useState } from "react";

/**
 * Header Component.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      aria-label="Header"
      className="sticky top-0 flex h-[56px] items-center justify-center overflow-x-hidden font-bold tracking-widest">
      {/* Navbar */}
      <nav
        aria-label="Navbar"
        className="flex size-full items-center justify-between">
        <a
          aria-label="Home"
          className="flex aspect-square h-full max-h-[50px] items-center justify-center object-contain p-0"
          href="/">
          <img
            alt="Logo"
            className="hover:logo-spin size-4/5"
            draggable="false"
            src="/favicon.ico"
          />
        </a>

        {/* Hamburger button for mobile */}
        <button
          aria-controls="navigation-menu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          className="sm:hidden"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          type="button">
          <div aria-hidden="true" className="hamburger-button">
            <span />
            <span />
            <span />
          </div>
        </button>

        {/* Navigation menu */}
        <ul
          aria-label="Navigation menu"
          className={`fixed right-0 top-[56px] w-full transform p-4 transition-none ${isMenuOpen ? "" : "translate-x-full"} sm:relative sm:top-0 sm:flex sm:w-auto sm:translate-x-0 sm:items-center sm:gap-4 sm:bg-transparent sm:p-0`}
          id="navigation-menu"
          role="menubar">
          <li className="sm:py-0" role="none">
            <a className="rounded sm:py-0" href="/" role="menuitem">
              Home
            </a>
          </li>
          <li className="sm:py-0" role="none">
            <a className="rounded sm:py-0" href="/projects" role="menuitem">
              Projects
            </a>
          </li>
          <li className="sm:py-0" role="none">
            <a className="rounded sm:py-0" href="/about" role="menuitem">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
