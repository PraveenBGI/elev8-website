import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { corridors } from "@/content/corridors";
import { opportunitiesForPillar } from "@/content/opportunities";
import { countryBySlug, regions } from "@/content/places";
import { pillarById, pillars } from "@/content/pillars";
import { PillarCard, PlaceCard } from "@/components/cards";
import { Block, Checklist, CtaBand, HeroButton, PageHero } from "@/components/page";
import { CorridorsBlock, OpportunitiesBlock } from "@/components/PlaceBlocks";

export function generateStaticParams() {
  return pillars.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[id]">): Promise<Metadata> {
  const { id } = await params;
  const p = pillarById(id);
  return p ? { title: p.name, description: p.intro } : {};
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[id]">) {
  const { id } = await params;
  const p = pillarById(id);
  if (!p) notFound();

  const strong = regions.filter((r) => r.pillars.includes(p.id)).slice(0, 8);
  const ks = corridors.filter((k) => k.pillars.includes(p.id)).slice(0, 4);

  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: p.name }]} eyebrow="Solution" title={p.name} subtitle={p.intro} image={p.image}>
        <div className="mt-2">
          <HeroButton>Get started with {p.name}</HeroButton>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Block title="What you can do" id="actions">
          <Checklist items={p.actions} />
        </Block>
        <OpportunitiesBlock list={opportunitiesForPillar(p.id)} title={`${p.name} opportunities`} />
        <CorridorsBlock list={ks} title="Corridors where this matters most" />
        {strong.length > 0 && (
          <Block title="Where it is strongest" id="places">
            <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {strong.map((r) => {
                const c = countryBySlug(r.country)!;
                return (
                  <li key={`${r.country}-${r.slug}`}>
                    <PlaceCard href={`/countries/${r.country}/${r.slug}`} image={r.image} title={r.name} flag={c.flag} subtitle={`${c.regionTerm}, ${c.name}`} />
                  </li>
                );
              })}
            </ul>
          </Block>
        )}
        <Block title="Other solutions" id="others">
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {pillars
              .filter((x) => x.id !== p.id)
              .slice(0, 4)
              .map((x) => (
                <li key={x.id}>
                  <PillarCard p={x} />
                </li>
              ))}
          </ul>
        </Block>
      </div>
      <CtaBand />
    </>
  );
}
