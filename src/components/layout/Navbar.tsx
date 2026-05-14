import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-scroll";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "projects",
    "experience",
    "contact",
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-xl bg-dark/80 border-b border-slate-800 shadow-lg"
            : "bg-transparent"
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img
            src="/profile.jpeg"
            alt="Jesee Muchoki"
            className="
              w-11
              h-11
              rounded-full
              object-cover
              border
              border-primary/40
           "
          />

  <div>
    <h1 className="font-bold leading-none">
      Jesee Muchoki
    </h1>

    <p className="text-xs text-slate-400 mt-1">
      Full Stack Developer and Agentic AI Engineer
    </p>
  </div>
</div>

        <ul className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {navItems.map((item) => (
            <li key={item}>
              <Link
                to={item}
                smooth
                duration={500}
                spy
                offset={-100}
                activeClass="text-primary"
                className="
                  cursor-pointer
                  hover:text-white
                  transition
                  capitalize
                "
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/js-muc"
            target="_blank"
            className="hover:text-primary transition"
          >
            <Github size={20} />
          </a>

          <a
            href="#"
            className="hover:text-primary transition"
          >
            <Linkedin size={20} />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${
            open
              ? "max-h-96 border-t border-slate-800"
              : "max-h-0"
          }
        `}
      >
        <div className="bg-dark px-6 py-6 flex flex-col gap-6 text-slate-300">

          {navItems.map((item) => (
            <Link
              key={item}
              to={item}
              smooth
              duration={500}
              offset={-100}
              onClick={() => setOpen(false)}
              className="capitalize cursor-pointer"
            >
              {item}
            </Link>
          ))}

          <div className="flex gap-5 pt-4">
            <Github />

            <Linkedin />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;