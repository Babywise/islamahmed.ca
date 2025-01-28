import {
  isInteractiveElement,
  traverseUpForInteractiveElement
} from "./interactiveElements";

describe("isInteractiveElement", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("identifies interactive elements by tag name", () => {
    expect.assertions(6);

    const interactiveTags = ["a", "button", "input", "textarea", "select"];

    interactiveTags.forEach(tag => {
      const element = document.createElement(tag);
      document.body.appendChild(element);

      expect(isInteractiveElement(element)).toBeTruthy();
    });

    const nonInteractiveElement = document.createElement("div");
    document.body.appendChild(nonInteractiveElement);

    expect(isInteractiveElement(nonInteractiveElement)).toBeFalsy();
  });

  test("identifies interactive elements by ARIA role", () => {
    expect.assertions(8);

    const interactiveRoles = [
      "button",
      "link",
      "menuitem",
      "tab",
      "checkbox",
      "radio",
      "switch"
    ];

    interactiveRoles.forEach(role => {
      const element = document.createElement("div");
      element.setAttribute("role", role);
      document.body.appendChild(element);

      expect(isInteractiveElement(element)).toBeTruthy();
    });

    const nonInteractiveElement = document.createElement("div");
    nonInteractiveElement.setAttribute("role", "text");
    document.body.appendChild(nonInteractiveElement);

    expect(isInteractiveElement(nonInteractiveElement)).toBeFalsy();
  });

  test("identifies interactive elements by onclick handler", () => {
    expect.assertions(1);

    const element = document.createElement("div");
    element.setAttribute("onclick", "void(0)");
    document.body.appendChild(element);

    expect(isInteractiveElement(element)).toBeTruthy();
  });

  test("identifies interactive elements by cursor style", () => {
    expect.assertions(2);

    const element = document.createElement("div");
    document.body.appendChild(element);
    const mockGetComputedStyle = vi.fn().mockReturnValue({ cursor: "pointer" });
    Object.defineProperty(window, "getComputedStyle", {
      value: mockGetComputedStyle
    });

    expect(isInteractiveElement(element)).toBeTruthy();

    mockGetComputedStyle.mockReturnValue({
      cursor: "default"
    });

    expect(isInteractiveElement(element)).toBeFalsy();
  });
});

describe("traverseUpForInteractiveElement", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("finds interactive element when starting element is interactive", () => {
    expect.assertions(1);

    const button = document.createElement("button");
    document.body.appendChild(button);

    expect(traverseUpForInteractiveElement(button)).toBe(button);
  });

  test("finds nearest interactive parent", () => {
    expect.assertions(1);

    const link = document.createElement("a");
    const div = document.createElement("div");
    const span = document.createElement("span");

    link.appendChild(div);
    div.appendChild(span);
    document.body.appendChild(link);

    expect(traverseUpForInteractiveElement(span)).toBe(link);
  });

  test("returns null when no interactive element is found", () => {
    expect.assertions(1);

    const div = document.createElement("div");
    const span = document.createElement("span");
    div.appendChild(span);
    document.body.appendChild(div);

    expect(traverseUpForInteractiveElement(span)).toBe(null);
  });

  test("handles multiple levels of interactive elements", () => {
    expect.assertions(1);

    const button = document.createElement("button");
    const link = document.createElement("a");
    const span = document.createElement("span");

    button.appendChild(link);
    link.appendChild(span);
    document.body.appendChild(button);

    // Should return the closest interactive parent (link)
    expect(traverseUpForInteractiveElement(span)).toBe(link);
  });
});
