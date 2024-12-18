import { useState } from "react";

/**
 * Header Component.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      aria-label="Header"
      className="sticky top-0 flex h-[56px] items-center justify-center overflow-x-hidden bg-general-60/25 font-bold tracking-widest text-general-10/75">
      {/* Navbar */}
      <nav
        aria-label="Navbar"
        className="flex size-full items-center justify-between">
        <img
          alt="Logo"
          className="aspect-square h-full object-contain p-[5px]"
          src={`${import.meta.env.BASE_URL}/favicon.ico`}
        />

        {/* Hamburger button for mobile */}
        <button
          aria-label="Toggle menu"
          className="p-2 sm:hidden"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          type="button">
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-general-10/75" />
            <span className="block h-0.5 w-6 bg-general-10/75" />
            <span className="block h-0.5 w-6 bg-general-10/75" />
          </div>
        </button>

        {/* Navigation menu */}
        <ul
          aria-label="Navigation menu"
          className={`fixed right-0 top-[56px] w-full transform bg-general-60/95 p-4 transition-none ${isMenuOpen ? "" : "translate-x-full"} sm:relative sm:top-0 sm:flex sm:w-auto sm:translate-x-0 sm:items-center sm:gap-4 sm:bg-transparent sm:p-0`}
          role="menubar">
          <li
            className="flex justify-center py-2 hover:underline sm:py-0"
            role="none">
            <a href={`${import.meta.env.BASE_URL}/`} role="menuitem">
              Home
            </a>
          </li>
          <li
            className="flex justify-center py-2 hover:underline sm:py-0"
            role="none">
            <a href={`${import.meta.env.BASE_URL}/projects`} role="menuitem">
              Projects
            </a>
          </li>
          <li
            className="flex justify-center py-2 hover:underline sm:py-0"
            role="none">
            <a href={`${import.meta.env.BASE_URL}/about`} role="menuitem">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
