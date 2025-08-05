/**
 * Smoothly scrolls the page to the element with the specified ID.
 *
 * @param id - The ID of the target element to scroll to.
 * @param offset - An optional offset (in pixels) to adjust the final scroll position. Defaults to 0.
 *
 * @remarks
 * If the element with the specified ID is not found, a warning is logged to the console.
 *
 * @example
 * ```typescript
 * // Scroll to the element with ID 'section1' with no offset
 * scrollToId('section1');
 *
 * // Scroll to the element with ID 'section2' with an offset of -50 pixels
 * scrollToId('section2', -50);
 * ```
 */
export function scrollToId(id: string, offset = 0): void {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID '${id}' not found.`);
    return;
  }

  const y = element.getBoundingClientRect().top + window.scrollY + offset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}
