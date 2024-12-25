/**
 * List of HTML elements that are inherently interactive.
 */
const INTERACTIVE_ELEMENTS = [
  "a",
  "button",
  "input",
  "textarea",
  "select"
] as const;

/**
 * Type for HTML elements that are inherently interactive.
 */
type InteractiveElement = (typeof INTERACTIVE_ELEMENTS)[number];

/**
 * List of ARIA roles that indicate interactivity.
 */
const INTERACTIVE_ROLES = [
  "button",
  "link",
  "menuitem",
  "tab",
  "checkbox",
  "radio",
  "switch"
] as const;

/**
 * Type for ARIA roles that indicate interactivity.
 */
type InteractiveRole = (typeof INTERACTIVE_ROLES)[number];

/**
 * Checks if an element is interactive based on its tag name, role, or style.
 * @param element The element to check.
 * @returns True if the element is interactive, false otherwise.
 */
export function isInteractiveElement(element: HTMLElement): boolean {
  // Check tag name
  const tagName = element.tagName.toLowerCase();
  if (INTERACTIVE_ELEMENTS.includes(tagName as InteractiveElement)) {
    return true;
  }

  // Check role
  const role = element.getAttribute("role");
  if (role && INTERACTIVE_ROLES.includes(role as InteractiveRole)) {
    return true;
  }

  // Check for onclick handler
  if (element.hasAttribute("onclick")) {
    return true;
  }

  // Check cursor style
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.cursor === "pointer";
}

/**
 * Traverses up the DOM tree from the given element to find the nearest interactive parent element.
 * Includes checking the starting element itself.
 * @param element The element to start traversing from.
 * @returns The nearest interactive element found, or null if none exists.
 */
export function traverseUpForInteractiveElement(
  element: HTMLElement
): HTMLElement | null {
  let current: HTMLElement | null = element;

  while (current) {
    if (isInteractiveElement(current)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}
