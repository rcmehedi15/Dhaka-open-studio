import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/insights";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group">
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          width={1280}
          height={853}
          className="size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
      <p className="eyebrow mt-6">
        {article.category} &middot; {article.date}
      </p>
      <h3 className="mt-3 font-display text-xl leading-snug">{article.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      <span className="rule-link mt-5 text-[0.72rem] font-semibold tracking-[0.16em] uppercase">
        Read More <ArrowRight className="size-4" />
      </span>
    </article>
  );
}
