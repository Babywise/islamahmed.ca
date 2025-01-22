import { act, render } from "@testing-library/react";

import Header from "./Header";

describe("header", () => {
  test("should render successfully", () => {
    expect.assertions(1);

    const { container } = render(<Header />);
    const header = container.querySelector("header");

    expect(header).toBeInTheDocument();
  });

  test("should render the menu button within header-nav", () => {
    expect.assertions(2);

    const { container } = render(<Header />);
    const nav = container.querySelector(".header-nav");
    const menuButton = nav?.querySelector("button");

    // Button should exist but have lg:hidden class
    expect(menuButton).toBeInTheDocument();
    expect(nav).toContainElement(menuButton as HTMLElement);
  });

  test("should not render the dropdown menu by default", () => {
    expect.assertions(2);

    const { container } = render(<Header />);
    const menuButton = container.querySelector("button");
    const menu = container.querySelector("ul");

    expect(menu).toHaveClass("translate-x-full");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  test("should render the dropdown menu on menu button click", () => {
    expect.assertions(4);

    const { container } = render(<Header />);
    const menuButton = container.querySelector("button");
    const menu = container.querySelector("ul");

    // Initially menu should be hidden
    expect(menu).toHaveClass("translate-x-full");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    act(() => {
      menuButton?.click();
    });

    // After click menu should be visible
    expect(menu).not.toHaveClass("translate-x-full");
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
  });

  test("should close the dropdown menu on menu button click", () => {
    expect.assertions(6);

    const { container } = render(<Header />);
    const menuButton = container.querySelector("button");
    const menu = container.querySelector("ul");

    // Initially menu should be hidden
    expect(menu).toHaveClass("translate-x-full");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    act(() => {
      menuButton?.click();
    });

    // After click menu should be visible
    expect(menu).not.toHaveClass("translate-x-full");
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    act(() => {
      menuButton?.click();
    });

    // After click menu should be hidden
    expect(menu).toHaveClass("translate-x-full");
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });
});
