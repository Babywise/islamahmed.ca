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

vi.mock("./components/cursor/Cursor", () => ({
  /**
   * Mock Cursor component.
   */
  default: () => <div data-testid="cursor">Cursor</div>
}));

vi.mock("./components/header/Header", () => ({
  /**
   * Mock Header component.
   */
  default: () => <div data-testid="header">Header</div>
}));

vi.mock("./components/footer/Footer", () => ({
  /**
   * Mock Footer component.
   */
  default: () => <div data-testid="footer">Footer</div>
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
  describe("render", () => {
    beforeEach(() => {
      // Reset the URL before each test
      window.history.pushState({}, "", "/");
    });

    test("should render successfully", () => {
      expect.assertions(1);

      const { container } = render(<App />, { wrapper: RouterWrapper });

      expect(container).toBeInTheDocument();
    });

    test("should render main successfully", () => {
      expect.assertions(1);

      const { container } = render(<App />, { wrapper: RouterWrapper });

      expect(container.querySelector("main")).toBeInTheDocument();
    });

    test("should render header successfully", () => {
      expect.assertions(1);

      const { getByTestId } = render(<App />, { wrapper: RouterWrapper });

      expect(getByTestId("header")).toBeInTheDocument();
    });

    test("should render footer successfully", () => {
      expect.assertions(1);

      const { getByTestId } = render(<App />, { wrapper: RouterWrapper });

      expect(getByTestId("footer")).toBeInTheDocument();
    });

    test("should render cursor successfully", () => {
      expect.assertions(1);

      const { getByTestId } = render(<App />, { wrapper: RouterWrapper });

      expect(getByTestId("cursor")).toBeInTheDocument();
    });
  });

  describe("routing", () => {
    test("should render home page by default", () => {
      expect.assertions(1);

      const { getByTestId } = render(<App />, { wrapper: RouterWrapper });

      // Home page should be rendered by default
      expect(getByTestId("home-page")).toBeInTheDocument();
    });

    test("should render 404 page when route is invalid", () => {
      expect.assertions(1);

      window.history.pushState({}, "", "/invalid-route");
      const { getByTestId } = render(<App />, { wrapper: RouterWrapper });

      // Should show 404 page
      expect(getByTestId("not-found-page")).toBeInTheDocument();
    });
  });
});
