import { render } from "@testing-library/react";

import Footer from "./Footer";

describe("footer", () => {
  test("should render successfully", () => {
    expect.assertions(1);

    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");

    expect(footer).toBeInTheDocument();
  });
});
