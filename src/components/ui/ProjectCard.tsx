import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { useMousePosition } from "../../hooks/useMousePosition";
import { EASE, DUR } from "../../lib/motion";

type Props = {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  image: string;
};

function ProjectCard({
  title,
  description,
  tech,
  live,
  github,
  image,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { x, y } = useMousePosition<HTMLDivElement>(cardRef);

  // Tilt values — spring-smoothed for organic feel
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 300, damping: 30 });
  const springTiltY = useSpring(tiltY, { stiffness: 300, damping: 30 });

  // Rotate transforms derived from tilt values
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], ["-4deg", "4deg"]);

  // ------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    tiltX.set(px - 0.5);
    tiltY.set(py - 0.5);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
      }
      whileHover={
        prefersReduced
          ? undefined
          : {
              y: -6,
              scale: 1.02,
              transition: { duration: DUR.sm, ease: EASE.out },
            }
      }
      transition={{ duration: DUR.sm, ease: EASE.out }}
      className="
        group
        relative
        border border-slate-800
        rounded-3xl
        overflow-hidden
        bg-slate-900/40
        transition-colors duration-500
        hover:border-primary/50
        will-change-transform
      "
    >
      {/* SPOTLIGHT — follows cursor */}
      {!prefersReduced && (
        <div
          aria-hidden
          className="
            pointer-events-none
            absolute inset-0
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-500
            z-10
          "
          style={{
            background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(124,58,237,0.15), transparent 40%)`,
          }}
        />
      )}

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-[1.06]
            "
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 p-8">
        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold transition-transform duration-500 ease-out group-hover:-translate-x-0.5">
            {title}
          </h3>

          <ArrowUpRight
            size={22}
            aria-hidden
            className="
              text-primary shrink-0
              transition-transform duration-500 ease-out
              group-hover:translate-x-1 group-hover:-translate-y-1
            "
          />
        </div>

        {/* Description */}
        <p className="mt-5 text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Tech pills */}
        <div className="mt-6 flex flex-wrap gap-3">
          {tech.map((item) => (
            <span
              key={item}
              className="
                text-sm px-4 py-2 rounded-full
                bg-slate-800/80
                text-slate-300
                border border-slate-700/50
                transition-colors duration-300
                group-hover:border-slate-600
              "
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex gap-6 text-sm">
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-primary font-medium
              relative
              after:absolute after:left-0 after:-bottom-0.5
              after:h-px after:w-full
              after:bg-primary after:origin-left
              after:scale-x-0
              hover:after:scale-x-100
              after:transition-transform after:duration-300
            "
          >
            Live Demo
          </a>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-slate-300 font-medium
              transition-colors duration-300
              hover:text-white
            "
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;