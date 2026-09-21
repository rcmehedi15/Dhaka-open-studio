import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { projectTypes } from "@/data/site";
import { useContent } from "@/lib/content-context";

const title = "Contact DOS — Let's Build Something Meaningful | DOS";
const description =
  "Start a project, partnership or business conversation with DOS. Studio in Dhaka, Bangladesh.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const fieldClass =
  "w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground";

function ContactPage() {
  const { contact } = useContent();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's Build Something Meaningful."
        intro="Have a project, partnership, or business opportunity in mind? Let's start a conversation."
      />

      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow">Name</span>
                <input required name="name" className={fieldClass} placeholder="Your full name" />
              </label>
              <label className="block">
                <span className="eyebrow">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className={fieldClass}
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <span className="eyebrow">Phone</span>
                <input name="phone" className={fieldClass} placeholder="+880" />
              </label>
              <label className="block">
                <span className="eyebrow">Company</span>
                <input name="company" className={fieldClass} placeholder="Organisation" />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow">Project Type</span>
                <select name="projectType" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Select a type
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className={fieldClass}
                  placeholder="Tell us about the site, the brief, or the opportunity."
                />
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-foreground px-8 py-5 text-[0.72rem] font-semibold tracking-[0.16em] text-background uppercase transition-colors hover:bg-accent"
                >
                  Start a Conversation <ArrowRight className="size-4" />
                </button>
                {sent ? (
                  <p role="status" className="mt-5 text-sm text-muted-foreground">
                    Thank you — your message has been noted. We will be in touch shortly.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-8 text-sm">
              <div>
                <h2 className="eyebrow">Studio</h2>
                <address className="mt-3 leading-relaxed not-italic">{contact.address}</address>
              </div>
              <div>
                <h2 className="eyebrow">Phone</h2>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="rule-link mt-3">
                  {contact.phone}
                </a>
              </div>
              <div>
                <h2 className="eyebrow">Email</h2>
                <a href={`mailto:${contact.email}`} className="rule-link mt-3">
                  {contact.email}
                </a>
              </div>
              <div>
                <h2 className="eyebrow">Follow</h2>
                <div className="mt-3 flex gap-6">
                  {contact.social.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rule-link">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <iframe
          title="DOS studio location on Google Maps"
          src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
          loading="lazy"
          className="h-[420px] w-full grayscale"
        />
      </section>
    </>
  );
}
