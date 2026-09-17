import { useEffect, useState, type RefObject } from "react";

type MousePosition = { x: number; y: number };

/**
 * Tracks the mouse position relative to a referenced element.
 * The caller owns the ref and passes it in.
 *
 * Uses requestAnimationFrame to batch updates — prevents render
 * storms on high-polling-rate mice (up to 1000Hz).
 *
 * Usage:
 *   const cardRef = useRef<HTMLDivElement>(null);
 *   const { x, y } = useMousePosition(cardRef);
 *   <div ref={cardRef}>...</div>
 */
export function useMousePosition<T extends HTMLElement>(
  ref: RefObject<T>
): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    let latest = { x: 0, y: 0 };

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      latest = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setPosition(latest);
          rafId = null;
        });
      }
    };

    const handleLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      setPosition({ x: 0, y: 0 });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return position;
}