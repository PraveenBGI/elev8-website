import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { corridorsTouching } from "@/content/corridors";
import { opportunitiesIn } from "@/content/opportunities";
import { countryBySlug, citiesOf, regionBy, regions, regionsOf, zonesOf } from "@/content/places";
import { PlaceCard } from "@/components/cards";
import { Block, Checklist, CtaBand, DetailSection, HeroButton, PageHero } from "@/components/page";
import { AtAGlance, CorridorsBlock, OpportunitiesBlock, ZonesBlock } from "@/components/PlaceBlocks";
import { Flag, Sources } from "@/components/ui";

export function generateStaticParams() {
  return regions.map((r) => ({ country: r.country, region: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/countries/[country]/[region]">): Promise<Metadata> {
  const { country, region } = await params;
  const r = regionBy(country, region);
  const c = countryBySlug(country);
  return r && c ? { title: `${r.name}, ${c.name}`, description: r.summary } : {};
}

export default async function RegionPage({ params }: PageProps<"/countries/[country]/[region]">) {
  const { country, region } = await params;
  const c = countryBySlug(country);
  const r = regionBy(country, region);
  if (!c || !r) notFound();

  const cs = citiesOf(c.slug, r.slug);
  const siblings = regionsOf(c.slug).filter((x) => x.slug !== r.slug).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Countries", href: "/countries" }, { label: c.name, href: `/countries/${c.slug}` }, { label: r.name }]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Flag code={c.flag} className="h-4 w-6" /> {c.regionTerm} of {c.name}
          </span>
        }
        title={r.name}
        subtitle={r.summary}
        image={r.image}
        gallery={cs.map((x) => x.image)}
      >
        <HeroButton>Do business in {r.name}</HeroButton>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <div className="flex flex-col gap-y-10">
            <DetailSection title={`Why ${r.name}`} id="why" description={`What the ${c.regionTerm.toLowerCase()} offers businesses on elev8.`}>
              <Checklist items={r.assets} />
            </DetailSection>
          </div>
          <AtAGlance
            rows={[
              { label: "Capital", value: r.capital },
              { label: "Country", value: c.name },
              { label: "Cities profiled", value: String(cs.length) },
              { label: "Ports and zones", value: String(zonesOf(c.slug, r.slug).length) },
            ]}
            sectors={r.sectors}
            pillars={r.pillars}
          />
        </div>

        {cs.length > 0 && (
          <Block title={`Investment and trade destinations in ${r.name}`} id="cities" description="Cities, ports and zones mapped for investors, importers and exporters.">
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {cs.map((x) => (
                <li key={x.slug}>
                  <PlaceCard href={`/countries/${c.slug}/${r.slug}/${x.slug}`} image={x.image} title={x.name} subtitle={x.summary} />
                </li>
              ))}
            </ul>
          </Block>
        )}

        <ZonesBlock zones={zonesOf(c.slug, r.slug)} />
        <CorridorsBlock list={corridorsTouching({ c: c.slug, r: r.slug })} title={`Corridors through ${r.name}`} />
        <OpportunitiesBlock list={opportunitiesIn({ c: c.slug, r: r.slug })} title={`Opportunities in ${r.name}`} />

        {siblings.length > 0 && (
          <Block title={`Other ${c.regionTermPlural.toLowerCase()} in ${c.name}`} id="others">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {siblings.map((x) => (
                <li key={x.slug}>
                  <PlaceCard href={`/countries/${c.slug}/${x.slug}`} image={x.image} title={x.name} subtitle={x.capital} />
                </li>
              ))}
            </ul>
          </Block>
        )}

        <Sources items={r.sources} />
      </div>
      <CtaBand title={`Grow your business in ${r.name}`} />
    </>
  );
}
