/**
 * Corridors connect places at any level: country, state/region or city.
 * A corridor stop names the deepest level that matters (usually the city),
 * and the site shows its state and country around it.
 */
import type { ImageName } from "./images";
import type { PillarId } from "./pillars";
import {
  cityBy,
  cityHref,
  countryBySlug,
  countryHref,
  regionBy,
  regionHref,
  type CountrySlug,
} from "./places";

export type PlaceRef = { c: CountrySlug; r?: string; city?: string };

export type Corridor = {
  slug: string;
  name: string;
  scope: "international" | "domestic";
  kind: "bilateral" | "route";
  stops: PlaceRef[];
  pillars: PillarId[];
  summary: string;
  moves: string[];
  highlights: string[];
  agreement?: string;
  featured?: boolean;
  image: ImageName;
};

export const corridors: Corridor[] = [
  {
    slug: "chennai-sohar",
    name: "Chennai ↔ Sohar",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "tamil-nadu", city: "chennai" }, { c: "oman", r: "north-batinah", city: "sohar" }],
    pillars: ["export", "import", "investment"],
    summary: "Tamil Nadu’s manufacturing base meets Oman’s northern industrial port.",
    moves: ["Automobile parts and components", "Engineering goods", "Metals and industrial inputs"],
    highlights: ["Chennai houses a major portion of India’s automobile industry", "SOHAR Port and Freezone covers over 4,500 hectares", "India–Oman CEPA lowers duties on most goods"],
    agreement: "India–Oman CEPA (2025)",
    featured: true,
    image: "in-chennai",
  },
  {
    slug: "bengaluru-muscat",
    name: "Bengaluru ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "karnataka", city: "bengaluru" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["investment", "export"],
    summary: "India’s technology capital connected with Oman’s capital for digital services.",
    moves: ["IT and software services", "Digital government and fintech", "Engineering services"],
    highlights: ["Bengaluru is a major centre for information technology", "The CEPA includes commitments on services and worker mobility", "Muscat is Oman’s centre for government and services"],
    agreement: "India–Oman CEPA (2025)",
    featured: true,
    image: "in-bengaluru",
  },
  {
    slug: "mundra-salalah-dar-es-salaam",
    name: "Mundra → Salalah → Dar es Salaam",
    scope: "international",
    kind: "route",
    stops: [{ c: "india", r: "gujarat", city: "mundra" }, { c: "oman", r: "dhofar", city: "salalah" }, { c: "tanzania", r: "dar-es-salaam", city: "dar-es-salaam" }],
    pillars: ["export", "import"],
    summary: "A port-to-port route across the Arabian Sea linking India, Oman and East Africa.",
    moves: ["Containerised goods", "Food and agricultural products", "Building materials"],
    highlights: ["Mundra is India’s largest commercial and container port", "Port of Salalah serves East Africa and the Indian subcontinent", "Dar es Salaam is Tanzania’s principal port"],
    featured: true,
    image: "pillar-export",
  },
  {
    slug: "kochi-duqm",
    name: "Kochi ↔ Duqm",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "kerala", city: "kochi" }, { c: "oman", r: "al-wusta", city: "duqm" }],
    pillars: ["export", "import", "investment"],
    summary: "Kerala’s seafood and shipping coast meets Oman’s economic zone on the Arabian Sea.",
    moves: ["Seafood and fisheries", "Spices", "Marine and shipping services"],
    highlights: ["Kochi is a major port city on the Malabar Coast", "Duqm Fishing Port is Oman’s largest multi-purpose fishing port", "Kerala has deep people-to-people links with the Gulf"],
    agreement: "India–Oman CEPA (2025)",
    image: "in-kochi",
  },
  {
    slug: "mumbai-muscat",
    name: "Mumbai ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "maharashtra", city: "mumbai" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["investment", "export"],
    summary: "India’s financial capital linked with Oman’s capital for finance and investment.",
    moves: ["Investment and financial services", "Trading houses", "Consumer goods"],
    highlights: ["Mumbai is the financial capital of India", "Maharashtra is India’s largest state economy", "Jawaharlal Nehru Port is a large container port"],
    agreement: "India–Oman CEPA (2025)",
    image: "in-mumbai",
  },
  {
    slug: "salalah-dar-es-salaam",
    name: "Salalah ↔ Dar es Salaam",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "oman", r: "dhofar", city: "salalah" }, { c: "tanzania", r: "dar-es-salaam", city: "dar-es-salaam" }],
    pillars: ["export", "import"],
    summary: "Port to port between southern Oman and Tanzania’s main gateway.",
    moves: ["Food and agricultural products", "Consumer goods", "Building materials"],
    highlights: ["Port of Salalah is Oman’s largest port", "Port of Dar es Salaam is Tanzania’s principal port", "Air links already carry agricultural and seafood trade"],
    image: "tz-dar-es-salaam",
  },
  {
    slug: "zanzibar-muscat",
    name: "Zanzibar ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "tanzania", r: "zanzibar", city: "zanzibar-city" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["import", "investment"],
    summary: "A corridor built on more than three centuries of shared history.",
    moves: ["Spices", "Seafood", "Tourism and hospitality"],
    highlights: ["Zanzibar was linked to Oman from 1698", "Zanzibar’s main industries are spices, raffia and tourism", "Stone Town is a UNESCO World Heritage Site"],
    featured: true,
    image: "tz-zanzibar",
  },
  {
    slug: "london-muscat",
    name: "London ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "united-kingdom", r: "england", city: "london" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["investment", "export"],
    summary: "Finance and professional services under the new GCC–UK agreement.",
    moves: ["Investment and finance", "Professional services", "Education and training"],
    highlights: ["GCC–UK free trade agreement signed 20 May 2026", "First FTA between a G7 member and the GCC", "The City of London is London’s historic financial centre"],
    agreement: "GCC–UK FTA (2026)",
    featured: true,
    image: "uk-london",
  },
  {
    slug: "aberdeen-duqm",
    name: "Aberdeen ↔ Duqm",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "united-kingdom", r: "scotland", city: "aberdeen" }, { c: "oman", r: "al-wusta", city: "duqm" }],
    pillars: ["investment", "import"],
    summary: "Offshore energy expertise meets a new industrial zone on the Arabian Sea.",
    moves: ["Energy engineering services", "Energy transition partnerships", "Equipment and training"],
    highlights: ["Aberdeen is known as the offshore oil capital of Europe", "Duqm hosts the Special Economic Zone at Duqm", "GCC–UK FTA covers trade in services"],
    agreement: "GCC–UK FTA (2026)",
    featured: true,
    image: "uk-aberdeen",
  },
  {
    slug: "tamil-nadu-north-batinah",
    name: "Tamil Nadu ↔ North Al Batinah",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "tamil-nadu" }, { c: "oman", r: "north-batinah" }],
    pillars: ["icv", "procurement", "export"],
    summary: "State to governorate: two manufacturing regions building supply chains together.",
    moves: ["Industrial suppliers", "Textiles", "Engineering"],
    highlights: ["Manufacturing is nearly one-third of Tamil Nadu’s GDP", "North Al Batinah is Oman’s northern industrial hub", "Coimbatore is known as the “Manchester of South India”"],
    agreement: "India–Oman CEPA (2025)",
    image: "in-tamil-nadu",
  },

  // domestic corridors in every country
  {
    slug: "muscat-north-batinah",
    name: "Muscat ↔ North Al Batinah",
    scope: "domestic",
    kind: "bilateral",
    stops: [{ c: "oman", r: "muscat" }, { c: "oman", r: "north-batinah" }],
    pillars: ["procurement", "icv", "b2b"],
    summary: "Oman’s Batinah coast, from the capital to its industrial port.",
    moves: ["Industrial supplies", "Services", "Logistics"],
    highlights: ["Links the capital with SOHAR Port and Freezone", "Coastal towns of South Al Batinah on the way"],
    image: "om-north-batinah",
  },
  {
    slug: "al-wusta-dhofar",
    name: "Al Wusta ↔ Dhofar",
    scope: "domestic",
    kind: "bilateral",
    stops: [{ c: "oman", r: "al-wusta" }, { c: "oman", r: "dhofar" }],
    pillars: ["export", "import", "investment"],
    summary: "Oman’s two southern governorates on the Arabian Sea, home to Duqm and Salalah.",
    moves: ["Logistics", "Fisheries", "Industrial goods"],
    highlights: ["Special Economic Zone at Duqm", "Port of Salalah, Oman’s largest port"],
    image: "om-al-wusta",
  },
  {
    slug: "tamil-nadu-karnataka",
    name: "Tamil Nadu ↔ Karnataka",
    scope: "domestic",
    kind: "bilateral",
    stops: [{ c: "india", r: "tamil-nadu" }, { c: "india", r: "karnataka" }],
    pillars: ["b2b", "investment", "icv"],
    summary: "South India’s manufacturing state linked with its technology state.",
    moves: ["Automobile and electronics supply chains", "Technology services"],
    highlights: ["Chennai, a centre of India’s automobile industry", "Bengaluru, a major centre for information technology"],
    image: "in-bengaluru",
  },
  {
    slug: "dar-es-salaam-arusha-regions",
    name: "Dar es Salaam ↔ Arusha",
    scope: "domestic",
    kind: "bilateral",
    stops: [{ c: "tanzania", r: "dar-es-salaam" }, { c: "tanzania", r: "arusha" }],
    pillars: ["b2b", "investment", "import"],
    summary: "Tanzania’s main port linked with the capital of the East African Community.",
    moves: ["Imported goods inland", "Agricultural produce to the coast", "Tourism services"],
    highlights: ["Port of Dar es Salaam, Tanzania’s principal port", "Arusha, capital of the East African Community"],
    image: "tz-arusha",
  },
  {
    slug: "england-scotland",
    name: "England ↔ Scotland",
    scope: "domestic",
    kind: "bilateral",
    stops: [{ c: "united-kingdom", r: "england" }, { c: "united-kingdom", r: "scotland" }],
    pillars: ["investment", "b2b", "sustainability"],
    summary: "England’s finance and services linked with Scotland’s offshore energy expertise.",
    moves: ["Investment", "Energy services", "Professional services"],
    highlights: ["The City of London financial centre", "Aberdeen, the offshore oil capital of Europe"],
    image: "uk-scotland",
  },
];

