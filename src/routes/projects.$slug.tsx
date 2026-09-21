import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { getProject } from "@/data/projects";
import { useProjectList } from "@/lib/content-context";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable | DOS" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.project;
    const title = `${p.name}, ${p.location} — ${p.category} | DOS`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <div className="container-x flex min-h-[70svh] flex-col justify-center py-32">
      <h1 className="display-lg">Project not found</h1>
      <Link to="/projects" className="rule-link mt-8 text-sm font-semibold">
        <ArrowLeft className="size-4" /> Back to projects
      </Link>
    </div>
  );
}

function ProjectDetail() {
  const { project: fallback } = Route.useLoaderData();
  const projects = useProjectList();
  const project = projects.find((p) => p.slug === fallback.slug) ?? fallback;
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section className="relative min-h-[80svh] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name}, ${project.location}`}
          width={1920}
          height={1088}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="container-x relative flex min-h-[80svh] items-end pb-16 lg:pb-24">
          <Reveal>
            <p className="eyebrow text-background/60">{project.category}</p>
            <h1 className="display-lg mt-6 max-w-3xl text-background">{project.name}</h1>
            <p className="mt-4 text-sm tracking-wide text-background/70">
              {project.location} &middot; {project.year}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-xl leading-relaxed lg:text-2xl">{project.description}</p>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              {project.overview}
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-border border-y border-border text-sm">
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-muted-foreground">Location</dt>
                <dd className="text-right">{project.location}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="text-right">{project.category}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-muted-foreground">Area</dt>
                <dd className="text-right">{project.area}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-muted-foreground">Completion</dt>
                <dd className="text-right">{project.year}</dd>
              </div>
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-muted-foreground">Services</dt>
                <dd className="max-w-[60%] text-right">{project.services.join(", ")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal
              key={src + i}
              delay={(i % 2) * 90}
              className={i === 0 ? "md:col-span-2" : undefined}
            >
              <div
                className={
                  i === 0
                    ? "aspect-[16/9] overflow-hidden bg-secondary"
                    : "aspect-[4/5] overflow-hidden bg-secondary"
                }
              >
                <img
                  src={src}
                  alt={`${project.name} — view ${i + 1}`}
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="size-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x">
          <h2 className="eyebrow">More projects</h2>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.location} &middot; {p.year}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
