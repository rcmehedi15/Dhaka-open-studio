import { ArrowRight, ExternalLink } from "lucide-react";
import type { CompanyContent } from "@/lib/content";

type Company = CompanyContent;

export function CompanyCard({ company }: { company: Company }) {
  const isExternal = Boolean(company.url);

  if (isExternal) {
    return (
      <a
        id={company.slug}
        href={company.url}
        target="_blank"
        rel="noreferrer"
        className="group relative flex scroll-mt-28 flex-col justify-between border border-border bg-card p-8 transition-colors duration-500 hover:border-foreground lg:p-10"
      >
        <div>
          <div className="flex items-start justify-between">
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-muted-foreground">
              {company.index}
            </span>
            <span
              aria-hidden
              className="block size-12 border border-border transition-all duration-700 group-hover:rotate-45 group-hover:border-foreground"
            />
          </div>
          <h3 className="mt-10 font-display text-2xl leading-tight">{company.name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{company.short}</p>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
            <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="block pt-4">{company.detail}</span>
            </p>
          </div>
        </div>
        <span className="rule-link mt-10 text-[0.72rem] font-semibold tracking-[0.16em] uppercase">
          Visit Website <ExternalLink className="size-4" />
        </span>
      </a>
    );
  }

  return (
    <article
      id={company.slug}
      className="group relative flex scroll-mt-28 flex-col justify-between border border-border bg-card p-8 transition-colors duration-500 hover:border-foreground lg:p-10"
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="font-display text-sm font-semibold tracking-[0.2em] text-muted-foreground">
            {company.index}
          </span>
          <span
            aria-hidden
            className="block size-12 border border-border transition-all duration-700 group-hover:rotate-45 group-hover:border-foreground"
          />
        </div>
        <h3 className="mt-10 font-display text-2xl leading-tight">{company.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{company.short}</p>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="block pt-4">{company.detail}</span>
          </p>
        </div>
      </div>
      <span className="rule-link mt-10 text-[0.72rem] font-semibold tracking-[0.16em] uppercase">
        Explore Company <ArrowRight className="size-4" />
      </span>
    </article>
  );
}
