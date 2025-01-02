import "./Header.css";

import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

/**
 * Header Component.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header aria-label="Header">
      {/* Navbar */}
      <nav aria-label="Navbar" className="header-nav">
        {/* Logo */}
        <a aria-label="Home" href="/">
          <svg viewBox="0 0 1000 1285.05" xmlns="http://www.w3.org/2000/svg">
            <path d="M509.59,1010.14c-66.49,0-98.46-52.43-98.46-117.64,0-102.29,24.29-245.5,24.29-407.9,0-129.15-16.62-170.06-16.62-189.24,0-14.07,14.07-21.74,38.36-21.74,88.23,0,140.65,47.31,140.65,107.41,0,88.23-39.64,337.57-39.64,476.94,0,93.34,14.07,103.57,14.07,116.36,0,25.57-39.64,35.8-62.65,35.8Z" />
          </svg>
        </a>

        {/* Hamburger button for mobile */}
        <button
          aria-controls="navigation-menu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          type="button">
          <GiHamburgerMenu size={30} />
        </button>

        {/* Navigation menu */}
        <ul
          aria-label="Navigation menu"
          className={isMenuOpen ? "" : "translate-x-full"}
          role="menubar">
          <li role="none">
            <a href="/projects" role="menuitem">
              Projects
            </a>
          </li>
          <li role="none">
            <a href="/about" role="menuitem">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
