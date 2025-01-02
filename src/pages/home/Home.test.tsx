import { render } from "@testing-library/react";

import Home from "./Home";

vi.mock("../../components/social/SocialNav", () => ({
  /**
   * Mock SocialNav component.
   */
  default: () => <div data-testid="social-nav">SocialNav</div>
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
    const mockScrollIntoView = vi.fn();
    const mockElement = Object.assign(document.createElement("div"), {
      scrollIntoView: mockScrollIntoView
    });

    beforeEach(() => {
      vi.mock("global", () => ({
        HTMLElement: {
          prototype: {
            scrollIntoView: mockScrollIntoView
          }
        }
      }));
      // Mock document.getElementById
      vi.spyOn(document, "getElementById").mockImplementation(id => {
        if (id === "start") {
          return mockElement;
        }
        return null;
      });
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("should navigate to start section", () => {
      expect.assertions(2);

      const { container } = render(<Home />);
      const heroButton = container
        .querySelector("#hero")!
        .querySelector("button");

      heroButton?.click();

      expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    });
  });
});
