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

// Classic palette — matches BackgroundGlow
const GOLD  = "214, 178, 110"; // champagne
const TEAL  = "56, 120, 118";  // patina
const ROSE  = "178, 116, 110"; // terracotta

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

  // Slightly gentler rotation than the neon version — reads as "alive"
  // rather than "reactive"
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], ["-3deg", "3deg"]);

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
              scale: 1.015,
              boxShadow: `0 24px 60px -28px rgba(${GOLD},0.22), 0 8px 24px -12px rgba(0,0,0,0.5)`,
              transition: { duration: DUR.sm, ease: EASE.out },
            }
      }
      transition={{ duration: DUR.sm, ease: EASE.out }}
      className="
        group
        relative
        border border-stone-800
        rounded-3xl
        overflow-hidden
        bg-stone-900/50
        backdrop-blur-[2px]
        transition-colors duration-500
        hover:border-[#d6b26e]/40
        will-change-transform
      "
    >
      {/* SPOTLIGHT — follows cursor, warm champagne instead of purple */}
      {!prefersReduced && (
        <div
          aria-hidden
          className="
            pointer-events-none
            absolute inset-0
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-700
            z-10
          "
          style={{
            background: `radial-gradient(640px circle at ${x}px ${y}px, rgba(${GOLD},0.12), rgba(${TEAL},0.05) 30%, transparent 45%)`,
          }}
        />
      )}

      {/* IMAGE — softly warmed, desaturated toward the palette */}
      <div className="relative overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className="
              w-full h-full object-cover
              transition-transform duration-[900ms] ease-out
              group-hover:scale-[1.05]
            "
          />
          {/* Warm wash — keeps photos from fighting the palette */}
          <div
            aria-hidden
            className="
              absolute inset-0 pointer-events-none
              opacity-70 group-hover:opacity-40
              transition-opacity duration-700
            "
            style={{
              background: `linear-gradient(180deg, rgba(20,18,15,0) 40%, rgba(20,18,15,0.7) 100%), radial-gradient(circle at 30% 20%, rgba(${GOLD},0.08), transparent 60%)`,
            }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-20 p-8">
        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="
              text-2xl font-bold tracking-tight
              text-stone-100
              transition-transform duration-500 ease-out
              group-hover:-translate-x-0.5
            "
            style={{ fontFamily: "var(--font-serif, ui-serif, Georgia, serif)" }}
          >
            {title}
          </h3>

          <ArrowUpRight
            size={22}
            aria-hidden
            style={{ color: `rgb(${GOLD})` }}
            className="
              shrink-0
              transition-transform duration-500 ease-out
              group-hover:translate-x-1 group-hover:-translate-y-1
            "
          />
        </div>

        {/* Hairline divider — subtle, classic */}
        <div
          aria-hidden
          className="mt-4 h-px w-12 origin-left transition-all duration-700 group-hover:w-20"
          style={{ background: `rgba(${GOLD},0.35)` }}
        />

        {/* Description */}
        <p className="mt-5 text-stone-400 leading-relaxed">
          {description}
        </p>

        {/* Tech pills */}
        <div className="mt-6 flex flex-wrap gap-3">
          {tech.map((item) => (
            <span
              key={item}
              className="
                text-sm px-4 py-2 rounded-full
                bg-stone-800/60
                text-stone-300
                border border-stone-700/40
                transition-colors duration-500
                group-hover:border-[#d6b26e]/25
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
            style={{ color: `rgb(${GOLD})` }}
            className="
              font-medium
              relative
              after:absolute after:left-0 after:-bottom-0.5
              after:h-px after:w-full
              after:origin-left
              after:scale-x-0
              hover:after:scale-x-100
              after:transition-transform after:duration-300
            "
          >
            <span
              aria-hidden
              className="
                pointer-events-none absolute left-0 -bottom-0.5 h-px w-full
                origin-left scale-x-0
                transition-transform duration-300
                group-hover:scale-x-100
              "
              style={{ background: `rgb(${GOLD})` }}
            />
            Live Demo
          </a>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-medium
              text-stone-400
              transition-colors duration-300
              hover:text-stone-100
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