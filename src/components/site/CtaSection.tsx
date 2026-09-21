import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CtaSection({
  title = "Let's Build Something Meaningful.",
  body = "Have a project, partnership, or business opportunity in mind? Let's start a conversation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink py-24 text-background lg:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="display-lg text-background">{title}</h2>
            <p className="mt-6 text-base leading-relaxed text-background/70 md:text-lg">{body}</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-3 bg-background px-8 py-5 text-[0.72rem] font-semibold tracking-[0.16em] text-foreground uppercase transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Start a Conversation <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
