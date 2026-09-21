import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        solid
          ? "border-b border-border/80 bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-x flex items-center justify-between transition-[height] duration-500",
          solid ? "h-16 lg:h-20" : "h-20 lg:h-28",
        )}
      >
        <Link
          to="/"
          aria-label="DOS home"
          className={cn(
            "group flex items-baseline gap-2 font-display text-2xl leading-none font-semibold tracking-[-0.06em] transition-colors",
            solid ? "text-foreground" : "text-background",
          )}
        >
          DOS
          <span
            className={cn(
              "hidden text-[0.65rem] font-semibold tracking-[0.26em] uppercase transition-colors sm:inline",
              solid ? "text-muted-foreground" : "text-background/70",
            )}
          >
            - Dhaka Open Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 xl:flex">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ "data-current": "true" }}
              className={cn(
                "nav-link relative text-[0.78rem] font-medium tracking-wide transition-colors",
                solid
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-background/75 hover:text-background",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className={cn(
              "hidden rounded-none px-5 py-3 text-[0.68rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 lg:inline-flex",
              solid
                ? "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"
                : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            Start a Project
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex size-11 items-center justify-center transition-colors xl:hidden",
              solid || open ? "text-foreground" : "text-background",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/80 bg-background transition-[max-height] duration-500 xl:hidden",
          open ? "max-h-[36rem]" : "max-h-0 border-t-0",
        )}
      >
        <nav className="container-x flex flex-col py-5">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="border-b border-border/60 py-4 font-display text-lg text-foreground last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-6 mb-3 bg-foreground px-6 py-4 text-center text-[0.72rem] font-semibold tracking-[0.16em] text-background uppercase"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
