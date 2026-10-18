import type { ImageName } from "./images";
import type { PillarId } from "./pillars";

/*
  Home page copy. Voice: short, calm, confident. Lead with what the visitor gets,
  then show how. Geography (countries, states, corridors) is proof, not the pitch.
*/

export const hero = {
  markets: "Built for every country. Down to every state.",
  title: "One profile.\nEvery market.",
  subtitle: "Set up your business once. elev8 brings you the tenders, buyers, suppliers and investors that fit, wherever in the world you want to work.",
  primary: "Get started",
  secondary: "See how it works",
};

export const statement = {
  lead: "A new market usually means new portals, new paperwork and new people to trust.",
  punch: "elev8 makes it one profile.",
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "Three steps. Then it works for you.",
  steps: [
    { title: "Set up once.", text: "Your company, sectors and certificates. Verified one time, used everywhere on elev8." },
    { title: "Choose where to grow.", text: "Pick countries, states and the corridors between them. Change them whenever you like." },
    { title: "Let the right work find you.", text: "gatewAI matches you to tenders, buyers, suppliers and investors, and tells you when something needs attention." },
  ],
};

export const solutionsCopy = {
  eyebrow: "Eight solutions",
  title: "Everything you do across borders. In one place.",
  description: "The same verified profile works in every solution, in every country on elev8.",
};

/** Short, benefit-first headline per pillar for the home tabs. */
export const pillarHeadline: Record<PillarId, string> = {
  procurement: "Win the right tenders.",
  b2b: "Meet businesses you can trust.",
  import: "Source from the right place.",
  export: "Sell further, faster.",
  investment: "Invest with the full picture.",
  icv: "Build value where you work.",
  sustainability: "Show your footprint. Meet the bar.",
  governance: "Stay compliant, everywhere.",
};

export const gatewai = {
  eyebrow: "gatewAI",
  title: "Opportunities, before you go looking.",
  description: "gatewAI works from your verified profile and the markets you follow. It brings you what fits, and the deadlines that matter.",
  features: [
    { title: "Opportunity matching", text: "Tenders, buyers and investments that fit your sectors and places." },
    { title: "Corridor intelligence", text: "What is moving on the corridors you follow." },
    { title: "Compliance alerts", text: "A nudge before a licence or certificate needs action." },
    { title: "Trade recommendations", text: "Next steps, suggested from your profile and activity." },
  ],
};

export const trustCopy = {
  eyebrow: "Trust",
  title: "Trust, built in.",
  description: "Cross-border business only works when you can rely on who you deal with and the rules you work under.",
  items: [
    { title: "Verified. Every one.", text: "Every business is verified before it can trade, so buyers, suppliers and authorities can rely on the record." },
    { title: "Rules for every market.", text: "Each solution follows the requirements of the country and state you work in." },
    { title: "Agreements, put to work.", text: "Corridors carry the trade agreements that apply, like the India–Oman CEPA (2025) and the GCC–UK FTA (2026)." },
    { title: "Arabic and English.", text: "Built for both languages, including right-to-left layouts." },
  ],
};

export const marketsCopy = {
  eyebrow: "Markets",
  title: "Wherever you’re headed.",
  description: "elev8 is built for any country and every state within it. Each country joins with its own rules, states and corridors, and the network grows with every one. These are the first.",
  firstLabel: "First markets on elev8",
  next: { title: "Your country, next.", text: "elev8 grows country by country. Each new country brings its states, its businesses and new corridors to everyone already on the network.", cta: "Bring elev8 to your country" },
};

export const audiencesCopy = {
  eyebrow: "Who it’s for",
  title: "Made for everyone who moves an economy.",
};

export const audienceHeadline: Record<string, { title: string; text: string }> = {
  businesses: { title: "Sell, source and grow.", text: "Tenders, buyers and suppliers in every market you choose, on one verified profile." },
  investors: { title: "Find your next location.", text: "Compare countries, states, zones and corridors side by side, then meet the right people." },
  governments: { title: "Run it nationally.", text: "One platform for your country’s trade, procurement and investment, configured to your rules." },
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  items: [
    {
      q: "What is elev8?",
      a: "elev8 is a trade, procurement and investment platform. A business sets up one verified profile and uses it across eight solutions: procurement, B2B, import, export, investment, ICV, sustainability and governance.",
    },
    {
      q: "Who is it for?",
      a: "Businesses that buy, sell or source across borders, investors comparing locations, and governments that want one national platform for their economy.",
    },
    {
      q: "Which countries is elev8 for?",
      a: "Any country. elev8 is designed to run nationally, down to state level, and to connect countries through corridors. The first markets are India, Oman, Tanzania and the United Kingdom, and the network grows as more countries join.",
    },
    {
      q: "Do I register again for each country?",
      a: "No. You register and verify once, then choose the countries, states and corridors you want to work in. As new countries join, the same profile works there too.",
    },
    {
      q: "What does gatewAI do?",
      a: "gatewAI is the assistant built into elev8. It works from your verified profile and chosen markets to match you to tenders, buyers, partners and alerts.",
    },
    {
      q: "How does a government bring elev8 to its country?",
      a: "Start with a briefing. Each country is configured with its own rules, states and partner corridors before businesses are onboarded.",
    },
  ],
};

export const finalCta = {
  eyebrow: "Get started",
  title: "Set it up once.\nLet elev8 do the searching.",
  text: "Register your business, choose your markets and start getting matched.",
  cta: "Get started",
  secondary: "Talk to us",
  image: "cta-city-night" as ImageName,
};
