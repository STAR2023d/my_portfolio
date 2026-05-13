import { ArrowUpRight } from "lucide-react";

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
  return (
    <div
      className="
        group
        border
        border-slate-800
        rounded-3xl
        overflow-hidden
        bg-slate-900/40
        hover:border-primary
        transition
      "
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            w-full
            h-64
            object-cover
            group-hover:scale-105
            transition
            duration-500
          "
        />
      </div>

      <div className="p-8">

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold">
            {title}
          </h3>

          <ArrowUpRight className="text-primary" />
        </div>

        <p className="mt-5 text-slate-400 leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {tech.map((item) => (
            <span
              key={item}
              className="
                text-sm
                px-4
                py-2
                rounded-full
                bg-slate-800
                text-slate-300
              "
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex gap-5">
          <a
            href={live}
            target="_blank"
            className="text-primary hover:underline"
          >
            Live Demo
          </a>

          <a
            href={github}
            target="_blank"
            className="text-slate-300 hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;