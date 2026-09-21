import residential from "@/assets/comilla-mixed-use-apartment.webp";
import commercial from "@/assets/rangdhanu-commercial-building.webp";
import hospitality from "@/assets/Coxs_Hotel.webp";
import interior from "@/assets/IQBAL_Residence.webp";
import masterplan from "@/assets/rangpur-city-centre.webp";
import about from "@/assets/about.jpg";
import kaziHeights from "@/assets/Kazi_Heights.webp";
import rongdhonuSquare from "@/assets/rongdhonu-square.webp";

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
};

export const articles: Article[] = [
  {
    slug: "designing-for-the-dhaka-climate",
    title: "Designing for the Dhaka climate: shade before glass",
    category: "Architecture",
    date: "12 August 2026",
    excerpt:
      "Why passive shading, deep reveals and cross-ventilation still outperform glazing technology in a humid subtropical city.",
    image: about,
  },
  {
    slug: "material-honesty",
    title: "Material honesty in contemporary Bangladeshi practice",
    category: "Design",
    date: "28 July 2026",
    excerpt:
      "Board-formed concrete, local brick and milled timber — how a restrained palette ages better than applied finishes.",
    image: kaziHeights,
  },
  {
    slug: "value-in-mixed-use",
    title: "Where value is really created in mixed-use development",
    category: "Real Estate",
    date: "05 July 2026",
    excerpt:
      "Ground-plane design, tenancy mix and phasing decide long-term returns far more than headline floor area.",
    image: rongdhonuSquare,
  },
  {
    slug: "sequencing-complex-sites",
    title: "Sequencing complex sites without losing the programme",
    category: "Construction",
    date: "19 June 2026",
    excerpt:
      "Lessons from delivering a constrained inner-city build with continuous neighbour access.",
    image: masterplan,
  },
  {
    slug: "hospitality-as-landscape",
    title: "Hospitality as landscape, not as building",
    category: "Sustainability",
    date: "02 June 2026",
    excerpt:
      "Retaining mature trees and existing water bodies produced a resort that needs far less mechanical cooling.",
    image: hospitality,
  },
  {
    slug: "one-vision-six-companies",
    title: "One vision, six companies: how the DOS ecosystem works",
    category: "Company News",
    date: "14 May 2026",
    excerpt:
      "A look at how architecture, development, solutions and trade reinforce one another inside the group.",
    image: interior,
  },
];
