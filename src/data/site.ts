// Central content source. Swap these arrays for CMS/database calls later —
// every component consumes these shapes only.

export const site = {
  name: "DOS",
  tagline: "Designing Spaces. Building Possibilities.",
  disciplines:
    "Architecture | Development | Project Solutions | Agriculture | Trade",
  email: "info@dos.com.bd",
  phone: "+8801723-912306",
  address: "86/1 Ka, Progoti Sharani Cemex Shimul Trisha Trade Center, Kuril, Bissho Road, 1229",
  mapQuery: "Dhaka Open Studio,,  Dhaka, Bangladesh",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "Facebook", href: "https://www.facebook.com" },
  ],
} as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About DOS", to: "/about" },
  { label: "Architecture", to: "/architecture" },
  { label: "Projects", to: "/projects" },
  { label: "Sister Concerns", to: "/sister-concerns" },
  { label: "Services", to: "/services" },
  // { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
] as const;

export const values = [
  { title: "Design", body: "Thoughtful, functional, and timeless design." },
  { title: "Innovation", body: "Exploring better ideas, technologies, and solutions." },
  { title: "Integrity", body: "Building lasting relationships through transparency and trust." },
  { title: "Impact", body: "Creating value for people, communities, and businesses." },
];

export const stats = [
  { value: "17+", label: "Years of Experience" },
  { value: "1000+", label: "Projects & Initiatives" },
  { value: "6", label: "Sister Concerns" },
  { value: "01", label: "Unified Vision" },
];

export const companies = [
  {
    index: "01",
    img : "/src/assets/sister-concerns/dadlogo.png",
    slug: "dos-assets-development",
    name: "DOS Assets Development Ltd.",
    url: "https://dosasset.com",
    short: "Real estate development, property development, and investment.",
    detail:
      "Land acquisition, feasibility, residential and commercial development, and long-horizon property investment across Bangladesh.",
  },
  {
    index: "02",
    img : "/src/assets/sister-concerns/dps-logo.png",
    slug: "dos-project-solutions",
    name: "DOS Project Solutions",
    url: "https://dpsbd.com/",
    short: "Project management, construction solutions, consultancy, and execution.",
    detail:
      "Integrated delivery teams covering procurement, cost control, site supervision, and technical consultancy from mobilisation to handover.",
  },
  {
    index: "03",
    img : "/src/assets/sister-concerns/adrok-garden.png",
    slug: "adrok-garden-resort",
    name: "Adrok Garden Resort Ltd.",
    short: "Hospitality, resort development, leisure, and destination experiences.",
    detail:
      "Destination hospitality assets designed around landscape, wellness, and slow leisure for domestic and regional travellers.",
  },
  {
    index: "04",
    img : "/src/assets/sister-concerns/ak-agro.png",
    slug: "ak-agro",
    name: "AK Agro",
    short: "Agriculture, agro-based business, production, and sustainable development.",
    detail:
      "Sustainable cultivation, agro-processing, and supply partnerships that strengthen rural livelihoods and food systems.",
  },
  {
    index: "05",
    img : "/src/assets/sister-concerns/gz-dps-int-ltd.png",
    slug: "gz-dps-int",
    name: "GZ DPS Int. Ltd.",
    short: "International business, strategic operations, and diversified commercial activities.",
    detail:
      "Cross-border operations, strategic partnerships, and diversified commercial ventures supporting the wider group.",
  },
  {
    index: "06",
    img : "/src/assets/sister-concerns/new-spreading.png",
    slug: "new-spreading-trade",
    name: "New Spreading Trade Ltd.",
    short: "Trading, sourcing, distribution, and commercial solutions.",
    detail:
      "Sourcing networks, import and distribution capability, and commercial solutions for industrial and consumer markets.",
  },
];

export const services = [
  {
    title: "Architecture & Design",
    body: "Architectural planning, concept development, design, visualization, and documentation.",
  },
  {
    title: "Interior Design",
    body: "Functional, sophisticated, and experience-driven interior environments.",
  },
  {
    title: "Real Estate Development",
    body: "Property development, planning, investment, and development strategy.",
  },
  {
    title: "Project Management",
    body: "End-to-end project coordination, execution, supervision, and delivery.",
  },
  {
    title: "Construction Solutions",
    body: "Integrated construction and technical solutions.",
  },
  {
    title: "Master Planning",
    body: "Large-scale planning, urban design, landscape, and development strategy.",
  },
  {
    title: "Hospitality Development",
    body: "Resort, hospitality, and destination development.",
  },
  {
    title: "Business & Trade Solutions",
    body: "Strategic sourcing, trading, supply, and commercial solutions.",
  },
];

export const insightCategories = [
  "Architecture",
  "Design",
  "Real Estate",
  "Construction",
  "Business",
  "Sustainability",
  "Company News",
] as const;

export const projectTypes = [
  "Architecture",
  "Interior",
  "Real Estate Development",
  "Master Planning",
  "Hospitality",
  "Project Management",
  "Other",
] as const;
