/**
 * Universal geography: Country → Region (state, governorate, nation…) → City → Zone.
 *
 * Every country is equal here; there is no "home" country. Each country names
 * its first level in its own terms (Governorate, State, Region, Nation).
 * Facts carry their sources. Only add a fact you can point to.
 */
import type { FlagCode, ImageName } from "./images";
import type { PillarId } from "./pillars";

export type Source = { label: string; url: string };
const wiki = (title: string, label?: string): Source => ({
  label: `${label ?? title.replace(/_/g, " ")}, Wikipedia`,
  url: `https://en.wikipedia.org/wiki/${title}`,
});

export type CountrySlug = "oman" | "india" | "tanzania" | "united-kingdom";

export type Country = {
  slug: CountrySlug;
  name: string;
  flag: FlagCode;
  regionTerm: string;
  regionTermPlural: string;
  capital: string;
  summary: string;
  facts: { label: string; value: string }[];
  value: { title: string; text: string }[];
  image: ImageName;
  sources: Source[];
};

export type Region = {
  slug: string;
  country: CountrySlug;
  name: string;
  capital: string;
  summary: string;
  assets: string[];
  sectors: string[];
  pillars: PillarId[];
  image: ImageName;
  sources: Source[];
};

export type City = {
  slug: string;
  country: CountrySlug;
  region: string;
  name: string;
  lat: number;
  lng: number;
  summary: string;
  assets: string[];
  sectors: string[];
  image: ImageName;
  sources: Source[];
};

export type Zone = {
  slug: string;
  country: CountrySlug;
  region: string;
  city?: string;
  name: string;
  type: "Port" | "Free zone" | "Economic zone" | "Industrial city" | "Energy hub" | "Financial centre";
  summary: string;
  source: Source;
};

/* ---------------------------------------------------------------- countries */

