import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";

import { useActiveSection } from "../../hooks/useActiveSection";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

// ============================================================
// NAV CONFIG
// Order matches the page flow. IDs must match section `id`s.
// ============================================================
const NAV_ITEMS = [
  { id: "tech", label: "Tech" },
  { id: "projects", label: "Projects" },
  { id: "ai", label: "AI" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

// ============================================================
// EXTERNAL LINKS
const SOCIALS = {
  github: "https://github.com/STAR2023d",
  linkedin: "https://www.linkedin.com/in/Dan Mwaura",
} as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const prefersReduced = usePrefersReducedMotion();

  // ------------------------------------------------------------
  // Scroll state — is the navbar past the top of the page?
  // ------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    // Run once immediately — handles deep-link landings.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ------------------------------------------------------------
  // Lock body scroll while mobile menu is open.
  // ------------------------------------------------------------
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // ------------------------------------------------------------
  // Programmatic scroll — respects prefers-reduced-motion.
  // ------------------------------------------------------------
  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-[background-color,border-color,box-shadow] duration-300
        ${
          scrolled
            ? "backdrop-blur-xl bg-dark/80 border-b border-slate-800 shadow-lg"
            : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* ---------- Brand → scrolls to top ---------- */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" })}
          aria-label="Scroll to top"
          className="flex items-center gap-3 cursor-pointer text-left"
        >
          <img
            src="/Dan_profile_pic.png"
            alt=""
            className="w-11 h-11 rounded-full object-cover border border-primary/40"
          />
          <div>
            <h1 className="font-bold leading-none">Dan Kamau Mwaura</h1>
            <p className="text-xs text-slate-400 mt-1">
              Full Stack Developer &amp; Agentic AI Engineer
            </p>
          </div>
        </button>

        {/* ---------- Desktop nav ---------- */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={`
                  cursor-pointer transition-colors
                  ${
                    active === item.id
                      ? "text-primary"
                      : "text-slate-300 hover:text-white"
                  }
                `}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ---------- Desktop socials ---------- */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* ---------- Mobile toggle ---------- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden text-slate-200 cursor-pointer"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* ---------- Mobile menu ---------- */}
      <div
        id="mobile-menu"
        className={`
          md:hidden overflow-hidden transition-[max-height] duration-300 ease-out
          ${open ? "max-h-96 border-t border-slate-800" : "max-h-0"}
        `}
      >
        <div className="bg-dark px-6 py-6 flex flex-col gap-6 text-slate-300">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={`
                text-left cursor-pointer transition-colors
                ${
                  active === item.id
                    ? "text-primary"
                    : "text-slate-300 hover:text-white"
                }
              `}
            >
              {item.label}
            </button>
          ))}

          <div className="flex gap-5 pt-4">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hover:text-primary transition-colors"
            >
              <Github />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hover:text-primary transition-colors"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;