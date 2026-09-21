import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import aboutImage from "@/assets/about.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CompanyCard } from "@/components/site/CompanyCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import { ArticleCard } from "@/components/site/ArticleCard";
import { CtaSection } from "@/components/site/CtaSection";
import { services } from "@/data/site";
import { useContent, useProjectList } from "@/lib/content-context";
import { articles } from "@/data/insights";

const title = "DOS — Architecture, Development & Group of Companies | Bangladesh";
const description =
  "DOS is an architecture-driven group in Bangladesh shaping spaces, businesses and opportunities through design, development, innovation and strategic vision.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "DOS",
          description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dhaka",
            addressCountry: "BD",
          },
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ArchitectureSection />
      <SisterConcerns />
      <ServicesSection />
      <WhyDos />
      <FeaturedProject />
      <VisionMission />
      <InsightsSection />
      <CtaSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <img
        src={heroImage}
        alt="Contemporary concrete and glass architecture at dusk"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/30" />
      <div className="container-x relative w-full pb-20 lg:pb-28">
        <Reveal>
          <p className="eyebrow text-background/70">DOS — Architecture</p>
          <h1 className="display-xl mt-6 max-w-5xl text-background">
            Designing Spaces. Building Possibilities.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-background/80 md:text-lg">
            DOS is an architecture-driven group shaping spaces, businesses, and opportunities
            through design, development, innovation, and strategic vision.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-3 bg-background px-8 py-5 text-[0.72rem] font-semibold tracking-[0.16em] text-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Explore Our Work <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-3 border border-background/50 px-8 py-5 text-[0.72rem] font-semibold tracking-[0.16em] text-background uppercase transition-colors hover:bg-background hover:text-foreground"
            >
              About DOS
            </Link>
          </div>
        </Reveal>
      </div>
      <ArrowDown
        aria-hidden
        className="absolute right-6 bottom-10 size-5 animate-bounce text-background/60 lg:right-12"
      />
    </section>
  );
}

function AboutSection() {
  const { about } = useContent();
  return (
    <section className="py-24 lg:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="About DOS"
            title={about.title}
            intro={about.intro}
          />
          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
            {about.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70} className="bg-background p-8">
                <h3 className="font-display text-lg">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-foreground px-8 py-5 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Discover DOS <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={120} className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src={aboutImage}
              alt="Concrete stair and shadow detail"
              loading="lazy"
              width={1280}
              height={1600}
              className="size-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const projects = useProjectList();
  return (
    <section className="border-y border-border bg-sand py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Architecture"
          title="Architecture That Shapes Experience."
          intro="Residential, commercial, hospitality, interior, landscape and master planning work — grounded in climate, material and the way people actually use a place."
        />
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.slug} delay={i * 90}>
              <ProjectCard project={project} ratio={i === 1 ? "aspect-[4/5]" : "aspect-[3/4]"} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16">
          <Link to="/architecture" className="rule-link text-sm font-semibold tracking-wide">
            View all architecture <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function SisterConcerns() {
  const { companies } = useContent();
  return (
    <section className="py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Sister Concerns"
          title="A Growing Ecosystem of Possibilities."
          intro="Beyond architecture, DOS is building a diversified ecosystem of businesses focused on development, solutions, hospitality, agriculture, technology, and trade."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, i) => (
            <Reveal key={company.slug} delay={(i % 3) * 80}>
              <CompanyCard company={company} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="border-t border-border py-24 lg:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Services"
            title="What We Do."
            intro="Eight capabilities, delivered by one accountable group."
          />
        </div>
        <div className="grid gap-x-14 sm:grid-cols-2 lg:col-span-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 60}>
              <ServiceCard index={i + 1} title={service.title} body={service.body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyDos() {
  const { about } = useContent();
  return (
    <section className="bg-secondary py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="Why DOS?" title="Different businesses. One vision." />
        <dl className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="bg-secondary p-8 lg:p-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-medium tracking-[-0.05em] lg:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-4 block text-sm text-muted-foreground">{stat.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function FeaturedProject() {
  const projects = useProjectList();
  const p = projects[projects.length - 1] ?? projects[0]!;
  return (
    <section className="relative min-h-[85svh] overflow-hidden">
      <img
        src={p.image}
        alt={`${p.name}, ${p.location}`}
        loading="lazy"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/65" />
      <div className="container-x relative flex min-h-[85svh] items-end py-24">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-background/60">Featured Project</p>
          <h2 className="display-lg mt-6 text-background">{p.name}</h2>
          <p className="mt-4 text-sm tracking-wide text-background/70">
            {p.location} &middot; {p.category} &middot; {p.year}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-background/80">
            {p.description}
          </p>
          <Link
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="mt-10 inline-flex items-center gap-3 bg-background px-8 py-5 text-[0.72rem] font-semibold tracking-[0.16em] text-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View Project <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="grid border-b border-border lg:grid-cols-2">
      <Reveal className="border-b border-border px-6 py-20 lg:border-r lg:border-b-0 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-lg">
          <p className="eyebrow">Vision</p>
          <div aria-hidden className="mt-8 space-y-2">
            <span className="block h-px w-24 bg-foreground" />
            <span className="block h-px w-16 bg-border" />
            <span className="block h-px w-40 bg-border" />
          </div>
          <p className="mt-10 font-display text-2xl leading-snug tracking-[-0.02em] lg:text-3xl">
            To become a trusted and innovative business group that transforms ideas into meaningful
            spaces, successful ventures, and lasting value.
          </p>
        </div>
      </Reveal>
      <Reveal delay={120} className="bg-sand px-6 py-20 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-lg">
          <p className="eyebrow">Mission</p>
          <div aria-hidden className="mt-8 space-y-2">
            <span className="block h-px w-40 bg-foreground" />
            <span className="block h-px w-16 bg-border" />
            <span className="block h-px w-24 bg-border" />
          </div>
          <p className="mt-10 font-display text-2xl leading-snug tracking-[-0.02em] lg:text-3xl">
            To deliver thoughtful design, reliable execution, innovative solutions, and responsible
            business practices across every venture we undertake.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function InsightsSection() {
  return (
    <section className="py-24 lg:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Insights" title="Thinking, Notes & Company News." />
          <Reveal>
            <Link to="/insights" className="rule-link text-sm font-semibold tracking-wide">
              All insights <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {articles.slice(0, 3).map((article, i) => (
            <Reveal key={article.slug} delay={i * 90}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
