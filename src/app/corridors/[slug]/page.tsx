import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CubeIcon } from "@heroicons/react/24/outline";
import { corridorBySlug, corridors, refContext, refHref, refLevel, refName } from "@/content/corridors";
import { opportunitiesOnCorridor } from "@/content/opportunities";
import { cityBy, countryBySlug, regionBy, zonesOf } from "@/content/places";
import { CorridorRow, PlaceCard, StopChain } from "@/components/cards";
import { NetworkMap } from "@/components/NetworkMap";
import { Block, Checklist, CtaBand, DetailSection, HeroButton, PageHero } from "@/components/page";
import { AtAGlance, OpportunitiesBlock, ZonesBlock } from "@/components/PlaceBlocks";
import { site } from "@/content/site";
import { Badge } from "@/components/ui";

export function generateStaticParams() {
  return corridors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/corridors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = corridorBySlug(slug);
  return c ? { title: `${c.name} corridor`, description: c.summary } : {};
}

export default async function CorridorPage({ params }: PageProps<"/corridors/[slug]">) {
  const { slug } = await params;
  const c = corridorBySlug(slug);
  if (!c) notFound();

  const zones = c.stops.flatMap((s) => zonesOf(s.c, s.r, s.city));
  const related = corridors.filter((k) => k.slug !== c.slug && k.stops.some((s) => c.stops.some((t) => s.c === t.c && s.r === t.r))).slice(0, 3);

  const stopImages = c.stops.map((s) => {
    const country = countryBySlug(s.c)!;
    const region = s.r ? regionBy(s.c, s.r) : undefined;
    const city = s.city ? cityBy(s.c, s.city) : undefined;
    return city?.image ?? region?.image ?? country.image;
  });

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Corridors", href: "/corridors" }, { label: c.name }]}
        eyebrow={
          <span className="flex flex-wrap items-center gap-2">
            <Badge tone={c.scope === "international" ? "blue" : "green"}>{c.scope === "international" ? "International" : "Domestic"}</Badge>
            {c.agreement && <Badge tone="red">{c.agreement}</Badge>}
            <span>{c.kind === "bilateral" ? "Two-way corridor" : `${c.stops.length}-stop route`}</span>
          </span>
        }
        title={c.name}
        subtitle={c.summary}
        image={c.image}
        gallery={stopImages}
      >
        <HeroButton>Follow this corridor</HeroButton>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-14">
          <div className="flex flex-col gap-y-10">
            <DetailSection title="Route" id="route" description="Every stop is a country, a state or a city with an investment and trade case.">
              <StopChain c={c} />
            </DetailSection>
            <DetailSection title="Why use this corridor" id="offers">
              <Checklist items={c.highlights} />
            </DetailSection>
            <DetailSection title="What moves along it" id="moves">
              <ul className="grid gap-x-8 gap-y-5 text-ink/75 sm:grid-cols-2">
                {c.moves.map((m) => (
                  <li key={m} className="flex items-center gap-x-3">
                    <CubeIcon className="size-6 shrink-0 text-neutral-400" aria-hidden="true" /> {m}
                  </li>
                ))}
              </ul>
            </DetailSection>
          </div>
          <AtAGlance
            rows={[
              { label: "Type", value: c.scope === "international" ? "International" : "Domestic" },
              { label: "Stops", value: String(c.stops.length) },
              { label: "Direction", value: c.kind === "bilateral" ? "Two-way" : "Route" },
              ...(c.agreement ? [{ label: "Agreement", value: c.agreement }] : []),
            ]}
            sectors={c.moves.slice(0, 4)}
            sectorsLabel="What moves"
            pillars={c.pillars}
            cta={{ label: "Follow this corridor", href: site.links.register }}
          />
        </div>

        <Block title="The places on this corridor" id="ends" description="Each end is shown at every level, so you can see the city, the state around it and the country it belongs to.">
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.stops.map((s, i) => {
              const country = countryBySlug(s.c)!;
              const region = s.r ? regionBy(s.c, s.r) : undefined;
              const city = s.city ? cityBy(s.c, s.city) : undefined;
              return (
                <li key={i} className="flex flex-col gap-3">
                  <PlaceCard href={refHref(s)} image={stopImages[i]} title={refName(s)} flag={country.flag} badge={`${i === 0 ? "Start" : i === c.stops.length - 1 ? "End" : "Via"} · ${refLevel(s)}`} subtitle={refContext(s)} />
                  <p className="flex flex-wrap gap-x-2 text-sm text-ink/60">
                    <a href={`/countries/${country.slug}`} className="hover:text-ink hover:underline">{country.name}</a>
                    {region && <><span aria-hidden="true">/</span><a href={`/countries/${country.slug}/${region.slug}`} className="hover:text-ink hover:underline">{region.name}</a></>}
                    {city && <><span aria-hidden="true">/</span><a href={`/countries/${country.slug}/${region!.slug}/${city.slug}`} className="hover:text-ink hover:underline">{city.name}</a></>}
                  </p>
                </li>
              );
            })}
          </ul>
        </Block>

        <Block title="On the map" id="map">
          <div className="overflow-hidden rounded-2xl border border-stroke-1 bg-white p-2 sm:p-4">
            <NetworkMap only={[c]} />
          </div>
        </Block>

        <ZonesBlock zones={zones} title="Ports and zones at each end" />
        <OpportunitiesBlock list={opportunitiesOnCorridor(c.slug, c.stops)} title="Opportunities along the corridor" />

        {related.length > 0 && (
          <Block title="Related corridors" id="related">
            <ul className="flex flex-col gap-4">
              {related.map((k) => (
                <CorridorRow key={k.slug} c={k} />
              ))}
            </ul>
          </Block>
        )}
      </div>
      <CtaBand title={`Follow ${c.name}`} text="Register your business and follow this corridor to get matched to buyers, suppliers and opportunities at both ends." />
    </>
  );
}
