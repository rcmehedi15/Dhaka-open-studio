import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaSection } from "@/components/site/CtaSection";
import { services } from "@/data/site";

const title = "Services — Architecture, Development & Delivery | DOS";
const description =
  "Architecture and design, interiors, real estate development, project management, construction solutions, master planning, hospitality development and trade solutions.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="From first sketch to final handover."
        intro="Eight capabilities delivered under one accountable group, so design intent survives all the way to site."
      />

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-x-16 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 70}>
              <ServiceCard index={i + 1} title={service.title} body={service.body} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
