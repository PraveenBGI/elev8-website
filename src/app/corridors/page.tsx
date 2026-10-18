import type { Metadata } from "next";
import { CorridorFinder } from "@/components/CorridorFinder";
import { CorridorExplorer } from "@/components/Explorers";
import { NetworkMap } from "@/components/NetworkMap";
import { Block, CtaBand, ListHeader } from "@/components/page";

export const metadata: Metadata = {
  title: "Corridors",
  description: "Trade corridors between states and countries: Tamil Nadu to North Al Batinah, Scotland to Al Wusta, Gujarat to Dar es Salaam and more.",
};

export default function CorridorsPage() {
  return (
    <>
      <ListHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Corridors" }]}
        eyebrow="Corridors"
        title="Corridors, state to state."
        description="A corridor links states in different countries, or within one country, where trade is set up to flow. For investors and traders, each corridor also shows the key cities and ports along it."
      >
        <div className="mt-10 max-w-5xl">
          <CorridorFinder />
        </div>
      </ListHeader>
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <CorridorExplorer />
        <Block title="All corridors on the map" id="map">
          <div className="overflow-hidden rounded-[22px] bg-white p-2 ring-1 ring-stroke-1 sm:p-4">
            <NetworkMap />
          </div>
        </Block>
      </div>
      <CtaBand title="Follow the corridors that matter to you" />
    </>
  );
}
