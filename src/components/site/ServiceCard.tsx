export function ServiceCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <article className="group border-t border-border py-8 transition-colors duration-500 hover:border-foreground">
      <div className="flex gap-6">
        <span className="mt-1 w-8 shrink-0 text-xs font-semibold tracking-[0.18em] text-muted-foreground">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-xl transition-transform duration-500 group-hover:translate-x-1">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      </div>
    </article>
  );
}
