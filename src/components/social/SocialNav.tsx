import "./SocialNav.css";

import type { ReactNode } from "react";
import { FaBehance, FaGithub, FaLinkedin } from "react-icons/fa6";

interface SocialLink {
  icon: ReactNode;
  label: string;
  url: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FaLinkedin size={32} />,
    label: "LinkedIn",
    url: "https://linkedin.com/in/issia"
  },
  {
    icon: <FaGithub size={32} />,
    label: "GitHub",
    url: "https://github.com/babywise"
  },
  {
    icon: <FaBehance size={32} />,
    label: "Behance",
    url: "https://behance.net/islamdoesart"
  }
];

/**
 * Social navigation component.
 */
function SocialNav() {
  return (
    <nav className="social-nav">
      <ul>
        {socialLinks.map(link => (
          <li key={link.label}>
            <a
              aria-label={link.label}
              href={link.url}
              rel="noopener noreferrer"
              target="_blank">
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SocialNav;
