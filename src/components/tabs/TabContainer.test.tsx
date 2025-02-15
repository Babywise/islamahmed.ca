import { fireEvent, render } from "@testing-library/react";

import TabContainer from "./TabContainer";

describe("tabContainer", () => {
  const mockTabs = [
    { content: <div>Content 1</div>, id: "tab1", label: "Tab 1" },
    { content: <div>Content 2</div>, id: "tab2", label: "Tab 2" },
    { content: <div>Content 3</div>, id: "tab3", label: "Tab 3" }
  ];

  test("renders all tab buttons", () => {
    expect.assertions(3);

    const { getByText } = render(<TabContainer tabs={mockTabs} />);

    mockTabs.forEach(tab => {
      expect(getByText(tab.label)).toBeInTheDocument();
    });
  });

  test("shows first tab content by default", () => {
    expect.assertions(3);

    const { getByText, queryByText } = render(<TabContainer tabs={mockTabs} />);

    expect(getByText("Content 1")).toBeInTheDocument();
    expect(queryByText("Content 2")).not.toBeInTheDocument();
    expect(queryByText("Content 3")).not.toBeInTheDocument();
  });

  test("shows default active tab when specified", () => {
    expect.assertions(3);

    const { getByText, queryByText } = render(
      <TabContainer defaultActiveTab="tab2" tabs={mockTabs} />
    );

    expect(queryByText("Content 1")).not.toBeInTheDocument();
    expect(getByText("Content 2")).toBeInTheDocument();
    expect(queryByText("Content 3")).not.toBeInTheDocument();
  });

  test("switches content when clicking different tabs", () => {
    expect.assertions(5);

    const { getByText, queryByText } = render(<TabContainer tabs={mockTabs} />);

    // Initial state
    expect(getByText("Content 1")).toBeInTheDocument();

    // Click second tab
    fireEvent.click(getByText("Tab 2"));

    expect(getByText("Content 2")).toBeInTheDocument();
    expect(queryByText("Content 1")).not.toBeInTheDocument();

    // Click third tab
    fireEvent.click(getByText("Tab 3"));

    expect(getByText("Content 3")).toBeInTheDocument();
    expect(queryByText("Content 2")).not.toBeInTheDocument();
  });

  test("applies active class to selected tab button", () => {
    expect.assertions(4);

    const { getByText } = render(<TabContainer tabs={mockTabs} />);

    const firstTab = getByText("Tab 1").closest("button");
    const secondTab = getByText("Tab 2").closest("button");

    expect(firstTab).toHaveClass("active");
    expect(secondTab).not.toHaveClass("active");

    fireEvent.click(secondTab!);

    expect(firstTab).not.toHaveClass("active");
    expect(secondTab).toHaveClass("active");
  });

  test("handles empty tabs array", () => {
    expect.assertions(2);

    const { container } = render(<TabContainer tabs={[]} />);

    const tabContainer = container.querySelector(".tab-container");
    const tabButton = container.querySelector(".tab-button");

    expect(tabContainer).toBeInTheDocument();
    expect(tabButton).not.toBeInTheDocument();
  });
});
