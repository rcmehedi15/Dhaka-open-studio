import { Link } from "@tanstack/react-router";
import { navLinks } from "@/data/site";
import { useContent } from "@/lib/content-context";

export function Footer() {
  const { contact, companies } = useContent();
  return (
    <footer className="bg-ink text-background/70">
      <div className="container-x py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-4xl font-semibold tracking-[-0.06em] text-background">
              DOS
            </p>
            <p className="mt-4 max-w-sm text-sm tracking-wide">{contact.disciplines}</p>
            <p className="mt-10 font-display text-2xl leading-tight text-background">
              {contact.tagline}
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Quick links">
            <h2 className="eyebrow text-background/50">Quick Links</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {navLinks.slice(1).map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-background">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-background/50">Sister Concerns</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {companies.map((c) => (
                <li key={c.slug}>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-background"
                    >
                      {c.name}
                    </a>
                  ) : (
                    <Link
                      to="/sister-concerns"
                      hash={c.slug}
                      className="transition-colors hover:text-background"
                    >
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-background/15 pt-8 text-xs tracking-wide md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} DOS. All Rights Reserved.</p>
          <div className="flex gap-6">
            {contact.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-background"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
