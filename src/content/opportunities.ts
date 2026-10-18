/** Opportunity areas: where the platform matches businesses to tenders, partners and investments. */
import type { ImageName } from "./images";
import type { PillarId } from "./pillars";
import { related, type PlaceRef } from "./corridors";

export type Opportunity = {
  slug: string;
  title: string;
  text: string;
  pillar: PillarId;
  place: PlaceRef;
  corridor?: string;
  sector: string;
  image: ImageName;
};

export const opportunities: Opportunity[] = [
  { slug: "auto-components-chennai", title: "Automobile components supply", text: "Supply parts and components to and from Chennai’s automobile industry, with lower duties into Oman under the CEPA.", pillar: "export", place: { c: "india", r: "tamil-nadu", city: "chennai" }, corridor: "chennai-sohar", sector: "Automobiles", image: "opp-fabrication" },
  { slug: "sohar-freezone-logistics", title: "Port logistics and free zone services", text: "Warehousing, freight and services for businesses at SOHAR Port and Freezone.", pillar: "export", place: { c: "oman", r: "north-batinah", city: "sohar" }, sector: "Logistics", image: "opp-warehousing" },
  { slug: "it-services-gulf", title: "Technology services for the Gulf", text: "Software, digital and engineering services from Bengaluru for clients in Muscat and across the region.", pillar: "export", place: { c: "india", r: "karnataka", city: "bengaluru" }, corridor: "bengaluru-muscat", sector: "IT and software", image: "hero-team-laptops" },
  { slug: "duqm-industrial-supply", title: "Industrial supply for Al Wusta", text: "Materials, equipment and services for projects in the Special Economic Zone at Duqm.", pillar: "procurement", place: { c: "oman", r: "al-wusta" }, sector: "Industrial supply", image: "opp-oil-gas" },
  { slug: "arabian-sea-shipping", title: "Arabian Sea container routes", text: "Shipping and forwarding between Mundra, Salalah and Dar es Salaam.", pillar: "import", place: { c: "oman", r: "dhofar", city: "salalah" }, corridor: "mundra-salalah-dar-es-salaam", sector: "Shipping", image: "opp-cargo" },
  { slug: "kerala-seafood", title: "Seafood and spices from Kerala", text: "Buy seafood and spices from Kochi exporters, or set up processing near Duqm Fishing Port.", pillar: "import", place: { c: "india", r: "kerala", city: "kochi" }, corridor: "kochi-duqm", sector: "Seafood", image: "opp-seafood" },
  { slug: "zanzibar-spices", title: "Spices and tourism in Zanzibar", text: "Source spices and partner on hospitality in one of the region’s oldest trading islands.", pillar: "investment", place: { c: "tanzania", r: "zanzibar", city: "zanzibar-city" }, corridor: "zanzibar-muscat", sector: "Spices and tourism", image: "tz-zanzibar" },
  { slug: "dar-es-salaam-distribution", title: "Distribution into East Africa", text: "Logistics and distribution partners at Tanzania’s principal port.", pillar: "import", place: { c: "tanzania", r: "dar-es-salaam", city: "dar-es-salaam" }, sector: "Distribution", image: "tz-dar-es-salaam" },
  { slug: "london-investment", title: "UK investment into Gulf projects", text: "Meet UK investors and advisers for projects in Gulf zones and industrial cities.", pillar: "investment", place: { c: "united-kingdom", r: "england", city: "london" }, corridor: "london-muscat", sector: "Finance", image: "uk-london" },
  { slug: "aberdeen-energy", title: "Offshore and energy transition services", text: "Engineering and energy services from Aberdeen for projects at Duqm and beyond.", pillar: "investment", place: { c: "united-kingdom", r: "scotland", city: "aberdeen" }, corridor: "aberdeen-duqm", sector: "Energy", image: "uk-aberdeen" },
  { slug: "sur-lng-services", title: "Gas and LNG services", text: "Maintenance, supply and local services for the LNG plant at Qalhat near Sur.", pillar: "procurement", place: { c: "oman", r: "sharqiyah-south" }, sector: "Oil and gas", image: "opp-oil-gas" },
  { slug: "coimbatore-textiles", title: "Textiles and engineering suppliers", text: "Source textiles and engineered goods from Tamil Nadu, including Coimbatore, the “Manchester of South India”.", pillar: "icv", place: { c: "india", r: "tamil-nadu" }, corridor: "tamil-nadu-north-batinah", sector: "Textiles", image: "in-coimbatore" },
  { slug: "mumbai-finance", title: "Trade finance and investment", text: "Connect with financial institutions and trading houses in India’s financial capital.", pillar: "investment", place: { c: "india", r: "maharashtra", city: "mumbai" }, corridor: "mumbai-muscat", sector: "Finance", image: "in-mumbai" },
  { slug: "musandam-tourism", title: "Tourism and marine services", text: "Hospitality, boat tours and marine services on the Strait of Hormuz.", pillar: "investment", place: { c: "oman", r: "musandam", city: "khasab" }, sector: "Tourism", image: "om-musandam" },
  { slug: "arusha-tourism", title: "Safari tourism and hospitality", text: "Hospitality and services close to Kilimanjaro, Ngorongoro and the Serengeti.", pillar: "investment", place: { c: "tanzania", r: "arusha", city: "arusha" }, sector: "Tourism", image: "tz-arusha" },
  { slug: "renewables", title: "Renewable energy and efficiency", text: "Solar, efficiency and emissions services for businesses with green procurement goals.", pillar: "sustainability", place: { c: "oman" }, sector: "Renewable energy", image: "opp-solar" },
];

export const opportunitiesIn = (p: PlaceRef) => opportunities.filter((o) => related(o.place, p) && (o.place.r ? true : !p.r));
export const opportunitiesOnCorridor = (slug: string, stops: PlaceRef[]) =>
  opportunities.filter((o) => o.corridor === slug || stops.some((s) => s.city && o.place.city && related(s, o.place)));
export const opportunitiesForPillar = (id: PillarId) => opportunities.filter((o) => o.pillar === id);
