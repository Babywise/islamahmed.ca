import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// Mock the page components
vi.mock("./pages/home/Home", () => ({
  /**
   * Mock Home page.
   */
  default: () => <div data-testid="home-page">Home Page</div>
}));

vi.mock("./pages/error/NotFound", () => ({
  /**
   * Mock 404 page.
   */
  default: () => <div data-testid="not-found-page">404 Page</div>
}));

/**
 * Wraps the given React node in a Router provider for testing.
 * @param ReactNode The React node to wrap.
 * @param ReactNode.children The children to wrap.
 */
const RouterWrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter basename={`${import.meta.env.BASE_URL}/`}>
    {children}
  </BrowserRouter>
);

describe("app", () => {
  beforeEach(() => {
    // Reset the URL before each test
    window.history.pushState({}, "", "/");
  });

  test("renders the app with main content", () => {
    expect.assertions(4);

    const { container } = render(<App />, { wrapper: RouterWrapper });

    // Test container rendering
    expect(container).toBeInTheDocument();

    const header = container.querySelector("header");
    const footer = container.querySelector("footer");
    const main = container.querySelector("main");

    // Test header, footer and main presence using container
    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });

  test("renders home page on root route", () => {
    expect.assertions(1);

    const { getByTestId } = render(<App />, { wrapper: RouterWrapper });

    // Home page should be rendered by default
    expect(getByTestId("home-page")).toBeInTheDocument();
  });

  test("renders 404 page for invalid routes", () => {
    expect.assertions(1);

    window.history.pushState({}, "", "/invalid-route");
    const { getByTestId } = render(<App />, { wrapper: RouterWrapper });

    // Should show 404 page
    expect(getByTestId("not-found-page")).toBeInTheDocument();
  });
});
