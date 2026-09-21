import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CtaSection } from "@/components/site/CtaSection";
import { projectFilters } from "@/data/projects";
import { useProjectList } from "@/lib/content-context";
import { cn } from "@/lib/utils";

const title = "Projects — Architecture & Development Portfolio | DOS";
const description =
  "A portfolio of DOS architecture, development, interior, hospitality, commercial and residential projects across Bangladesh.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = useProjectList();
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All" ? projects : projects.filter((p) => p.filters.includes(filter)),
    [filter, projects],
  );

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Built work, in progress and on the boards."
        intro="Each project below carries its own drawings, photography, area, programme and delivered services."
      />

      <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur-md lg:top-20">
        <div className="container-x flex gap-x-8 gap-y-2 overflow-x-auto py-5">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "shrink-0 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors",
                filter === f
                  ? "text-foreground underline underline-offset-8"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-x-8 gap-y-16 md:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 80}>
              <ProjectCard project={project} ratio="aspect-[16/11]" />
            </Reveal>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="container-x text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        ) : null}
      </section>

      <CtaSection />
    </>
  );
}