export const countries: Country[] = [
  {
    slug: "india",
    name: "India",
    flag: "in",
    regionTerm: "State",
    regionTermPlural: "States",
    capital: "New Delhi",
    summary: "A continent-sized market where every state is an economy of its own, from Tamil Nadu’s factories to Karnataka’s technology hubs and Gujarat’s ports.",
    facts: [
      { label: "Trade agreement with Oman", value: "India–Oman CEPA, signed 18 Dec 2025" },
      { label: "Largest state economy", value: "Maharashtra" },
      { label: "Largest container port", value: "Mundra, Gujarat" },
      { label: "Goods trade with Oman, 2024–25", value: "Exports US$4.06 bn · Imports US$6.5 bn" },
    ],
    value: [
      { title: "Go state by state", text: "Each Indian state has its own industries, ports and incentives. Choose the state that fits your business, not just the country." },
      { title: "Lower duties to the Gulf", text: "Under the CEPA, Oman gives duty-free access on 98.08% of its tariff lines, covering about 99% of Indian exports." },
      { title: "Ports on both coasts", text: "From Mundra and Mumbai in the west to Chennai in the east, India’s ports connect to the Gulf and East Africa." },
    ],
    image: "country-india",
    sources: [wiki("India%E2%80%93Oman_relations", "India–Oman relations"), wiki("Maharashtra"), wiki("Mundra_Port", "Mundra Port")],
  },
  {
    slug: "oman",
    name: "Oman",
    flag: "om",
    regionTerm: "Governorate",
    regionTermPlural: "Governorates",
    capital: "Muscat",
    summary: "A gateway between the Gulf, the Indian subcontinent and East Africa, with deep-water ports and economic zones on the Arabian Sea and the Gulf of Oman.",
    facts: [
      { label: "Governorates", value: "11" },
      { label: "Main ports", value: "Sohar, Salalah, Duqm" },
      { label: "Trade agreements", value: "USA (2006), India CEPA (2025), GCC–UK (2026)" },
    ],
    value: [
      { title: "Three gateway ports", text: "Sohar in the north, Duqm in the centre and Salalah in the south, each with free or economic zones beside it." },
      { title: "A growing agreement network", text: "Free trade with the United States, a CEPA with India and, through the GCC, an agreement with the United Kingdom." },
      { title: "Eleven distinct governorates", text: "From heavy industry in North Al Batinah to logistics in Dhofar and the economic zone at Duqm." },
    ],
    image: "country-oman",
    sources: [wiki("Governorates_of_Oman", "Governorates of Oman"), wiki("India%E2%80%93Oman_relations", "India–Oman relations"), wiki("Gulf_Cooperation_Council%E2%80%93United_Kingdom_Free_Trade_Agreement", "GCC–UK Free Trade Agreement")],
  },
  {
    slug: "tanzania",
    name: "Tanzania",
    flag: "tz",
    regionTerm: "Region",
    regionTermPlural: "Regions",
    capital: "Dodoma",
    summary: "East Africa’s trading coast, with the principal port at Dar es Salaam, the spice islands of Zanzibar and Arusha as the capital of the East African Community.",
    facts: [
      { label: "Principal port", value: "Port of Dar es Salaam" },
      { label: "Regional bloc", value: "East African Community, headquartered in Arusha" },
      { label: "Ties with Oman", value: "Since the 17th century, through Zanzibar" },
    ],
    value: [
      { title: "A door to East Africa", text: "Arusha is the capital of the East African Community, and Dar es Salaam is the country’s largest city and financial hub." },
      { title: "Food, spice and seafood trade", text: "Zanzibar’s main industries are spices, raffia and tourism, and air links carry agricultural and seafood trade to the Gulf." },
      { title: "Centuries of shared history", text: "Zanzibar was linked to Oman from 1698, and Swahili is still spoken by part of Oman’s population." },
    ],
    image: "country-tanzania",
    sources: [wiki("Oman%E2%80%93Tanzania_relations", "Oman–Tanzania relations"), wiki("Port_of_Dar_es_Salaam", "Port of Dar es Salaam"), wiki("Arusha"), wiki("Zanzibar")],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    flag: "gb",
    regionTerm: "Nation",
    regionTermPlural: "Nations",
    capital: "London",
    summary: "A global centre for finance and services, now linked to the Gulf by the GCC–UK free trade agreement signed on 20 May 2026.",
    facts: [
      { label: "Agreement with the Gulf", value: "GCC–UK FTA, signed 20 May 2026" },
      { label: "A first", value: "First FTA between a G7 member and the GCC" },
      { label: "UK–GCC trade (2019)", value: "About £45 billion" },
    ],
    value: [
      { title: "Finance and services", text: "The City of London financial centre and service firms across England and Scotland." },
      { title: "Energy know-how", text: "Aberdeen has been known as the offshore oil capital of Europe since North Sea oil was found in 1969." },
      { title: "A new agreement", text: "The GCC–UK agreement gives businesses in the Gulf and the UK a framework for trade in goods and services." },
    ],
    image: "country-uk",
    sources: [wiki("Gulf_Cooperation_Council%E2%80%93United_Kingdom_Free_Trade_Agreement", "GCC–UK Free Trade Agreement"), wiki("London"), wiki("Aberdeen")],
  },
];

/* ------------------------------------------------------------------ regions */

const OM = wiki("Governorates_of_Oman", "Governorates of Oman");

