import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { corridorsTouching } from "@/content/corridors";
import { opportunitiesIn } from "@/content/opportunities";
import { cities, cityBy, citiesOf, countryBySlug, regionBy, zonesOf } from "@/content/places";
import { PlaceCard } from "@/components/cards";
import { Block, Checklist, CtaBand, DetailSection, HeroButton, PageHero } from "@/components/page";
import { site } from "@/content/site";
import { AtAGlance, CorridorsBlock, OpportunitiesBlock, ZonesBlock } from "@/components/PlaceBlocks";
import { Flag, Sources } from "@/components/ui";

export function generateStaticParams() {
  return cities.map((x) => ({ country: x.country, region: x.region, city: x.slug }));
}

export async function generateMetadata({ params }: PageProps<"/countries/[country]/[region]/[city]">): Promise<Metadata> {
  const { country, city } = await params;
  const x = cityBy(country, city);
  const c = countryBySlug(country);
  return x && c ? { title: `${x.name}, ${c.name}`, description: x.summary } : {};
}

export default async function CityPage({ params }: PageProps<"/countries/[country]/[region]/[city]">) {
  const { country, region, city } = await params;
  const c = countryBySlug(country);
  const r = regionBy(country, region);
  const x = cityBy(country, city);
  if (!c || !r || !x || x.region !== r.slug) notFound();

  const ref = { c: c.slug, r: r.slug, city: x.slug };
  const nearby = citiesOf(c.slug).filter((y) => y.slug !== x.slug).slice(0, 4);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: c.name, href: `/countries/${c.slug}` },
          { label: r.name, href: `/countries/${c.slug}/${r.slug}` },
          { label: x.name },
        ]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Flag code={c.flag} className="h-4 w-6" /> Investment and trade destination · {r.name}, {c.name}
          </span>
        }
        title={x.name}
        subtitle={x.summary}
        image={x.image}
        gallery={[r.image, c.image]}
      >
        <HeroButton href="/for/investors">Invest and trade with {x.name}</HeroButton>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <div className="flex flex-col gap-y-10">
            <DetailSection title={`Why ${x.name}`} id="why" description="The investment and trade case, from published sources.">
              <Checklist items={x.assets} />
            </DetailSection>
          </div>
          <AtAGlance
            rows={[
              { label: c.regionTerm, value: r.name },
              { label: "Country", value: c.name },
              { label: "Ports and zones", value: String(zonesOf(c.slug, r.slug, x.slug).length) },
              { label: "Corridors", value: String(corridorsTouching(ref).length) },
            ]}
            sectors={x.sectors}
            pillars={["investment", "import", "export"]}
            cta={{ label: "Register as an investor or trader", href: site.links.register }}
          />
        </div>

        <ZonesBlock zones={zonesOf(c.slug, r.slug, x.slug)} title={`Ports and zones in ${x.name}`} />
        <CorridorsBlock list={corridorsTouching(ref)} title={`Corridors through ${r.name}`} />
        <OpportunitiesBlock list={opportunitiesIn(ref)} title={`Opportunities in ${x.name}`} />

        {nearby.length > 0 && (
          <Block title={`More cities in ${c.name}`} id="nearby">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {nearby.map((y) => (
                <li key={y.slug}>
                  <PlaceCard href={`/countries/${c.slug}/${y.region}/${y.slug}`} image={y.image} title={y.name} subtitle={regionBy(c.slug, y.region)!.name} />
                </li>
              ))}
            </ul>
          </Block>
        )}

        <Sources items={x.sources} />
      </div>
      <CtaBand title={`Invest and trade with ${x.name}`} text="Register as an investor, importer or exporter to follow this city’s corridors and opportunities." />
    </>
  );
}
