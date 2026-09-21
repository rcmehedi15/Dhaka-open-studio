import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { CompanyCard } from "@/components/site/CompanyCard";
import { CtaSection } from "@/components/site/CtaSection";
import { useContent } from "@/lib/content-context";

const title = "Sister Concerns — A Growing Ecosystem | DOS";
const description =
  "Six companies across real estate development, project solutions, hospitality, agriculture, international business and trade — all part of the DOS group.";

export const Route = createFileRoute("/sister-concerns")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sister-concerns" },
    ],
    links: [{ rel: "canonical", href: "/sister-concerns" }],
  }),
  component: SisterConcernsPage,
});

function SisterConcernsPage() {
  const { companies } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="Sister Concerns"
        title="A Growing Ecosystem of Possibilities."
        intro="Beyond architecture, DOS is building a diversified ecosystem of businesses focused on development, solutions, hospitality, agriculture, technology, and trade."
      />

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((company, i) => (
            <Reveal key={company.slug} delay={(i % 3) * 80}>
              <CompanyCard company={company} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* <CtaSection
        title="Different businesses. One vision."
        body="Partnership, supply, investment or development — tell us which part of the ecosystem you need."
      /> */}
    </>
  );
}
