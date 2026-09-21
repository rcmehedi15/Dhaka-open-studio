import { projects as staticProjects, type Project } from "@/data/projects";
import { companies as staticCompanies, site, stats, values } from "@/data/site";
import fallbackImage from "@/assets/featured.jpg";

export type AboutContent = {
  title: string;
  intro: string;
  approachTitle: string;
  paragraphs: string[];
  values: { title: string; body: string }[];
  stats: { value: string; label: string }[];
};

export type ContactContent = {
  email: string;
  phone: string;
  address: string;
  mapQuery: string;
  tagline: string;
  disciplines: string;
  social: { label: string; href: string }[];
};

export type CompanyContent = {
  index: string;
  slug: string;
  name: string;
  url: string;
  short: string;
  detail: string;
};

export type ProjectContent = {
  slug: string;
  name: string;
  location: string;
  category: string;
  year: string;
  area: string;
  description: string;
  overview: string;
  services: string;
};

export type SiteContent = {
  about: AboutContent;
  contact: ContactContent;
  companies: CompanyContent[];
  projects: ProjectContent[];
};

export const defaultContent: SiteContent = {
  about: {
    title: "Architecture at the Core. Possibility Without Limits.",
    intro:
      "DOS brings together architecture, development, project solutions, hospitality, agriculture, technology, and trading under one growing business ecosystem. Our approach combines creativity, strategic thinking, execution, and long-term value creation.",
    approachTitle: "Design first, then everything it makes possible.",
    paragraphs: [
      "We began as an architecture practice, and that discipline still governs how the whole group works: understand the site and the brief, test the idea honestly, then build it properly.",
      "That single thread now runs through property development, project management, hospitality, agriculture and trade.",
      "We work with private clients, institutions, developers and investors across Bangladesh.",
    ],
    values: values.map((v) => ({ title: v.title, body: v.body })),
    stats: stats.map((s) => ({ value: s.value, label: s.label })),
  },
  contact: {
    email: site.email,
    phone: site.phone,
    address: site.address,
    mapQuery: site.mapQuery,
    tagline: site.tagline,
    disciplines: site.disciplines,
    social: site.social.map((s) => ({ label: s.label, href: s.href })),
  },
  companies: staticCompanies.map((c) => ({
    index: c.index,
    slug: c.slug,
    name: c.name,
    url: "url" in c && typeof c.url === "string" ? c.url : "",
    short: c.short,
    detail: c.detail,
  })),
  projects: staticProjects.map((p) => ({
    slug: p.slug,
    name: p.name,
    location: p.location,
    category: p.category,
    year: p.year,
    area: p.area,
    description: p.description,
    overview: p.overview,
    services: p.services.join(", "),
  })),
};

/** Merge editable text with the images/filters that live in code. */
export function toProject(entry: ProjectContent): Project {
  const base = staticProjects.find((p) => p.slug === entry.slug);
  return {
    slug: entry.slug,
    name: entry.name,
    location: entry.location,
    category: entry.category,
    filters: base?.filters ?? [entry.category],
    year: entry.year,
    area: entry.area,
    description: entry.description,
    overview: entry.overview,
    services: entry.services
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    image: base?.image ?? fallbackImage,
    gallery: base?.gallery ?? [base?.image ?? fallbackImage],
    ...(base?.tall ? { tall: true } : {}),
  };
}

export function mergeContent(rows: { key: string; data: unknown }[]): SiteContent {
  const byKey = new Map(rows.map((r) => [r.key, r.data]));
  const about = byKey.get("about") as AboutContent | undefined;
  const contact = byKey.get("contact") as ContactContent | undefined;
  const companies = byKey.get("companies") as { items?: CompanyContent[] } | undefined;
  const projects = byKey.get("projects") as { items?: ProjectContent[] } | undefined;
  return {
    about: { ...defaultContent.about, ...(about ?? {}) },
    contact: { ...defaultContent.contact, ...(contact ?? {}) },
    companies: companies?.items?.length ? companies.items : defaultContent.companies,
    projects: projects?.items?.length ? projects.items : defaultContent.projects,
  };
}
