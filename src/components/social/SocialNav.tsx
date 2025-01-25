import "./SocialNav.css";

import type { ReactNode } from "react";

export interface SocialLink {
  icon: ReactNode;
  label: string;
  url: string;
}

interface SocialNavProps {
  socialLinks: SocialLink[];
}

/**
 * Social navigation component.
 * @param props The component props containing social links.
 * @param props.socialLinks An array of social links.
 */
function SocialNav({ socialLinks }: SocialNavProps) {
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
