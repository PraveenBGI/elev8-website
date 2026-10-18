import type { Metadata } from "next";
import { CorridorFinder } from "@/components/CorridorFinder";
import { CorridorExplorer } from "@/components/Explorers";
import { NetworkMap } from "@/components/NetworkMap";
import { Block, CtaBand, ListHeader } from "@/components/page";

export const metadata: Metadata = {
  title: "Corridors",
  description: "Trade corridors between countries, states and cities: Chennai to Sohar, Aberdeen to Duqm, Mundra to Dar es Salaam and more.",
};

export default function CorridorsPage() {
  return (
    <>
      <ListHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Corridors" }]}
        eyebrow="Corridors"
        title="Corridors between countries and states"
        description="A corridor links two or more places where trade is set up to flow, country to country or state to state. For investors and traders, each corridor also shows the gateway cities and ports at either end."
      >
        <div className="mt-10 max-w-5xl">
          <CorridorFinder />
        </div>
      </ListHeader>
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <CorridorExplorer />
        <Block title="All corridors on the map" id="map">
          <div className="overflow-hidden rounded-[2rem] bg-white p-2 ring-1 ring-neutral-100 sm:p-4">
            <NetworkMap />
          </div>
        </Block>
      </div>
      <CtaBand title="Follow the corridors that matter to you" />
    </>
  );
}
