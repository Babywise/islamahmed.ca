import { fireEvent, render } from "@testing-library/react";

import Cursor from "./Cursor";

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = vi.fn(
  (callback: FrameRequestCallback): number => {
    const timeoutId = window.setTimeout(() => {
      callback(Date.now());
    }, 16);
    return Number(timeoutId);
  }
);

const mockCancelAnimationFrame = vi.fn((id: number) => {
  clearTimeout(id);
});

describe("cursor", () => {
  beforeAll(() => {
    window.requestAnimationFrame = mockRequestAnimationFrame;
    window.cancelAnimationFrame = mockCancelAnimationFrame;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  test("renders cursor elements", () => {
    expect.assertions(2);

    // Render the Portal div
    const { container } = render(<div id="cursor" />);
    // Trigger the Render of the Cursor component in the portal
    render(<Cursor />);

    expect(container.querySelector(".cursor-dot")).toBeTruthy();
    expect(container.querySelector(".cursor-ring")).toBeTruthy();
  });

  test("updates cursor visibility on mouse enter/leave", () => {
    expect.assertions(3);

    // Render the Portal div
    const { container } = render(<div id="cursor" />);
    // Trigger the Render of the Cursor component in the portal
    render(<Cursor />);

    const cursorDot = container.querySelector(".cursor-dot");

    // Initially cursor should be invisible
    expect(cursorDot?.classList.contains("cursor-visible")).toBeFalsy();

    // Simulate mouse enter
    fireEvent.mouseEnter(document.body);

    expect(cursorDot?.classList.contains("cursor-visible")).toBeTruthy();

    // Simulate mouse leave
    fireEvent.mouseLeave(document.body);

    expect(cursorDot?.classList.contains("cursor-visible")).toBeFalsy();
  });

  test.todo("updates cursor position on mouse move", () => {
    expect.assertions(1);

    // Render the Portal div
    const { container } = render(<div id="cursor" />);
    // Trigger the Render of the Cursor component in the portal
    render(<Cursor />);

    const cursorDot = container.querySelector(".cursor-dot");

    // Simulate mouse move
    fireEvent.mouseMove(document.body, { clientX: 100, clientY: 100 });

    // Get computed style
    const computedStyle = window.getComputedStyle(cursorDot!);

    expect(computedStyle.transform).not.toBe("none");
  });

  test("handles click events", () => {
    expect.assertions(2);

    // Render the Portal div
    const { container } = render(<div id="cursor" />);
    // Trigger the Render of the Cursor component in the portal
    render(<Cursor />);

    const cursorRing = container.querySelector(".cursor-ring");

    // Simulate mouse down
    fireEvent.mouseDown(document.body);

    expect(cursorRing?.classList.contains("cursor-ring-clicking")).toBeTruthy();

    // Simulate mouse up
    fireEvent.mouseUp(document.body);

    expect(cursorRing?.classList.contains("cursor-ring-clicking")).toBeFalsy();
  });

  test("handles hover state on interactive elements", () => {
    expect.assertions(2);

    // Render the Portal div
    const { container } = render(
      <>
        <div id="cursor" />
        <button type="button">Test Button</button>
      </>
    );
    // Trigger the Render of the Cursor component in the portal
    render(<Cursor />);
    const cursorRing = container.querySelector(".cursor-ring");
    const button = container.querySelector("button");

    // Move mouse over the button to trigger hover detection
    fireEvent.mouseMove(button!);

    expect(cursorRing?.classList.contains("cursor-ring-hovering")).toBeTruthy();

    // Move mouse away from the button
    fireEvent.mouseMove(document.body);

    expect(cursorRing?.classList.contains("cursor-ring-hovering")).toBeFalsy();
  });

  test("cleans up animation frame on unmount", () => {
    expect.assertions(1);

    // Render the Portal div first
    render(<div id="cursor" />);
    // Then render and get unmount for the Cursor component
    const { unmount } = render(<Cursor />);

    // Unmount the Cursor component
    unmount();

    // Should be called with any number (the animation frame ID)
    expect(mockCancelAnimationFrame).toHaveBeenCalledWith(expect.any(Number));
  });
});
