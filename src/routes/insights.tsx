import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ArticleCard } from "@/components/site/ArticleCard";
import { CtaSection } from "@/components/site/CtaSection";
import { articles } from "@/data/insights";
import { insightCategories } from "@/data/site";
import { cn } from "@/lib/utils";

const title = "Insights — Architecture, Design & Development Notes | DOS";
const description =
  "Writing from the DOS studio on architecture, design, real estate, construction, business, sustainability and company news.";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const [category, setCategory] = useState<string>("All");
  const visible = useMemo(
    () => (category === "All" ? articles : articles.filter((a) => a.category === category)),
    [category],
  );

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes from the studio and the group."
        intro="Short, practical writing on how we design, build and grow — and what we learn on the way."
      />

      <section className="border-b border-border">
        <div className="container-x flex gap-x-8 overflow-x-auto py-5">
          {["All", ...insightCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "shrink-0 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors",
                category === c
                  ? "text-foreground underline underline-offset-8"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((article, i) => (
            <Reveal key={article.slug} delay={(i % 3) * 80}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="container-x text-sm text-muted-foreground">
            Nothing published in this category yet.
          </p>
        ) : null}
      </section>

      {/* <CtaSection /> */}
    </>
  );
}
