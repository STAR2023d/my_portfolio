import { ArrowUp } from "lucide-react";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { scrollToTop } from "../../lib/scroll";

// Centralized external links — keep in sync with Navbar/Contact
const LINKS = {
  github: "https://github.com/js-muc",
  linkedin: "https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE",
  email: "remowangai@gmail.com",
};

function Footer() {
  const prefersReduced = usePrefersReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: copyright */}
        <p className="text-slate-500 text-sm order-2 md:order-1">
          © {year} Jesee Muchoki. All rights reserved.
        </p>

        {/* Center: quick links */}
        <nav
          aria-label="Footer"
          className="flex items-center gap-6 order-1 md:order-2"
        >
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-slate-500 text-sm
              transition-colors duration-300
              hover:text-white
            "
          >
            GitHub
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-slate-500 text-sm
              transition-colors duration-300
              hover:text-white
            "
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${LINKS.email}`}
            className="
              text-slate-500 text-sm
              transition-colors duration-300
              hover:text-white
            "
          >
            Email
          </a>
        </nav>

        {/* Right: back to top */}
        <button
          type="button"
          onClick={() => scrollToTop({ prefersReduced })}
          aria-label="Back to top"
          className="
            group
            flex items-center gap-2
            text-slate-500 text-sm
            transition-colors duration-300
            hover:text-primary
            order-3
            cursor-pointer
          "
        >
          <span>Back to top</span>
          <ArrowUp
            size={14}
            aria-hidden
            className="
              transition-transform duration-300 ease-out
              group-hover:-translate-y-0.5
            "
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;