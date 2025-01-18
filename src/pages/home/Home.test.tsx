import { render } from "@testing-library/react";

import Home from "./Home";

vi.mock("../../components/social/SocialNav", () => ({
  /**
   * Mock SocialNav component.
   */
  default: () => <div data-testid="social-nav">SocialNav</div>
}));

vi.mock("../../components/timeline/Timeline", () => ({
  /**
   * Mock Timeline component.
   */
  default: () => <div data-testid="timeline">Timeline</div>
}));

describe("home", () => {
  describe("render", () => {
    test("should render successfully", () => {
      expect.assertions(1);

      const { container } = render(<Home />);

      expect(container).toBeInTheDocument();
    });

    test("should render hero successfully", () => {
      expect.assertions(2);

      const { container } = render(<Home />);
      const hero = container.querySelector("#hero");
      const start = container.querySelector("#start");

      expect(hero).toBeInTheDocument();
      expect(start).toBeInTheDocument();
    });

    test("should render start successfully", () => {
      expect.assertions(1);

      const { container } = render(<Home />);
      const start = container.querySelector("#start");

      expect(start).toBeInTheDocument();
    });

    test("should render social nav successfully", () => {
      expect.assertions(1);

      const { getByTestId } = render(<Home />);

      expect(getByTestId("social-nav")).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    test("should navigate to start section", () => {
      expect.assertions(2);

      // Mock window.scrollTo
      const mockScrollTo = vi.fn();
      window.scrollTo = mockScrollTo;

      // Create mock element
      const mockStartElement = document.createElement("div");

      /**
       * Mock getBoundingClientRect.
       */
      mockStartElement.getBoundingClientRect = () => ({ top: 100 }) as DOMRect;

      // Mock getElementById
      vi.spyOn(document, "getElementById").mockImplementation(id => {
        if (id === "start") return mockStartElement;
        return null;
      });

      // Mock header element
      const mockHeader = document.createElement("header");
      Object.defineProperty(mockHeader, "offsetHeight", { value: 50 });
      vi.spyOn(document, "querySelector").mockImplementation(selector => {
        if (selector === "header") return mockHeader;
        return null;
      });

      // Mock window.scrollY
      Object.defineProperty(window, "scrollY", { value: 0 });

      const { container } = render(<Home />);
      const heroButton = container
        .querySelector("#hero")!
        .querySelector("button");

      heroButton?.click();

      expect(mockScrollTo).toHaveBeenCalledTimes(1);
      expect(mockScrollTo).toHaveBeenCalledWith({
        behavior: "smooth",
        top: 50 // elementPosition (100 + 0) - headerHeight (50)
      });
    });
  });
});
