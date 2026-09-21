import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CtaSection } from "@/components/site/CtaSection";
import { architectureCategories } from "@/data/projects";
import { useProjectList } from "@/lib/content-context";
import { cn } from "@/lib/utils";

const title = "Architecture — Projects That Shape Experience | DOS";
const description =
  "Residential, commercial, hospitality, interior, landscape and master planning architecture by DOS, designed for the climate and culture of Bangladesh.";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/architecture" },
    ],
    links: [{ rel: "canonical", href: "/architecture" }],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  const projects = useProjectList();
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="Architecture That Shapes Experience."
        intro="Our architectural work spans private houses, workplaces, resorts, interiors, landscape and whole districts — held together by climate-led thinking and an honest material palette."
      />

      <section className="border-b border-border py-10">
        <div className="container-x flex flex-wrap gap-x-8 gap-y-3">
          {architectureCategories.map((c) => (
            <span key={c} className="eyebrow">
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x columns-1 gap-8 md:columns-2 lg:columns-3">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={(i % 3) * 80}
              className={cn("mb-14 break-inside-avoid")}
            >
              <ProjectCard
                project={project}
                ratio={project.tall ? "aspect-[3/4]" : "aspect-[4/5]"}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection title="Have a site in mind?" body="Send us the plot, the brief, or just the ambition — we will tell you honestly what is possible." />
    </>
  );
}
