import { Link } from "@tanstack/react-router";
import { navLinks } from "@/data/site";
import { useContent } from "@/lib/content-context";
import DosLogo from "@/assets/dos-group-white.png";
export function Footer() {
  const { contact, companies } = useContent();
  return (
    <footer className="bg-ink text-background/70">
      <div className="container-x py-20 lg:py-28">
        {/* <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-4xl font-semibold tracking-[-0.06em] text-background">
              <img src={DosLogo} alt="DOS Logo" className="h-34 w-auto" />
            </p>
            <p className="mt-4 max-w-sm text-sm tracking-wide">{contact.disciplines}</p>
            <p className="mt-4 max-w-sm text-sm tracking-wide">{contact.address}</p>
            <p className="mt-4 max-w-sm text-sm tracking-wide">
              <a href={`mailto:${contact.email}`} className="hover:text-background">
                {contact.email}
              </a>
            </p>
          </div>
        </div> */}

        <div className="flex flex-col gap-6  text-xs tracking-wide md:flex-row md:items-center md:justify-between">
          
          <p>&copy; {new Date().getFullYear()} DOS. All Rights Reserved.</p>
          <p className="font-display text-4xl font-semibold tracking-[-0.06em] text-background">
              <img src={DosLogo} alt="DOS Logo" className="h-34 w-auto" />
            </p>
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
