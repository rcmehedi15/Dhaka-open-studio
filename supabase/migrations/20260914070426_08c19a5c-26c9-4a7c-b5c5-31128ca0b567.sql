CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.grant_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_grant_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_first_admin();

CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins can update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

INSERT INTO public.site_content (key, data) VALUES
('about', $json${
  "title": "Architecture at the Core. Possibility Without Limits.",
  "intro": "DOS brings together architecture, development, project solutions, hospitality, agriculture, technology, and trading under one growing business ecosystem. Our approach combines creativity, strategic thinking, execution, and long-term value creation.",
  "approachTitle": "Design first, then everything it makes possible.",
  "paragraphs": [
    "We began as an architecture practice, and that discipline still governs how the whole group works: understand the site and the brief, test the idea honestly, then build it properly. Drawing decisions and delivery decisions are made by the same people.",
    "That single thread now runs through property development, project management, hospitality, agriculture and trade. Each company stands on its own commercially, but they share one standard of care and one long-term view of value.",
    "We work with private clients, institutions, developers and investors across Bangladesh — and design for the climate, the culture and the economics of the places we build in."
  ],
  "values": [
    {"title": "Design", "body": "Thoughtful, functional, and timeless design."},
    {"title": "Innovation", "body": "Exploring better ideas, technologies, and solutions."},
    {"title": "Integrity", "body": "Building lasting relationships through transparency and trust."},
    {"title": "Impact", "body": "Creating value for people, communities, and businesses."}
  ],
  "stats": [
    {"value": "10+", "label": "Years of Experience"},
    {"value": "50+", "label": "Projects & Initiatives"},
    {"value": "6", "label": "Sister Concerns"},
    {"value": "01", "label": "Unified Vision"}
  ]
}$json$::jsonb),
('contact', $json${
  "email": "hello@dosgroup.com.bd",
  "phone": "+880 1700 000000",
  "address": "House 42, Road 11, Banani, Dhaka 1213, Bangladesh",
  "mapQuery": "Banani, Dhaka, Bangladesh",
  "tagline": "Designing Spaces. Building Possibilities.",
  "disciplines": "Architecture | Development | Solutions | Hospitality | Agriculture | Trade",
  "social": [
    {"label": "LinkedIn", "href": "https://www.linkedin.com"},
    {"label": "Instagram", "href": "https://www.instagram.com"},
    {"label": "Facebook", "href": "https://www.facebook.com"}
  ]
}$json$::jsonb),
('companies', $json${"items": [
  {"index":"01","slug":"dos-assets-development","name":"DOS Assets Development Ltd.","url":"https://dosasset.com","short":"Real estate development, property development, and investment.","detail":"Land acquisition, feasibility, residential and commercial development, and long-horizon property investment across Bangladesh."},
  {"index":"02","slug":"dos-project-solutions","name":"DOS Project Solutions","url":"https://dpsbd.com/","short":"Project management, construction solutions, consultancy, and execution.","detail":"Integrated delivery teams covering procurement, cost control, site supervision, and technical consultancy from mobilisation to handover."},
  {"index":"03","slug":"adrok-garden-resort","name":"Adrok Garden Resort Ltd.","url":"","short":"Hospitality, resort development, leisure, and destination experiences.","detail":"Destination hospitality assets designed around landscape, wellness, and slow leisure for domestic and regional travellers."},
  {"index":"04","slug":"ak-agro","name":"AK Agro","url":"","short":"Agriculture, agro-based business, production, and sustainable development.","detail":"Sustainable cultivation, agro-processing, and supply partnerships that strengthen rural livelihoods and food systems."},
  {"index":"05","slug":"gz-dps-int","name":"GZ DPS Int. Ltd.","url":"","short":"International business, strategic operations, and diversified commercial activities.","detail":"Cross-border operations, strategic partnerships, and diversified commercial ventures supporting the wider group."},
  {"index":"06","slug":"new-spreading-trade","name":"New Spreading Trade Ltd.","url":"","short":"Trading, sourcing, distribution, and commercial solutions.","detail":"Sourcing networks, import and distribution capability, and commercial solutions for industrial and consumer markets."}
]}$json$::jsonb),
('projects', $json${"items": [
  {"slug":"shaded-court-residence","name":"Shaded Court Residence","location":"Gulshan, Dhaka","category":"Residential","year":"2024","area":"8,400 sq ft","description":"A private family house organised around a shaded courtyard, timber screens and deep concrete overhangs tuned to the Dhaka climate.","overview":"The house folds around a central court that draws light and air into every room while keeping the interior shielded from street noise and low western sun. Board-formed concrete is paired with locally milled timber louvres that filter glare and give the facade its shifting daily rhythm.","services":"Architecture, Interior Design, Project Management"},
  {"slug":"meridian-corporate-tower","name":"Meridian Corporate Tower","location":"Motijheel, Dhaka","category":"Commercial","year":"2023","area":"310,000 sq ft","description":"A 24-storey office tower with a precast fin facade that reduces solar gain while giving the building a strong vertical presence.","overview":"Meridian responds to a dense commercial block with a slender vertical profile and a deep-fin envelope. Floorplates are column-free at the perimeter, allowing flexible tenant layouts and generous daylight across an efficient core-to-glass depth.","services":"Architecture, Master Planning, Construction Solutions"},
  {"slug":"adrok-garden-resort","name":"Adrok Garden Resort","location":"Gazipur","category":"Hospitality","year":"2025","area":"12 acres","description":"A landscape-led resort of low timber pavilions, reflecting pools and native planting set within a restored garden estate.","overview":"Guest pavilions sit lightly on the site, arranged so that each opens onto water or planting. The masterplan retains mature trees, restores the existing water body, and threads circulation through shaded garden rooms rather than corridors.","services":"Architecture, Master Planning, Hospitality Development"},
  {"slug":"travertine-lobby","name":"Travertine Lobby","location":"Banani, Dhaka","category":"Interior","year":"2024","area":"6,200 sq ft","description":"A sculptural arrival interior in travertine, oak and concealed linear light for a premium residential address.","overview":"The lobby is conceived as a single continuous surface: a cast stair curves through travertine walls, with lighting held in recessed reveals so the material — not the fittings — carries the room.","services":"Interior Design, Project Management"},
  {"slug":"riverside-district-plan","name":"Riverside District Plan","location":"Narayanganj","category":"Master Planning","year":"2025","area":"46 acres","description":"A mixed-use district framework balancing housing density, public green space and a restored waterfront edge.","overview":"The plan sets a walkable block structure with a continuous public edge along the water. Density is concentrated inland, freeing the riverfront for parkland, flood buffering and civic amenity.","services":"Master Planning, Real Estate Development"},
  {"slug":"terrace-gardens-mixed-use","name":"Terrace Gardens","location":"Purbachal, Dhaka","category":"Commercial","year":"2026","area":"520,000 sq ft","description":"A stepped mixed-use development where every level carries planted terraces, softening the mass against the city skyline.","overview":"Terrace Gardens layers retail, workspace and homes into a cascading section. Planted terraces shade the floor below, collect rainwater, and give every unit outdoor space — a dense building that still reads as landscape.","services":"Architecture, Real Estate Development, Project Management, Construction Solutions"}
]}$json$::jsonb);