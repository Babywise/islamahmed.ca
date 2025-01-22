import { render } from "@testing-library/react";

import NotFound from "./NotFound";

vi.mock("../../components/three/Three404", () => ({
  /**
   * Mock Three404 component.
   */
  default: () => <div>Three404</div>
}));

describe("notFound", () => {
  test("should render successfully", () => {
    expect.assertions(1);

    const { container } = render(<NotFound />);
    const section = container.querySelector("#not-found");

    expect(section).toBeInTheDocument();
  });
});
