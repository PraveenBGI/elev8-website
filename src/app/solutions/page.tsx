import type { Metadata } from "next";
import { pillars } from "@/content/pillars";
import { PillarCard } from "@/components/cards";
import { CtaBand, ListHeader } from "@/components/page";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Eight solutions on one verified profile: procurement, B2B, import, export, investment, ICV, sustainability and governance.",
};

export default function SolutionsPage() {
  return (
    <>
      <ListHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        eyebrow="Eight solutions"
        title="Everything a business needs, on one profile"
        description="Register once and use the same verified details for procurement, partnerships, trade, investment, in-country value, sustainability and compliance, in every country you work in."
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {pillars.map((p) => (
            <li key={p.id}>
              <PillarCard p={p} />
            </li>
          ))}
        </ul>
      </div>
      <CtaBand />
    </>
  );
}
