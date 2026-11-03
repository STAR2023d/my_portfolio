import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const TYPE_MS = 70; // per character typed
const DELETE_MS = 35; // per character deleted
const HOLD_MS = 1600; // pause on a finished word
const GAP_MS = 350; // pause before the next word starts

type Props = {
  roles: readonly string[];
  className?: string;
};

/** Types a role, holds, deletes it, then moves to the next one. */
export function TypingRoles({ roles, className }: Props) {
  const prefersReduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;

    const full = roles[index];
    const finishedTyping = !deleting && text === full;
    const finishedDeleting = deleting && text === "";

    const delay = finishedTyping
      ? HOLD_MS
      : finishedDeleting
        ? GAP_MS
        : deleting
          ? DELETE_MS
          : TYPE_MS;

    const timer = setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
      } else if (finishedDeleting) {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else {
        setText(
          deleting
            ? full.slice(0, text.length - 1)
            : full.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, roles, prefersReduced]);

  return (
    <div className={`inline-flex items-center h-10 ${className ?? ""}`}>
      {/* Screen readers get the full list once, not every keystroke */}
      <span className="sr-only">{roles.join(", ")}</span>

      <span aria-hidden>{prefersReduced ? roles[0] : text}</span>

      {!prefersReduced && (
        <span
          aria-hidden
          className="ml-1 inline-block w-[2px] h-[1.1em] bg-current animate-pulse"
        />
      )}
    </div>
  );
}