import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { corridors } from "@/content/corridors";
import { countries, regionsOf } from "@/content/places";
import { pillarById } from "@/content/pillars";
import { audienceBySlug, audiences, site } from "@/content/site";
import { CorridorCard, PillarCard, PlaceCard } from "@/components/cards";
import { NetworkMap } from "@/components/NetworkMap";
import { Block, CtaBand, HeroButton, PageHero } from "@/components/page";

export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/for/[audience]">): Promise<Metadata> {
  const { audience } = await params;
  const a = audienceBySlug(audience);
  return a ? { title: `For ${a.label.toLowerCase()}`, description: a.intro } : {};
}

export default async function AudiencePage({ params }: PageProps<"/for/[audience]">) {
  const { audience } = await params;
  const a = audienceBySlug(audience);
  if (!a) notFound();
  const ctaHref = a.cta.href === "briefing" ? site.links.briefing : site.links.register;
  const isGov = a.slug === "governments";

  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: `For ${a.label.toLowerCase()}` }]} eyebrow={`For ${a.label.toLowerCase()}`} title={a.title} subtitle={a.intro} image={a.image} gallery={a.pillars.slice(0, 4).map((id) => pillarById(id)!.image)}>
        <HeroButton href={ctaHref}>{a.cta.label}</HeroButton>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Block title={isGov ? "What your country gets" : "What you get"} id="benefits">
          <ul className={`grid gap-6 sm:grid-cols-2 ${a.benefits.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {a.benefits.map((b) => (
              <li key={b.title} className="rounded-2xl border border-stroke-1 p-6 transition hover:shadow-xl sm:p-7">
                <CheckBadgeIcon className="size-8 text-neutral-400" strokeWidth={1.25} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-semibold text-ink">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/60">{b.text}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="How it works" id="steps">
          <ol className="grid gap-8 md:grid-cols-3">
            {a.steps.map((s, i) => (
              <li key={s} className="flex flex-col gap-4 border-s border-stroke-1 ps-6">
                <span className="text-sm font-medium tracking-widest text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium text-ink">{s}</span>
              </li>
            ))}
          </ol>
        </Block>

        {isGov ? (
          <>
            <Block title="How a country looks on elev8" id="model">
              <p className="max-w-3xl text-ink/60">
                Each country is mapped from the national level down to its states, cities and zones, and connected to partner markets through corridors. Here is the network today.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-stroke-1 bg-white p-2 sm:p-4">
                <NetworkMap />
              </div>
            </Block>
            <Block title="The first countries on elev8" id="countries">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <PlaceCard href={`/countries/${c.slug}`} image={c.image} title={c.name} flag={c.flag} subtitle={`${regionsOf(c.slug).length} ${c.regionTermPlural.toLowerCase()} mapped`} />
                  </li>
                ))}
              </ul>
            </Block>
          </>
        ) : (
          <Block title="Corridors to start with" id="corridors">
            <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {corridors
                .filter((k) => k.featured)
                .slice(0, 3)
                .map((k) => (
                  <li key={k.slug}>
                    <CorridorCard c={k} />
                  </li>
                ))}
            </ul>
          </Block>
        )}

        <Block title="The solutions you will use most" id="solutions">
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {a.pillars.slice(0, 4).map((id) => (
              <li key={id}>
                <PillarCard p={pillarById(id)!} />
              </li>
            ))}
          </ul>
        </Block>
      </div>
      <CtaBand
        title={isGov ? "Bring elev8 to your country" : a.slug === "investors" ? "Find your next location" : "Start with one profile"}
        text={isGov ? "Talk to us about mapping your country, its states and cities, and opening corridors with partner markets." : undefined}
        label={a.cta.label}
        href={ctaHref}
        image={isGov ? "gov-building" : "cta-city-night"}
      />
    </>
  );
}
