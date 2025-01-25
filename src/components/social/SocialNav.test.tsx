import { render } from "@testing-library/react";

import SocialNav from "./SocialNav";

describe("socialNav", () => {
  const mockSocialLinks = [
    {
      icon: <span data-testid="github-icon">GitHub</span>,
      label: "GitHub Profile",
      url: "https://github.com/username"
    },
    {
      icon: <span data-testid="linkedin-icon">LinkedIn</span>,
      label: "LinkedIn Profile",
      url: "https://linkedin.com/in/username"
    }
  ];

  test("should render successfully", () => {
    expect.assertions(1);

    const { container } = render(<SocialNav socialLinks={mockSocialLinks} />);
    const nav = container.querySelector("nav");

    expect(nav).toBeInTheDocument();
  });

  test("should render all social links", () => {
    expect.assertions(2);

    const { container } = render(<SocialNav socialLinks={mockSocialLinks} />);
    const icons = container.querySelectorAll("span");

    expect(icons[0].textContent).toBe("GitHub");
    expect(icons[1].textContent).toBe("LinkedIn");
  });

  test("should render links with correct attributes", () => {
    // 3 assertions per link (href, target, rel)
    expect.assertions(6);

    const { getByLabelText } = render(
      <SocialNav socialLinks={mockSocialLinks} />
    );

    // Test each link by its aria-label
    mockSocialLinks.forEach(expectedLink => {
      const link = getByLabelText(expectedLink.label);

      expect(link).toHaveAttribute("href", expectedLink.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  test("should render empty nav when no links provided", () => {
    expect.assertions(1);

    const { container } = render(<SocialNav socialLinks={[]} />);
    const list = container.querySelector("ul");

    expect(list?.children.length).toBe(0);
  });
});
