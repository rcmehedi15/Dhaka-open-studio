import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  ratio = "aspect-[4/5]",
}: {
  project: Project;
  className?: string;
  ratio?: string;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={cn("group block", className)}
    >
      <div className={cn("relative overflow-hidden bg-secondary", ratio)}>
        <img
          src={project.image}
          alt={`${project.name}, ${project.location}`}
          loading="lazy"
          width={1280}
          height={1600}
          className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />
      </div>
      <div className="flex items-start justify-between gap-6 pt-5">
        <div>
          <h3 className="font-display text-xl leading-snug font-medium">{project.name}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {project.location} &middot; {project.category} &middot; {project.year}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
      </div>
    </Link>
  );
}
