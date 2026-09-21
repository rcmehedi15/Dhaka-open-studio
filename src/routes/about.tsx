import { createFileRoute } from "@tanstack/react-router";
import aboutImage from "@/assets/about.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { useContent } from "@/lib/content-context";

const title = "About DOS — Architecture at the Core | DOS";
const description =
  "DOS brings architecture, development, project solutions, hospitality, agriculture, technology and trading together under one growing business ecosystem.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { about } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="About DOS"
        title={about.title}
        intro={about.intro}
      />

      <section className="py-24 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
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
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our Approach" title={about.approachTitle} />
            <Reveal className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-sand py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Our Values" title="Four principles we hold to." />
          <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70} className="bg-sand p-8 lg:p-10">
                <h3 className="font-display text-xl">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 70} className="bg-background p-8 lg:p-10">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-5xl font-medium tracking-[-0.05em]">
                    {stat.value}
                  </span>
                  <span className="mt-4 block text-sm text-muted-foreground">{stat.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* <CtaSection /> */}
    </>
  );
}
