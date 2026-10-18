import type { ImageName } from "./images";

export type PillarId =
  | "procurement"
  | "b2b"
  | "import"
  | "export"
  | "investment"
  | "icv"
  | "sustainability"
  | "governance";

export type Pillar = {
  id: PillarId;
  name: string;
  outcome: string;
  intro: string;
  actions: string[];
  image: ImageName;
};

export const pillars: Pillar[] = [
  { id: "procurement", name: "Procurement", outcome: "Win tenders that match what you supply", intro: "See tenders and supply requests from buyers in every country and state you serve, matched to your products and services.", actions: ["Get tenders that match your sectors and locations", "Track bid deadlines in one place", "Show certifications and local content to buyers"], image: "pillar-procurement" },
  { id: "b2b", name: "B2B", outcome: "Meet verified buyers, suppliers and partners", intro: "Every business on the platform is verified, so you can find partners across borders and start conversations with confidence.", actions: ["Search verified companies by sector and state", "Post what you need or what you offer", "Find distributors and joint venture partners abroad"], image: "pillar-b2b" },
  { id: "import", name: "Import", outcome: "Source from the right market and state", intro: "Find suppliers in partner states and cities, and see what you need to bring goods in, corridor by corridor.", actions: ["Find suppliers on the corridors you follow", "See requirements before you buy", "Get alerts on agreements that cut duties"], image: "pillar-import" },
  { id: "export", name: "Export", outcome: "Reach buyers in new markets faster", intro: "Find buyers abroad and use corridors and trade agreements to reach them through the right ports.", actions: ["Meet buyers in partner states and cities", "Use trade agreements on your corridor", "Plan routes through the best ports"], image: "pillar-export" },
  { id: "investment", name: "Investment", outcome: "Compare locations, zones and incentives", intro: "Compare countries and states, and look further into the cities, ports and zones that matter, then connect with the right authority.", actions: ["Compare states, free zones and industrial cities", "See sectors open to investment", "Connect with licensing and investment authorities"], image: "pillar-investment" },
  { id: "icv", name: "ICV", outcome: "Grow in-country value and stand out", intro: "Find local suppliers, partners and talent that raise your in-country value and strengthen your bids.", actions: ["Find local suppliers by state", "Track your ICV improvement plan", "Get matched to local content opportunities"], image: "pillar-icv" },
  { id: "sustainability", name: "Sustainability", outcome: "Measure emissions and meet green criteria", intro: "Measure your footprint, meet buyer requirements and find partners for cleaner operations.", actions: ["Track Scope 1 and 2 emissions", "Meet green procurement criteria", "Find renewable energy and efficiency partners"], image: "pillar-sustainability" },
  { id: "governance", name: "Governance", outcome: "Stay compliant in every market", intro: "Keep licences, certificates and approvals in order in each country you work in, with reminders before anything needs action.", actions: ["See the licences your activity needs", "Get reminders before renewals", "Keep one verified record for every authority"], image: "pillar-governance" },
];

export const pillarById = (id: string) => pillars.find((p) => p.id === id);
export const pillarName = (id: PillarId) => pillarById(id)!.name;
