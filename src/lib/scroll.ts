/**
 * Smoothly scrolls to an element by ID.
 *
 * Centralized so the behavior is consistent across Navbar, Hero,
 * Footer, and anywhere else that needs to jump to a section.
 *
 * Respects prefers-reduced-motion: falls back to instant scroll
 * for users who request it.
 */
export function scrollToId(
  id: string,
  options?: { prefersReduced?: boolean }
): void {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: options?.prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Smoothly scrolls to the top of the page.
 */
export function scrollToTop(options?: { prefersReduced?: boolean }): void {
  window.scrollTo({
    top: 0,
    behavior: options?.prefersReduced ? "auto" : "smooth",
  });
}