export const regions: Region[] = [
  // Oman
  { slug: "muscat", country: "oman", name: "Muscat", capital: "Muscat", summary: "The capital governorate and Oman’s main centre for government, business and services.", assets: ["Seat of government and ministries", "Muscat International Airport", "Al Rusayl Industrial City"], sectors: ["Professional services", "ICT", "Light manufacturing", "Tourism"], pillars: ["governance", "b2b", "procurement", "investment"], image: "om-muscat", sources: [OM, { label: "Madayn", url: "https://www.madayn.om" }] },
  { slug: "north-batinah", country: "oman", name: "North Al Batinah", capital: "Sohar", summary: "Oman’s northern industrial coast, centred on the port city of Sohar.", assets: ["SOHAR Port and Freezone, over 4,500 hectares", "Port company jointly owned with the Port of Rotterdam", "Al Suwaiq Industrial City"], sectors: ["Metals and petrochemicals", "Logistics", "Manufacturing"], pillars: ["procurement", "icv", "export", "import"], image: "om-north-batinah", sources: [OM, wiki("Port_of_Sohar", "SOHAR Port and Freezone"), { label: "Madayn", url: "https://www.madayn.om" }] },
  { slug: "dhofar", country: "oman", name: "Dhofar", capital: "Salalah", summary: "The southern governorate on the Arabian Sea and home to Oman’s largest port.", assets: ["Port of Salalah, Oman’s largest port, operating since 1998", "Raysut Industrial City", "Al Mazunah Free Zone"], sectors: ["Logistics and transshipment", "Food processing", "Agriculture", "Tourism"], pillars: ["export", "import", "investment", "b2b"], image: "om-dhofar", sources: [OM, wiki("Port_of_Salalah", "Port of Salalah"), { label: "Madayn", url: "https://www.madayn.om" }] },
  { slug: "al-wusta", country: "oman", name: "Al Wusta", capital: "Haima", summary: "The central coast on the Arabian Sea and home to the Special Economic Zone at Duqm.", assets: ["Special Economic Zone at Duqm (SEZAD)", "Duqm Fishing Port, the largest multi-purpose fishing port in Oman", "Duqm, about 550 km from Muscat"], sectors: ["Refining and petrochemicals", "Logistics", "Fisheries"], pillars: ["investment", "export", "icv", "sustainability"], image: "om-al-wusta", sources: [OM, wiki("Duqm")] },
  { slug: "sharqiyah-south", country: "oman", name: "South Ash Sharqiyah", capital: "Sur", summary: "The eastern coast around Sur and home to the Oman LNG plant at Qalhat.", assets: ["Oman LNG at Qalhat near Sur, 10.4 million tonnes a year", "Sur’s maritime and dhow-building heritage", "Ras Al Jinz turtle reserve"], sectors: ["Gas and LNG services", "Fisheries", "Tourism"], pillars: ["procurement", "icv", "export"], image: "om-sharqiyah-south", sources: [OM, wiki("Oman_LNG", "Oman LNG")] },
  { slug: "ad-dakhiliyah", country: "oman", name: "Ad Dakhiliyah", capital: "Nizwa", summary: "The interior around the historic city of Nizwa, gateway to the Hajar mountains.", assets: ["Historic city of Nizwa", "Al Jabal Al Akhdar mountain area", "Date palm and farming areas"], sectors: ["Tourism", "Agriculture and dates", "Handicrafts"], pillars: ["icv", "investment", "b2b"], image: "om-ad-dakhiliyah", sources: [OM] },
  { slug: "south-batinah", country: "oman", name: "South Al Batinah", capital: "Rustaq", summary: "Coast and mountains between Muscat and Sohar, around Rustaq and Barka.", assets: ["Rustaq and its historic fort", "Coastal towns of Barka and Al Musanaah", "Farming and fishing communities"], sectors: ["Agriculture", "Fisheries", "Logistics"], pillars: ["b2b", "icv", "sustainability"], image: "om-south-batinah", sources: [OM] },
  { slug: "ad-dhahirah", country: "oman", name: "Ad Dhahirah", capital: "Ibri", summary: "The western interior around Ibri, reaching towards Saudi Arabia and the UAE.", assets: ["Ibri, the governorate’s main city", "Overland position towards Saudi Arabia and the UAE", "Agricultural oases"], sectors: ["Agriculture", "Logistics", "Mining and quarrying"], pillars: ["import", "export", "sustainability"], image: "om-ad-dhahirah", sources: [OM] },
  { slug: "al-buraimi", country: "oman", name: "Al Buraimi", capital: "Al Buraimi", summary: "An oasis governorate on the UAE border, directly next to Al Ain.", assets: ["Border with Al Ain, UAE", "About 343 km from Muscat", "Al Khandaq Fort"], sectors: ["Cross-border trade", "Wholesale and retail", "Agriculture"], pillars: ["import", "export", "b2b"], image: "om-al-buraimi", sources: [OM, wiki("Al_Buraimi", "Al-Buraimi")] },
  { slug: "sharqiyah-north", country: "oman", name: "North Ash Sharqiyah", capital: "Ibra", summary: "The eastern interior around Ibra, including the Sharqiya Sands.", assets: ["Ibra, the governorate’s main city", "Sharqiya (Wahiba) Sands", "Wadi and oasis villages"], sectors: ["Tourism", "Agriculture", "Handicrafts"], pillars: ["investment", "b2b", "sustainability"], image: "om-sharqiyah-north", sources: [OM] },
  { slug: "musandam", country: "oman", name: "Musandam", capital: "Khasab", summary: "An exclave on the Strait of Hormuz at the tip of the Musandam Peninsula.", assets: ["Position on the Strait of Hormuz", "Khasab town and harbour", "Fjord-like coastline, the “Norway of Arabia”"], sectors: ["Tourism", "Fisheries", "Marine services"], pillars: ["investment", "b2b", "sustainability"], image: "om-musandam", sources: [OM, wiki("Khasab")] },

  // India
  { slug: "tamil-nadu", country: "india", name: "Tamil Nadu", capital: "Chennai", summary: "India’s southernmost state and one of its most industrialised, with manufacturing at nearly a third of state GDP.", assets: ["Second-largest economy among India’s states (Dec 2023)", "Manufacturing is nearly one-third of state GDP", "Chennai, a centre of India’s automobile industry"], sectors: ["Automobiles and components", "Textiles", "Electronics", "Tourism"], pillars: ["export", "import", "icv", "b2b"], image: "in-tamil-nadu", sources: [wiki("Tamil_Nadu", "Tamil Nadu"), wiki("Chennai")] },
  { slug: "karnataka", country: "india", name: "Karnataka", capital: "Bengaluru", summary: "Home to Bengaluru, one of the world’s fastest growing technology hubs, and the west-coast port of Mangaluru.", assets: ["Third-largest state economy in India", "Bengaluru, a major centre for information technology", "New Mangalore Port, an all-weather port"], sectors: ["IT and software", "Engineering", "Logistics"], pillars: ["b2b", "investment", "export"], image: "in-karnataka", sources: [wiki("Economy_of_Karnataka", "Economy of Karnataka"), wiki("Bangalore", "Bengaluru"), wiki("New_Mangalore_Port", "New Mangalore Port")] },
  { slug: "gujarat", country: "india", name: "Gujarat", capital: "Gandhinagar", summary: "One of India’s largest and most diversified state economies, and home to its largest container port.", assets: ["Mundra Port, India’s largest commercial and container port", "Ahmedabad, an economic and industrial hub", "Coast on the Gulf of Kutch facing the Arabian Sea"], sectors: ["Ports and logistics", "Chemicals", "Textiles", "Engineering"], pillars: ["export", "import", "investment"], image: "in-gujarat", sources: [wiki("Economy_of_Gujarat", "Economy of Gujarat"), wiki("Mundra_Port", "Mundra Port"), wiki("Ahmedabad")] },
  { slug: "maharashtra", country: "india", name: "Maharashtra", capital: "Mumbai", summary: "India’s largest state economy, with Mumbai as the country’s financial capital.", assets: ["Largest state economy in India", "Mumbai, the financial capital of India", "Jawaharlal Nehru Port, a large container port"], sectors: ["Finance", "Manufacturing", "Logistics", "Media"], pillars: ["investment", "b2b", "export", "import"], image: "in-maharashtra", sources: [wiki("Maharashtra"), wiki("Mumbai"), wiki("Jawaharlal_Nehru_Port", "Jawaharlal Nehru Port")] },
  { slug: "kerala", country: "india", name: "Kerala", capital: "Thiruvananthapuram", summary: "A coastal state with deep ties to the Gulf through its large expatriate community, and the port city of Kochi.", assets: ["Strong people-to-people links with the Gulf states", "Kochi, a major port city on the Malabar Coast", "Fisheries and spice-growing heritage"], sectors: ["Fisheries and seafood", "Spices", "Tourism", "Shipping"], pillars: ["export", "b2b", "investment"], image: "in-kerala", sources: [wiki("Kerala"), wiki("Kochi")] },

  // Tanzania
  { slug: "dar-es-salaam", country: "tanzania", name: "Dar es Salaam", capital: "Dar es Salaam", summary: "Tanzania’s commercial heart, with its largest city and principal port.", assets: ["Largest city and financial hub of Tanzania", "Port of Dar es Salaam, the country’s principal port"], sectors: ["Ports and logistics", "Finance", "Manufacturing"], pillars: ["import", "export", "b2b"], image: "tz-dar-es-salaam", sources: [wiki("Dar_es_Salaam", "Dar es Salaam"), wiki("Port_of_Dar_es_Salaam", "Port of Dar es Salaam")] },
  { slug: "zanzibar", country: "tanzania", name: "Zanzibar", capital: "Zanzibar City", summary: "The spice islands off the Tanzanian coast, linked with Oman for centuries.", assets: ["Stone Town, a UNESCO World Heritage Site", "Main industries: spices, raffia and tourism", "Linked to Oman since 1698"], sectors: ["Spices", "Tourism", "Seafood"], pillars: ["export", "investment", "b2b"], image: "tz-zanzibar", sources: [wiki("Zanzibar"), wiki("Oman%E2%80%93Tanzania_relations", "Oman–Tanzania relations")] },
  { slug: "arusha", country: "tanzania", name: "Arusha", capital: "Arusha", summary: "Northern Tanzania’s diplomatic and tourism capital, close to Kilimanjaro and the Serengeti.", assets: ["Capital of the East African Community", "Hosts the African Court of the African Union", "Close to the Serengeti, Ngorongoro and Mount Kilimanjaro"], sectors: ["Tourism", "Agriculture", "Services"], pillars: ["investment", "governance", "b2b"], image: "tz-arusha", sources: [wiki("Arusha")] },

  // United Kingdom
  { slug: "england", country: "united-kingdom", name: "England", capital: "London", summary: "The UK’s largest nation, home to the City of London and major industrial cities such as Manchester.", assets: ["The City of London financial centre", "Manchester, a historic manufacturing city"], sectors: ["Finance", "Professional services", "Manufacturing"], pillars: ["investment", "b2b", "export"], image: "uk-england", sources: [wiki("London"), wiki("Manchester")] },
  { slug: "scotland", country: "united-kingdom", name: "Scotland", capital: "Edinburgh", summary: "A North Sea nation with deep offshore energy expertise centred on Aberdeen.", assets: ["Aberdeen, the offshore oil capital of Europe", "North Sea coastline"], sectors: ["Offshore energy", "Engineering", "Food and drink"], pillars: ["sustainability", "investment", "b2b"], image: "uk-scotland", sources: [wiki("Aberdeen"), wiki("Scotland")] },
];

