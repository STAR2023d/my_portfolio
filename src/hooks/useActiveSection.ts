import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view.
 * Uses IntersectionObserver — no scroll listeners, no deps.
 *
 * @param ids - Section element IDs to observe.
 * @returns The id of the currently active section (or null).
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-100px 0px -40% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}