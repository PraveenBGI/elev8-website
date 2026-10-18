/** Site-wide settings: navigation, platform links and audience pages. */
import type { ImageName } from "./images";
import type { PillarId } from "./pillars";

/** Public address of this website. Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is final. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://elev8-website.vercel.app").replace(/\/$/, "");

export const site = {
  brand: "elev8",
  links: {
    // The platform runs separately. Point these at it when its URLs are final.
    register: "https://app.elev8.example/register",
    login: "https://app.elev8.example/login",
    arabic: "/ar",
    briefing: "mailto:hello@elev8.example?subject=elev8%20briefing",
  },
};

export type AudienceSlug = "businesses" | "investors" | "governments";

export type Audience = {
  slug: AudienceSlug;
  label: string;
  title: string;
  intro: string;
  image: ImageName;
  benefits: { title: string; text: string }[];
  steps: string[];
  pillars: PillarId[];
  cta: { label: string; href: "register" | "briefing" };
};

export const audiences: Audience[] = [
  {
    slug: "businesses",
    label: "Businesses",
    title: "Sell, source and grow, in every market you choose.",
    intro: "One verified profile gives you tenders, buyers, suppliers and partners in every country and state on the platform, matched to what you do.",
    image: "business-meeting",
    benefits: [
      { title: "Find work you can win", text: "Tenders and supply requests matched to your sectors, locations and certifications." },
      { title: "Reach the right state, not just the country", text: "Target Tamil Nadu or North Al Batinah, not just India or Oman. Corridors show you where demand is." },
      { title: "Cut duties with trade agreements", text: "See which agreements apply on each corridor, such as the India–Oman CEPA or the GCC–UK agreement." },
      { title: "Prove your value locally", text: "Track in-country value and sustainability, and show buyers the numbers they ask for." },
    ],
    steps: ["Register and verify your business once", "Choose your sectors, states and corridors", "Get matched to tenders, buyers and partners"],
    pillars: ["procurement", "b2b", "export", "import", "icv"],
    cta: { label: "Register your business", href: "register" },
  },
  {
    slug: "investors",
    label: "Investors",
    title: "Find your next location, with the full picture.",
    intro: "See countries, states, cities and economic zones side by side, with the corridors and agreements that connect them, then talk to the right authority.",
    image: "investor-charts",
    benefits: [
      { title: "Compare at every level", text: "Country, state, city and zone, each with its strengths, sectors and assets in one view. Cities and zones are mapped especially for investors and traders." },
      { title: "See where goods will flow", text: "Corridors show which markets a location is connected to and through which ports." },
      { title: "Meet verified partners", text: "Local suppliers, joint venture partners and service providers, all verified." },
      { title: "Go straight to authorities", text: "Connect with licensing and investment authorities from the same profile." },
    ],
    steps: ["Shortlist places and zones", "Review corridors, sectors and partners", "Connect with authorities and partners"],
    pillars: ["investment", "governance", "b2b", "sustainability"],
    cta: { label: "Create an investor profile", href: "register" },
  },
  {
    slug: "governments",
    label: "Governments",
    title: "One national platform for trade, procurement and investment.",
    intro: "elev8 gives a country one platform that connects its businesses, states and cities with each other and with partner markets, and shows the government how its economy is moving.",
    image: "gov-building",
    benefits: [
      { title: "All eight pillars, configured nationally", text: "Procurement, B2B, import, export, investment, ICV, sustainability and governance, set up to national rules." },
      { title: "Every state, on one platform", text: "State packs let each state present its own strengths, sectors and zones. Cities, ports and zones can be shown to investors and traders." },
      { title: "Corridors with partner countries", text: "Turn trade agreements into working corridors between your cities and theirs." },
      { title: "Evidence for policy", text: "Dashboards on ICV, sustainability and corridor activity for ministries and monitoring entities." },
      { title: "Verified businesses only", text: "Every business is verified before it can trade, so buyers and authorities can rely on the record." },
      { title: "Bilingual and accessible", text: "Built for Arabic and English, right-to-left layouts and accessibility from the start." },
    ],
    steps: ["Configure the country and its states", "Switch on pillars and partner corridors", "Onboard businesses, investors and authorities"],
    pillars: ["governance", "procurement", "icv", "investment", "sustainability"],
    cta: { label: "Request a briefing", href: "briefing" },
  },
];

export const audienceBySlug = (s: string) => audiences.find((a) => a.slug === s);