/* ------------------------------------------------------------------- cities */

export const cities: City[] = [
  // Oman
  { slug: "muscat", country: "oman", region: "muscat", name: "Muscat", lat: 23.59, lng: 58.41, summary: "The capital, home to government, finance and services.", assets: ["Seat of government", "Muscat International Airport", "Al Rusayl Industrial City"], sectors: ["Services", "ICT", "Finance"], image: "om-muscat", sources: [OM] },
  { slug: "sohar", country: "oman", region: "north-batinah", name: "Sohar", lat: 24.35, lng: 56.71, summary: "Oman’s industrial port city on the Gulf of Oman.", assets: ["SOHAR Port and Freezone", "Joint venture with the Port of Rotterdam"], sectors: ["Metals", "Petrochemicals", "Logistics"], image: "om-north-batinah", sources: [wiki("Port_of_Sohar", "SOHAR Port and Freezone")] },
  { slug: "salalah", country: "oman", region: "dhofar", name: "Salalah", lat: 17.02, lng: 54.09, summary: "The southern port city facing the Arabian Sea.", assets: ["Port of Salalah, Oman’s largest port", "Serves East Africa, the Red Sea and the Indian subcontinent", "Raysut Industrial City"], sectors: ["Transshipment", "Food processing", "Tourism"], image: "om-dhofar", sources: [wiki("Port_of_Salalah", "Port of Salalah")] },
  { slug: "duqm", country: "oman", region: "al-wusta", name: "Duqm", lat: 19.66, lng: 57.7, summary: "A port town transformed since 2011 into an industrial hub on the Arabian Sea.", assets: ["Special Economic Zone at Duqm", "Duqm Fishing Port"], sectors: ["Refining", "Logistics", "Fisheries"], image: "om-al-wusta", sources: [wiki("Duqm")] },
  { slug: "sur", country: "oman", region: "sharqiyah-south", name: "Sur", lat: 22.57, lng: 59.53, summary: "A historic maritime city near the Oman LNG plant at Qalhat.", assets: ["Oman LNG at Qalhat", "Dhow-building heritage"], sectors: ["LNG services", "Fisheries", "Tourism"], image: "om-sharqiyah-south", sources: [wiki("Oman_LNG", "Oman LNG")] },
  { slug: "nizwa", country: "oman", region: "ad-dakhiliyah", name: "Nizwa", lat: 22.93, lng: 57.53, summary: "The historic heart of Oman’s interior.", assets: ["Historic city and fort", "Gateway to Al Jabal Al Akhdar"], sectors: ["Tourism", "Agriculture", "Handicrafts"], image: "om-ad-dakhiliyah", sources: [OM] },
  { slug: "rustaq", country: "oman", region: "south-batinah", name: "Rustaq", lat: 23.39, lng: 57.42, summary: "Capital of South Al Batinah, between the mountains and the coast.", assets: ["Historic Rustaq fort", "Farming communities"], sectors: ["Agriculture", "Tourism"], image: "om-south-batinah", sources: [OM] },
  { slug: "ibri", country: "oman", region: "ad-dhahirah", name: "Ibri", lat: 23.23, lng: 56.52, summary: "Main city of the western interior.", assets: ["Agricultural oases", "Overland links to the west"], sectors: ["Agriculture", "Logistics"], image: "om-ad-dhahirah", sources: [OM] },
  { slug: "al-buraimi", country: "oman", region: "al-buraimi", name: "Al Buraimi", lat: 24.25, lng: 55.79, summary: "Oasis city on the border with Al Ain, UAE.", assets: ["Border with Al Ain", "Al Khandaq Fort"], sectors: ["Cross-border trade", "Retail"], image: "om-al-buraimi", sources: [wiki("Al_Buraimi", "Al-Buraimi")] },
  { slug: "ibra", country: "oman", region: "sharqiyah-north", name: "Ibra", lat: 22.69, lng: 58.53, summary: "Main city of North Ash Sharqiyah, near the Sharqiya Sands.", assets: ["Gateway to the Sharqiya Sands"], sectors: ["Tourism", "Agriculture"], image: "om-sharqiyah-north", sources: [OM] },
  { slug: "khasab", country: "oman", region: "musandam", name: "Khasab", lat: 26.18, lng: 56.25, summary: "Capital of Musandam on the Strait of Hormuz.", assets: ["Harbour on the Strait of Hormuz", "Fjord coastline"], sectors: ["Tourism", "Fisheries"], image: "om-musandam", sources: [wiki("Khasab")] },

  // India
  { slug: "chennai", country: "india", region: "tamil-nadu", name: "Chennai", lat: 13.08, lng: 80.27, summary: "Capital of Tamil Nadu on the Bay of Bengal, and a centre of India’s automobile industry.", assets: ["Houses a major portion of India’s automobile industry", "Port of Chennai on the Coromandel Coast", "Tamil Nadu’s capital and largest city"], sectors: ["Automobiles", "Electronics", "Services"], image: "in-chennai", sources: [wiki("Chennai"), wiki("Port_of_Chennai", "Port of Chennai")] },
  { slug: "coimbatore", country: "india", region: "tamil-nadu", name: "Coimbatore", lat: 11.02, lng: 76.96, summary: "A textile hub known as the “Manchester of South India”.", assets: ["Hub of the textile industry in South India", "Engineering and manufacturing base"], sectors: ["Textiles", "Engineering"], image: "in-coimbatore", sources: [wiki("Coimbatore")] },
  { slug: "bengaluru", country: "india", region: "karnataka", name: "Bengaluru", lat: 12.97, lng: 77.59, summary: "Capital of Karnataka and one of the world’s fastest growing technology hubs.", assets: ["Major centre for information technology", "Capital and largest city of Karnataka"], sectors: ["IT and software", "Aerospace", "Biotech"], image: "in-bengaluru", sources: [wiki("Bangalore", "Bengaluru")] },
  { slug: "mangaluru", country: "india", region: "karnataka", name: "Mangaluru", lat: 12.91, lng: 74.86, summary: "An industrial port city on India’s west coast.", assets: ["New Mangalore Port, an all-weather port", "Major industrial port city"], sectors: ["Ports", "Petrochemicals", "Seafood"], image: "in-mangaluru", sources: [wiki("Mangalore", "Mangaluru"), wiki("New_Mangalore_Port", "New Mangalore Port")] },
  { slug: "ahmedabad", country: "india", region: "gujarat", name: "Ahmedabad", lat: 23.02, lng: 72.57, summary: "Gujarat’s largest city and an economic, industrial and cultural hub.", assets: ["Important economic and industrial hub"], sectors: ["Textiles", "Chemicals", "Pharmaceuticals"], image: "in-ahmedabad", sources: [wiki("Ahmedabad")] },
  { slug: "mundra", country: "india", region: "gujarat", name: "Mundra", lat: 22.84, lng: 69.72, summary: "Home to India’s largest commercial and container port on the Gulf of Kutch.", assets: ["Mundra Port, India’s largest commercial and container port"], sectors: ["Ports and logistics"], image: "in-mundra", sources: [wiki("Mundra_Port", "Mundra Port")] },
  { slug: "mumbai", country: "india", region: "maharashtra", name: "Mumbai", lat: 19.08, lng: 72.88, summary: "The financial capital of India.", assets: ["Financial capital of India", "Jawaharlal Nehru Port (Nhava Sheva)"], sectors: ["Finance", "Media", "Logistics"], image: "in-mumbai", sources: [wiki("Mumbai"), wiki("Jawaharlal_Nehru_Port", "Jawaharlal Nehru Port")] },
  { slug: "kochi", country: "india", region: "kerala", name: "Kochi", lat: 9.93, lng: 76.27, summary: "A major port city on the Malabar Coast.", assets: ["Major port city on the Malabar Coast", "Port of Kochi"], sectors: ["Seafood", "Shipping", "Spices"], image: "in-kochi", sources: [wiki("Kochi"), wiki("Port_of_Kochi", "Port of Kochi")] },

  // Tanzania
  { slug: "dar-es-salaam", country: "tanzania", region: "dar-es-salaam", name: "Dar es Salaam", lat: -6.79, lng: 39.21, summary: "Tanzania’s largest city, financial hub and main port.", assets: ["Largest city and financial hub of Tanzania", "Port of Dar es Salaam"], sectors: ["Logistics", "Finance", "Manufacturing"], image: "tz-dar-es-salaam", sources: [wiki("Dar_es_Salaam", "Dar es Salaam")] },
  { slug: "zanzibar-city", country: "tanzania", region: "zanzibar", name: "Zanzibar City", lat: -6.17, lng: 39.2, summary: "Home to Stone Town, a UNESCO World Heritage Site.", assets: ["Stone Town, UNESCO World Heritage Site", "Spice trade and tourism"], sectors: ["Spices", "Tourism"], image: "tz-zanzibar", sources: [wiki("Zanzibar")] },
  { slug: "arusha", country: "tanzania", region: "arusha", name: "Arusha", lat: -3.39, lng: 36.68, summary: "Capital of the East African Community and a gateway to northern Tanzania’s parks.", assets: ["Capital of the East African Community", "African Court of the African Union"], sectors: ["Tourism", "Services"], image: "tz-arusha", sources: [wiki("Arusha")] },

  // United Kingdom
  { slug: "london", country: "united-kingdom", region: "england", name: "London", lat: 51.51, lng: -0.13, summary: "The UK capital and home of the City of London financial centre.", assets: ["City of London financial centre", "UK capital"], sectors: ["Finance", "Professional services", "Technology"], image: "uk-london", sources: [wiki("London")] },
  { slug: "manchester", country: "united-kingdom", region: "england", name: "Manchester", lat: 53.48, lng: -2.24, summary: "A city that grew with textile manufacturing and has seen major investment and regeneration since the 1990s.", assets: ["Historic centre of the Industrial Revolution’s textile boom", "Major regeneration and investment since 1996"], sectors: ["Manufacturing", "Media", "Services"], image: "uk-manchester", sources: [wiki("Manchester")] },
  { slug: "aberdeen", country: "united-kingdom", region: "scotland", name: "Aberdeen", lat: 57.15, lng: -2.09, summary: "Known as the offshore oil capital of Europe since North Sea oil was found in 1969.", assets: ["Offshore oil capital of Europe", "North Sea seaport"], sectors: ["Offshore energy", "Engineering", "Seafood"], image: "uk-aberdeen", sources: [wiki("Aberdeen")] },
];

