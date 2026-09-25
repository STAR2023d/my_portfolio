import {
  siReact,
  siTypescript,
  siNextdotjs,
  siAngular,
  siTailwindcss,
  siFramer,
  siNodedotjs,
  siExpress,
  siMongodb,
  siLangchain,
  siDocker,
  siGithub,
  siVercel,
  siPython,
  type SimpleIcon,
  siFlutter,
  siFirebase,
  siDjango,
  siCrewai,
} from "simple-icons";

import { OpenAIIcon } from "./OpenAIIcon";

/**
 * Map of slug → Simple Icon object.
 * OpenAI is handled separately (see OpenAIIcon) because Simple Icons
 * removed it for trademark reasons.
 */
const ICONS: Record<string, SimpleIcon> = {
  react: siReact,
  typescript: siTypescript,
  nextdotjs: siNextdotjs,
  angular: siAngular,
  tailwindcss: siTailwindcss,
  framer: siFramer,
  nodedotjs: siNodedotjs,
  express: siExpress,
  mongodb: siMongodb,
  langchain: siLangchain,
  docker: siDocker,
  github: siGithub,
  vercel: siVercel,
  python: siPython,
  flutter: siFlutter,
  dart: { ...siFlutter, title: "Dart" }, // Flutter is Dart, but Simple Icons calls it Flutter
  firebase: siFirebase,
  django: siDjango,
  crewai: siCrewai,
};

type Props = {
  /** Slug from techstack.ts (e.g. "react", "typescript"). */
  slug: string;
  /** Size in pixels. Default: 16. */
  size?: number;
  className?: string;
};

/**
 * Renders a tech logo SVG from a slug.
 *
 * Handles OpenAI locally (removed from Simple Icons for trademark).
 * Returns null if the slug isn't mapped (graceful fallback).
 */
export function TechIcon({ slug, size = 16, className }: Props) {
  // Special case: OpenAI
  if (slug === "openai") {
    return <OpenAIIcon size={size} className={className} />;
  }

  const icon = ICONS[slug];
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}