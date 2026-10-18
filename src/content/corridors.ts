/**
 * Corridors connect states (or regions, governorates, nations) across or within countries.
 * The platform works at country and state level, so every stop is a state.
 * Gateways are the cities and ports along a corridor, shown for investors and traders.
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
  /** Key cities and ports along the corridor (insight for investors and traders, not stops). */
  gateways?: PlaceRef[];
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
    slug: "tamil-nadu-north-batinah",
    name: "Tamil Nadu ↔ North Al Batinah",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "tamil-nadu" }, { c: "oman", r: "north-batinah" }],
    gateways: [{ c: "india", r: "tamil-nadu", city: "chennai" }, { c: "india", r: "tamil-nadu", city: "coimbatore" }, { c: "oman", r: "north-batinah", city: "sohar" }],
    pillars: ["export", "import", "icv", "procurement"],
    summary: "State to governorate: Tamil Nadu’s manufacturing base and Oman’s northern industrial coast.",
    moves: ["Automobile parts and components", "Engineering goods", "Textiles", "Metals and industrial inputs"],
    highlights: ["Manufacturing is nearly one-third of Tamil Nadu’s GDP", "SOHAR Port and Freezone covers over 4,500 hectares", "India–Oman CEPA lowers duties on most goods"],
    agreement: "India–Oman CEPA (2025)",
    featured: true,
    image: "in-tamil-nadu",
  },
  {
    slug: "karnataka-muscat",
    name: "Karnataka ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "karnataka" }, { c: "oman", r: "muscat" }],
    gateways: [{ c: "india", r: "karnataka", city: "bengaluru" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["investment", "export", "b2b"],
    summary: "India’s technology state connected with Oman’s capital governorate for digital and engineering services.",
    moves: ["IT and software services", "Digital government and fintech", "Engineering services"],
    highlights: ["Karnataka is India’s third-largest state economy", "The CEPA includes commitments on services and worker mobility", "Muscat is Oman’s centre for government and services"],
    agreement: "India–Oman CEPA (2025)",
    featured: true,
    image: "in-karnataka",
  },
  {
    slug: "gujarat-dhofar-dar-es-salaam",
    name: "Gujarat → Dhofar → Dar es Salaam",
    scope: "international",
    kind: "route",
    stops: [{ c: "india", r: "gujarat" }, { c: "oman", r: "dhofar" }, { c: "tanzania", r: "dar-es-salaam" }],
    gateways: [{ c: "india", r: "gujarat", city: "mundra" }, { c: "oman", r: "dhofar", city: "salalah" }, { c: "tanzania", r: "dar-es-salaam", city: "dar-es-salaam" }],
    pillars: ["export", "import"],
    summary: "A sea route across the Arabian Sea linking an Indian state, an Omani governorate and a Tanzanian region.",
    moves: ["Containerised goods", "Food and agricultural products", "Building materials"],
    highlights: ["Gujarat is home to Mundra, India’s largest commercial and container port", "Dhofar’s Port of Salalah serves East Africa and the Indian subcontinent", "Dar es Salaam is home to Tanzania’s principal port"],
    featured: true,
    image: "pillar-export",
  },
  {
    slug: "kerala-al-wusta",
    name: "Kerala ↔ Al Wusta",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "kerala" }, { c: "oman", r: "al-wusta" }],
    gateways: [{ c: "india", r: "kerala", city: "kochi" }, { c: "oman", r: "al-wusta", city: "duqm" }],
    pillars: ["export", "import", "investment"],
    summary: "Kerala’s seafood and shipping coast meets Oman’s central governorate on the Arabian Sea.",
    moves: ["Seafood and fisheries", "Spices", "Marine and shipping services"],
    highlights: ["Kerala has deep people-to-people links with the Gulf", "Al Wusta is home to the Special Economic Zone at Duqm", "Duqm Fishing Port is Oman’s largest multi-purpose fishing port"],
    agreement: "India–Oman CEPA (2025)",
    image: "in-kerala",
  },
  {
    slug: "maharashtra-muscat",
    name: "Maharashtra ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "india", r: "maharashtra" }, { c: "oman", r: "muscat" }],
    gateways: [{ c: "india", r: "maharashtra", city: "mumbai" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["investment", "export"],
    summary: "India’s largest state economy linked with Oman’s capital governorate for finance and investment.",
    moves: ["Investment and financial services", "Trading houses", "Consumer goods"],
    highlights: ["Maharashtra is India’s largest state economy", "Mumbai is the financial capital of India", "Jawaharlal Nehru Port is a large container port"],
    agreement: "India–Oman CEPA (2025)",
    image: "in-maharashtra",
  },
  {
    slug: "dhofar-dar-es-salaam",
    name: "Dhofar ↔ Dar es Salaam",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "oman", r: "dhofar" }, { c: "tanzania", r: "dar-es-salaam" }],
    gateways: [{ c: "oman", r: "dhofar", city: "salalah" }, { c: "tanzania", r: "dar-es-salaam", city: "dar-es-salaam" }],
    pillars: ["export", "import"],
    summary: "Southern Oman and Tanzania’s commercial region, port to port.",
    moves: ["Food and agricultural products", "Consumer goods", "Building materials"],
    highlights: ["Port of Salalah is Oman’s largest port", "Port of Dar es Salaam is Tanzania’s principal port", "Air links already carry agricultural and seafood trade"],
    image: "tz-dar-es-salaam",
  },
  {
    slug: "zanzibar-muscat",
    name: "Zanzibar ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "tanzania", r: "zanzibar" }, { c: "oman", r: "muscat" }],
    gateways: [{ c: "tanzania", r: "zanzibar", city: "zanzibar-city" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["import", "investment"],
    summary: "A region-to-governorate corridor built on more than three centuries of shared history.",
    moves: ["Spices", "Seafood", "Tourism and hospitality"],
    highlights: ["Zanzibar was linked to Oman from 1698", "Zanzibar’s main industries are spices, raffia and tourism", "Stone Town is a UNESCO World Heritage Site"],
    featured: true,
    image: "tz-zanzibar",
  },
  {
    slug: "england-muscat",
    name: "England ↔ Muscat",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "united-kingdom", r: "england" }, { c: "oman", r: "muscat" }],
    gateways: [{ c: "united-kingdom", r: "england", city: "london" }, { c: "oman", r: "muscat", city: "muscat" }],
    pillars: ["investment", "export"],
    summary: "Finance and professional services under the new GCC–UK agreement.",
    moves: ["Investment and finance", "Professional services", "Education and training"],
    highlights: ["GCC–UK free trade agreement signed 20 May 2026", "First FTA between a G7 member and the GCC", "England is home to the City of London financial centre"],
    agreement: "GCC–UK FTA (2026)",
    featured: true,
    image: "uk-england",
  },
  {
    slug: "scotland-al-wusta",
    name: "Scotland ↔ Al Wusta",
    scope: "international",
    kind: "bilateral",
    stops: [{ c: "united-kingdom", r: "scotland" }, { c: "oman", r: "al-wusta" }],
    gateways: [{ c: "united-kingdom", r: "scotland", city: "aberdeen" }, { c: "oman", r: "al-wusta", city: "duqm" }],
    pillars: ["investment", "import", "sustainability"],
    summary: "Scotland’s offshore energy expertise meets Oman’s new industrial zone on the Arabian Sea.",
    moves: ["Energy engineering services", "Energy transition partnerships", "Equipment and training"],
    highlights: ["Aberdeen is known as the offshore oil capital of Europe", "Al Wusta hosts the Special Economic Zone at Duqm", "GCC–UK FTA covers trade in services"],
    agreement: "GCC–UK FTA (2026)",
    featured: true,
    image: "uk-scotland",
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

/** The city used to draw a stop on the map: its gateway on this corridor if there is one. */
export const gatewayFor = (k: Corridor, s: PlaceRef) => k.gateways?.find((g) => g.c === s.c && g.r === s.r);
