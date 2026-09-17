import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { STAGGER } from "../../lib/motion";
import { projects } from "../../data/projects";

function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Selected Projects" subtitle="Portfolio" />

        {/* Cards cascade in as they scroll into view.
            1 col mobile → 2 col tablet → 3 col desktop. */}
        <Stagger
          stagger={STAGGER.base}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard {...project} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default Projects;