/* -------------------------------------------------------------------- zones */

export const zones: Zone[] = [
  { slug: "sohar-port-freezone", country: "oman", region: "north-batinah", city: "sohar", name: "SOHAR Port and Freezone", type: "Free zone", summary: "Deep-sea port and free zone of over 4,500 hectares, run with the Port of Rotterdam.", source: wiki("Port_of_Sohar", "SOHAR Port and Freezone") },
  { slug: "sezad", country: "oman", region: "al-wusta", city: "duqm", name: "Special Economic Zone at Duqm", type: "Economic zone", summary: "Industrial and port zone on the Arabian Sea, with Duqm Fishing Port.", source: wiki("Duqm") },
  { slug: "port-of-salalah", country: "oman", region: "dhofar", city: "salalah", name: "Port of Salalah", type: "Port", summary: "Oman’s largest port, operating since 1998.", source: wiki("Port_of_Salalah", "Port of Salalah") },
  { slug: "raysut-industrial-city", country: "oman", region: "dhofar", city: "salalah", name: "Raysut Industrial City", type: "Industrial city", summary: "Industrial city in Dhofar run by Madayn.", source: { label: "Madayn", url: "https://www.madayn.om" } },
  { slug: "al-mazunah-free-zone", country: "oman", region: "dhofar", name: "Al Mazunah Free Zone", type: "Free zone", summary: "Free zone in Dhofar run by Madayn.", source: { label: "Madayn", url: "https://www.madayn.om" } },
  { slug: "rusayl-industrial-city", country: "oman", region: "muscat", city: "muscat", name: "Al Rusayl Industrial City", type: "Industrial city", summary: "Industrial city in Muscat and head office of Madayn.", source: { label: "Madayn", url: "https://www.madayn.om" } },
  { slug: "oman-lng", country: "oman", region: "sharqiyah-south", city: "sur", name: "Oman LNG, Qalhat", type: "Energy hub", summary: "Three LNG trains with 10.4 million tonnes a year capacity.", source: wiki("Oman_LNG", "Oman LNG") },
  { slug: "port-of-chennai", country: "india", region: "tamil-nadu", city: "chennai", name: "Port of Chennai", type: "Port", summary: "Major port on the Coromandel Coast.", source: wiki("Port_of_Chennai", "Port of Chennai") },
  { slug: "new-mangalore-port", country: "india", region: "karnataka", city: "mangaluru", name: "New Mangalore Port", type: "Port", summary: "All-weather port at Panambur, Mangaluru.", source: wiki("New_Mangalore_Port", "New Mangalore Port") },
  { slug: "mundra-port", country: "india", region: "gujarat", city: "mundra", name: "Mundra Port", type: "Port", summary: "India’s largest commercial and container port, on the Gulf of Kutch.", source: wiki("Mundra_Port", "Mundra Port") },
  { slug: "jnpt", country: "india", region: "maharashtra", city: "mumbai", name: "Jawaharlal Nehru Port", type: "Port", summary: "Large container port also known as Nhava Sheva.", source: wiki("Jawaharlal_Nehru_Port", "Jawaharlal Nehru Port") },
  { slug: "port-of-kochi", country: "india", region: "kerala", city: "kochi", name: "Port of Kochi", type: "Port", summary: "Port on the Malabar Coast at Kochi.", source: wiki("Port_of_Kochi", "Port of Kochi") },
  { slug: "port-of-dar-es-salaam", country: "tanzania", region: "dar-es-salaam", city: "dar-es-salaam", name: "Port of Dar es Salaam", type: "Port", summary: "The principal port serving Tanzania.", source: wiki("Port_of_Dar_es_Salaam", "Port of Dar es Salaam") },
  { slug: "city-of-london", country: "united-kingdom", region: "england", city: "london", name: "City of London", type: "Financial centre", summary: "London’s historic core and financial centre.", source: wiki("London") },
];

/* ------------------------------------------------------------------ lookups */

export const countryBySlug = (s: string) => countries.find((c) => c.slug === s);
export const regionBy = (country: string, slug: string) => regions.find((r) => r.country === country && r.slug === slug);
export const cityBy = (country: string, slug: string) => cities.find((c) => c.country === country && c.slug === slug);
export const regionsOf = (country: string) => regions.filter((r) => r.country === country);
export const citiesOf = (country: string, region?: string) =>
  cities.filter((c) => c.country === country && (!region || c.region === region));
export const zonesOf = (country: string, region?: string, city?: string) =>
  zones.filter((z) => z.country === country && (!region || z.region === region) && (!city || z.city === city));

export const countryHref = (c: string) => `/countries/${c}`;
export const regionHref = (c: string, r: string) => `/countries/${c}/${r}`;
export const cityHref = (c: string, r: string, city: string) => `/countries/${c}/${r}/${city}`;
