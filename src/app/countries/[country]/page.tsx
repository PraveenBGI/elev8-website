import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { corridorsTouching } from "@/content/corridors";
import { opportunitiesIn } from "@/content/opportunities";
import { countries, countryBySlug, citiesOf, regionsOf, zonesOf } from "@/content/places";
import { PlaceCard } from "@/components/cards";
import { Block, CtaBand, DetailSection, Fact, HeroButton, PageHero } from "@/components/page";
import { AtAGlance, CorridorsBlock, OpportunitiesBlock, ZonesBlock } from "@/components/PlaceBlocks";
import { site } from "@/content/site";
import { Badge, Flag, Sources } from "@/components/ui";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/countries/[country]">): Promise<Metadata> {
  const { country } = await params;
  const c = countryBySlug(country);
  return c ? { title: c.name, description: c.summary } : {};
}

export default async function CountryPage({ params }: PageProps<"/countries/[country]">) {
  const { country } = await params;
  const c = countryBySlug(country);
  if (!c) notFound();

  const rs = regionsOf(c.slug);
  const corridors = corridorsTouching({ c: c.slug });
  const intl = corridors.filter((k) => k.scope === "international");
  const domestic = corridors.filter((k) => k.scope === "domestic");
  const top = <T,>(xs: T[], n: number) => [...new Set(xs)].slice(0, n);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Countries", href: "/countries" }, { label: c.name }]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Flag code={c.flag} className="h-4 w-6" /> Capital {c.capital} · {rs.length} {c.regionTermPlural.toLowerCase()} · {citiesOf(c.slug).length} cities
          </span>
        }
        title={c.name}
        subtitle={c.summary}
        image={c.image}
        gallery={rs.map((r) => r.image)}
      >
        <HeroButton>Do business in {c.name}</HeroButton>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <div className="flex flex-col gap-y-10">
            <DetailSection title="Key facts" id="facts">
              <dl className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
                {c.facts.map((f) => (
                  <Fact key={f.label} {...f} />
                ))}
              </dl>
            </DetailSection>
            <DetailSection title={`Why ${c.name}`} id="value">
              <ol className="flex flex-col gap-y-8">
                {c.value.map((v, i) => (
                  <li key={v.title} className="flex gap-x-5">
                    <Badge tone={(["blue", "green", "red"] as const)[i % 3]} className="h-fit shrink-0">{String(i + 1).padStart(2, "0")}</Badge>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ink/60">{v.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </DetailSection>
          </div>
          <AtAGlance
            rows={[
              { label: "Capital", value: c.capital },
              { label: c.regionTermPlural, value: String(rs.length) },
              { label: "Cities profiled", value: String(citiesOf(c.slug).length) },
              { label: "Ports and zones", value: String(zonesOf(c.slug).length) },
              { label: "Corridors", value: String(corridors.length) },
            ]}
            sectors={top(rs.flatMap((r) => r.sectors), 5)}
            pillars={top(rs.flatMap((r) => r.pillars), 4)}
            cta={{ label: `Do business in ${c.name}`, href: site.links.register }}
          />
        </div>

        <Block title={`${c.regionTermPlural} of ${c.name}`} id="regions">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {rs.map((r) => (
              <li key={r.slug}>
                <PlaceCard href={`/countries/${c.slug}/${r.slug}`} image={r.image} title={r.name} subtitle={`${r.capital} · ${r.sectors.slice(0, 2).join(", ")}`} />
              </li>
            ))}
          </ul>
        </Block>

        <CorridorsBlock list={intl} title="International corridors" />
        <CorridorsBlock list={domestic} title={`Corridors inside ${c.name}`} />
        <ZonesBlock zones={zonesOf(c.slug)} />
        <OpportunitiesBlock list={opportunitiesIn({ c: c.slug }).slice(0, 6)} title={`Opportunities in ${c.name}`} />

        <Block title="Other countries" id="others">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
            {countries
              .filter((x) => x.slug !== c.slug)
              .map((x) => (
                <li key={x.slug}>
                  <PlaceCard href={`/countries/${x.slug}`} image={x.image} title={x.name} flag={x.flag} subtitle={x.summary} />
                </li>
              ))}
          </ul>
        </Block>

        <Sources items={c.sources} />
      </div>
      <CtaBand title={`Start trading with ${c.name}`} />
    </>
  );
}
