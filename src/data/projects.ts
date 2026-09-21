import residential from "@/assets/comilla-mixed-use-apartment.webp";
import commercial from "@/assets/rangdhanu-commercial-building.webp";
import hospitality from "@/assets/50 Bed Genesis Hospital.webp";
import interior from "@/assets/IQBAL_Residence.webp";
import masterplan from "@/assets/rangpur-city-centre.webp";
import featured from "@/assets/Kazi_Heights.webp";
import rongdhonuSquare from "@/assets/rongdhonu-square.webp";
import aboutImg from "@/assets/about.jpg";

export type Project = {
  slug: string;
  name: string;
  location: string;
  category: string;
  filters: string[];
  year: string;
  area: string;
  description: string;
  overview: string;
  services: string[];
  image: string;
  gallery: string[];
  tall?: boolean;
};

export const projects: Project[] = [
  {
    slug: "shaded-court-residence",
    name: "Comilla Mixed Use Apartment",
    location: "Comilla, Bangladesh",
    category: "Residential",
    filters: ["Architecture", "Residential"],
    year: "2024",
    area: "8,400 sq ft",
    description:
      "A private family house organised around a shaded courtyard, timber screens and deep concrete overhangs tuned to the Dhaka climate.",
    overview:
      "The house folds around a central court that draws light and air into every room while keeping the interior shielded from street noise and low western sun. Board-formed concrete is paired with locally milled timber louvres that filter glare and give the facade its shifting daily rhythm.",
    services: ["Architecture", "Interior Design", "Project Management"],
    image: residential,
    gallery: [residential, interior, aboutImg],
    tall: true,
  },
  {
    slug: "Rangdhanu-Commercial-Building",
    name: "Rangdhanu Commercial Building",
    location: "Bashundhara, Dhaka",
    category: "Commercial",
    filters: ["Architecture", "Commercial", "Development"],
    year: "2023",
    area: "310,000 sq ft",
    description:
      "A 24-storey office tower with a precast fin facade that reduces solar gain while giving the building a strong vertical presence.",
    overview:
      "Meridian responds to a dense commercial block with a slender vertical profile and a deep-fin envelope. Floorplates are column-free at the perimeter, allowing flexible tenant layouts and generous daylight across an efficient core-to-glass depth.",
    services: ["Architecture", "Master Planning", "Construction Solutions"],
    image: commercial,
    gallery: [commercial, rongdhonuSquare],
  },
  {
    slug: "50-bed-genesis-hospital",
    name: "50 Bed Genesis Hospital",
    location: "Gazipur",
    category: "Hospitality",
    filters: ["Hospitality", "Architecture", "Development"],
    year: "2025",
    area: "12 acres",
    description:
      "A landscape-led resort of low timber pavilions, reflecting pools and native planting set within a restored garden estate.",
    overview:
      "Guest pavilions sit lightly on the site, arranged so that each opens onto water or planting. The masterplan retains mature trees, restores the existing water body, and threads circulation through shaded garden rooms rather than corridors.",
    services: ["Architecture", "Master Planning", "Hospitality Development"],
    image: hospitality,
    gallery: [hospitality, masterplan],
    tall: true,
  },
  {
    slug: "travertine-lobby",
    name: "Travertine Lobby",
    location: "Banani, Dhaka",
    category: "Interior",
    filters: ["Interior", "Architecture"],
    year: "2024",
    area: "6,200 sq ft",
    description:
      "A sculptural arrival interior in travertine, oak and concealed linear light for a premium residential address.",
    overview:
      "The lobby is conceived as a single continuous surface: a cast stair curves through travertine walls, with lighting held in recessed reveals so the material — not the fittings — carries the room.",
    services: ["Interior Design", "Project Management"],
    image: interior,
    gallery: [interior, residential],
  },
  {
    slug: "riverside-district-plan",
    name: "Riverside District Plan",
    location: "Narayanganj",
    category: "Master Planning",
    filters: ["Master Planning", "Development"],
    year: "2025",
    area: "46 acres",
    description:
      "A mixed-use district framework balancing housing density, public green space and a restored waterfront edge.",
    overview:
      "The plan sets a walkable block structure with a continuous public edge along the water. Density is concentrated inland, freeing the riverfront for parkland, flood buffering and civic amenity.",
    services: ["Master Planning", "Real Estate Development"],
    image: masterplan,
    gallery: [masterplan, rongdhonuSquare],
  },
  {
    slug: "terrace-gardens-mixed-use",
    name: "Terrace Gardens",
    location: "Purbachal, Dhaka",
    category: "Commercial",
    filters: ["Development", "Architecture", "Residential", "Commercial"],
    year: "2026",
    area: "520,000 sq ft",
    description:
      "A stepped mixed-use development where every level carries planted terraces, softening the mass against the city skyline.",
    overview:
      "Terrace Gardens layers retail, workspace and homes into a cascading section. Planted terraces shade the floor below, collect rainwater, and give every unit outdoor space — a dense building that still reads as landscape.",
    services: [
      "Architecture",
      "Real Estate Development",
      "Project Management",
      "Construction Solutions",
    ],
    image: featured,
    gallery: [featured, rongdhonuSquare, commercial],
    tall: true,
  },
];

export const featuredProject = projects[5]!;

export const projectFilters = [
  "All",
  "Architecture",
  "Development",
  "Interior",
  "Hospitality",
  "Commercial",
  "Residential",
];

export const architectureCategories = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Interior",
  "Landscape",
  "Master Planning",
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