/* ------------------------------------------------------------------ helpers */

export const corridorBySlug = (s: string) => corridors.find((c) => c.slug === s);

export function refName(p: PlaceRef) {
  if (p.city) return cityBy(p.c, p.city)!.name;
  if (p.r) return regionBy(p.c, p.r)!.name;
  return countryBySlug(p.c)!.name;
}

/** "Tamil Nadu, India" style context line for a stop. */
export function refContext(p: PlaceRef) {
  const country = countryBySlug(p.c)!.name;
  if (p.city) return `${regionBy(p.c, p.r!)!.name}, ${country}`;
  if (p.r) return `${countryBySlug(p.c)!.regionTerm}, ${country}`;
  return "Country";
}

export function refHref(p: PlaceRef) {
  if (p.city) return cityHref(p.c, p.r!, p.city);
  if (p.r) return regionHref(p.c, p.r);
  return countryHref(p.c);
}

/** Corridors that name a city are shown for investment and trade. */
export const isCityCorridor = (k: Corridor) => k.stops.some((s) => s.city);

export const refLevel = (p: PlaceRef) => (p.city ? "City" : p.r ? countryBySlug(p.c)!.regionTerm : "Country");

/** True when one place contains the other (or they are the same). */
export function related(a: PlaceRef, b: PlaceRef) {
  if (a.c !== b.c) return false;
  if (!a.r || !b.r) return true;
  if (a.r !== b.r) return false;
  if (!a.city || !b.city) return true;
  return a.city === b.city;
}

export const refKey = (p: PlaceRef) => [p.c, p.r, p.city].filter(Boolean).join("/");
export const parseRefKey = (k: string): PlaceRef => {
  const [c, r, city] = k.split("/");
  return { c: c as CountrySlug, r: r || undefined, city: city || undefined };
};

/** Corridors with one stop in `from` and another in `to` (either direction). */
export function findCorridors(from?: PlaceRef, to?: PlaceRef) {
  return corridors.filter((k) => {
    const iFrom = from ? k.stops.findIndex((s) => related(s, from)) : 0;
    if (iFrom < 0) return false;
    if (!to) return true;
    return k.stops.some((s, i) => i !== iFrom && related(s, to)) || (from ? k.stops.some((s, i) => related(s, to) && k.stops.some((t, j) => j !== i && related(t, from))) : false);
  });
}

export const corridorsTouching = (p: PlaceRef) => corridors.filter((k) => k.stops.some((s) => related(s, p)));
