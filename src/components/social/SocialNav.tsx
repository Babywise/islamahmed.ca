import "./SocialNav.css";

import type { ReactNode } from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiBehance } from "react-icons/si";

interface SocialLink {
  icon: ReactNode;
  label: string;
  url: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    url: "https://linkedin.com/in/issia"
  },
  {
    icon: <FaGithub />,
    label: "GitHub",
    url: "https://github.com/babywise"
  },
  {
    icon: <SiBehance />,
    label: "Behance",
    url: "https://behance.net/islamdoesart"
  },
  {
    icon: <FaDiscord />,
    label: "Discord",
    url: "https://discord.com/users/197564968931950592"
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
