import "./Cursor.css";

import { useCallback, useEffect, useRef, useState } from "react";

import { traverseUpForInteractiveElement } from "./utils/interactiveElements";

/**
 * Custom cursor component that replaces the default cursor with an animated dot and ring.
 * Features smooth animation, hover effects on interactive elements, and click feedback.
 */
const Cursor = () => {
  // State for tracking cursor interactions
  const [isClicking, setIsClicking] = useState(false); // Tracks mouse click state
  const [isHovering, setIsHovering] = useState(false); // Tracks hover state over interactive elements
  const [isVisible, setIsVisible] = useState(false); // Tracks visibility state of the cursor

  // Refs for DOM elements and animation
  const cursorDotRef = useRef<HTMLDivElement>(null); // Reference to the inner dot element
  const cursorRingRef = useRef<HTMLDivElement>(null); // Reference to the outer ring element
  const requestRef = useRef<number>(); // Stores the animation frame request ID
  const previousTimeRef = useRef<number>(); // Tracks the previous animation frame time

  // Position tracking refs
  const mousePosition = useRef({ x: 0, y: 0 }); // Actual mouse position
  const currentPosition = useRef({ x: 0, y: 0 }); // Interpolated cursor position for smooth animation

  /**
   * Animates the cursor movement with smooth interpolation using requestAnimationFrame.
   * This function is called every frame to update the cursor position and scale.
   * @param time The current timestamp provided by requestAnimationFrame.
   */
  const animate = useCallback(
    (time: number) => {
      // Only animate if we have a previous frame to compare against
      if (previousTimeRef.current !== undefined) {
        // Calculate the distance between current cursor position and target mouse position
        // Multiply by 0.2 to create smooth easing effect (lower = smoother but slower)
        const deltaX =
          (mousePosition.current.x - currentPosition.current.x) * 0.75;
        const deltaY =
          (mousePosition.current.y - currentPosition.current.y) * 0.75;

        // Update the cursor position by adding the calculated delta
        // This creates a smooth animation instead of jumping directly to the mouse position
        currentPosition.current.x += deltaX;
        currentPosition.current.y += deltaY;

        // Only update DOM if our cursor elements exist
        if (cursorDotRef.current && cursorRingRef.current) {
          // Set scale based on hover/click state
          // Dot expands significantly on interaction (10x)
          const dotScale = isHovering || isClicking ? "scale(10)" : "scale(1)";
          // Ring expands less dramatically (1.8x)
          const ringScale =
            isHovering || isClicking ? "scale(1.8)" : "scale(1)";

          // Apply transforms to cursor elements:
          // 1. translate3d for hardware-accelerated positioning
          // 2. translate(-50%, -50%) to center the cursor on the mouse point
          // 3. scale for hover/click effects
          cursorDotRef.current.style.transform = `translate3d(${String(currentPosition.current.x)}px, ${String(currentPosition.current.y)}px, 0) translate(-50%, -50%) ${dotScale}`;
          cursorRingRef.current.style.transform = `translate3d(${String(currentPosition.current.x)}px, ${String(currentPosition.current.y)}px, 0) translate(-50%, -50%) ${ringScale}`;
        }
      }
      // Store the current time for the next frame
      previousTimeRef.current = time;
      // Request the next animation frame
      requestRef.current = requestAnimationFrame(animate);
    },
    // Re-create callback when hover or click state changes
    [isHovering, isClicking]
  );

  useEffect(() => {
    /**
     * Updates the cursor position based on the mouse event.
     * Stores the raw mouse coordinates for later interpolation.
     * @param e The mouse event containing cursor coordinates.
     */
    const updateCursorPosition = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    /**
     * Handles the mouse down event.
     * Updates state to show click animation effects.
     */
    const handleMouseDown = () => {
      setIsClicking(true);
    };

    /**
     * Handles the mouse up event.
     * Removes click animation effects.
     */
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    /**
     * Handles the mouse enter event.
     * Updates state to show the cursor.
     */
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    /**
     * Handles the mouse leave event.
     * Updates state to hide the cursor.
     */
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    /**
     * Checks if the mouse is hovering over an interactive element.
     * Updates hover state to show appropriate visual feedback.
     * @param e The mouse event for target element detection.
     */
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = traverseUpForInteractiveElement(target);
      setIsHovering(Boolean(interactiveElement));
    };

    // Set up event listeners for cursor interactions
    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Start the animation loop
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup function to remove event listeners and cancel animation
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  /**
   * Renders two elements:
   * 1. A small dot (cursor-dot) that follows the mouse position
   * 2. A larger ring (cursor-ring) that provides visual feedback for interactions
   * Both elements are animated and styled based on clicking and hovering states.
   */
  return (
    <>
      <div
        className={`cursor-dot ${isVisible ? "cursor-visible" : ""} ${isHovering ? "cursor-dot-hovering" : ""} ${isClicking ? "cursor-dot-clicking" : ""}`}
        ref={cursorDotRef}
      />
      <div
        className={`cursor-ring ${isVisible ? "cursor-visible" : ""} ${isHovering ? "cursor-ring-hovering" : ""} ${isClicking ? "cursor-ring-clicking" : ""}`}
        ref={cursorRingRef}
      />
    </>
  );
};

export default Cursor;
