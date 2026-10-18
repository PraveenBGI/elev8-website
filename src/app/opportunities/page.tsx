import type { Metadata } from "next";
import { OpportunityExplorer } from "@/components/Explorers";
import { CtaBand, ListHeader } from "@/components/page";

export const metadata: Metadata = {
  title: "Opportunities",
  description: "Opportunity areas across countries, states and cities, by solution and by country.",
};

export default function OpportunitiesPage() {
  return (
    <>
      <ListHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Opportunities" }]}
        eyebrow="Opportunities"
        title="Where the opportunities are"
        description="Opportunity areas across countries, states, cities and corridors. Register to get matched to tenders, partners and investments in the ones that fit your business."
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <OpportunityExplorer />
      </div>
      <CtaBand title="Get matched to the right opportunities" />
    </>
  );
}
