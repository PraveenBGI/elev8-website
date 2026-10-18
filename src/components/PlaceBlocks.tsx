import { BuildingOffice2Icon, BoltIcon, BuildingLibraryIcon, CubeIcon, GlobeAltIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import type { Corridor } from "@/content/corridors";
import type { Opportunity } from "@/content/opportunities";
import type { PillarId } from "@/content/pillars";
import type { Zone } from "@/content/places";
import { site } from "@/content/site";
import { CorridorRow, OpportunityCard } from "@/components/cards";
import { Block, DetailSection } from "@/components/page";
import { ButtonPrimary, Divider, PillarTag } from "@/components/ui";

const zoneIcon = { Port: GlobeAltIcon, "Free zone": CubeIcon, "Economic zone": BuildingOffice2Icon, "Industrial city": WrenchScrewdriverIcon, "Energy hub": BoltIcon, "Financial centre": BuildingLibraryIcon } as const;

/** Sticky side card, like the Chisfis booking card. */
export function AtAGlance({
  rows,
  sectors,
  pillars,
  sectorsLabel = "Main sectors",
  cta = { label: "Register your business", href: site.links.register },
}: {
  rows: { label: string; value: string }[];
  sectors: string[];
  pillars: PillarId[];
  sectorsLabel?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <aside className="h-fit rounded-[22px] bg-white p-6 ring-1 ring-stroke-1 shadow-[0_24px_60px_-28px_rgba(11,35,80,0.35)] sm:p-8 lg:sticky lg:top-28">
      <h2 className="text-h5 font-normal text-ink">At a glance</h2>
      <dl className="mt-6 flex flex-col divide-y divide-stroke-1 rounded-2xl border border-stroke-1">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4 px-4 py-3.5">
            <dt className="text-sm text-ink/60">{r.label}</dt>
            <dd className="text-sm font-medium text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6">
        <p className="text-sm text-ink/60">{sectorsLabel}</p>
        <p className="mt-2 text-ink">{sectors.join(" · ")}</p>
      </div>
      {pillars.length > 0 && (
        <div className="mt-6">
          <p className="text-sm text-ink/60">Strongest solutions</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {pillars.map((p) => (
              <PillarTag key={p} id={p} link />
            ))}
          </div>
        </div>
      )}
      <div className="my-6"><Divider /></div>
      <ButtonPrimary href={cta.href} className="w-full">{cta.label}</ButtonPrimary>
    </aside>
  );
}

export function ZonesBlock({ zones, title = "Ports, zones and industrial cities" }: { zones: Zone[]; title?: string }) {
  if (!zones.length) return null;
  return (
    <div className="mt-10">
      <DetailSection title={title} id="zones">
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {zones.map((z) => {
            const Icon = zoneIcon[z.type];
            return (
              <li key={z.slug} className="flex gap-4">
                <Icon className="size-7 shrink-0 text-neutral-400" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400">{z.type}</p>
                  <h3 className="mt-1 font-semibold text-ink">{z.name}</h3>
                  <p className="mt-1 text-sm text-ink/60">{z.summary}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </DetailSection>
    </div>
  );
}

export function CorridorsBlock({ list, title }: { list: Corridor[]; title: string }) {
  if (!list.length) return null;
  return (
    <Block title={title} id={`c-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
      <ul className="flex flex-col gap-4">
        {list.map((c) => (
          <CorridorRow key={c.slug} c={c} />
        ))}
      </ul>
    </Block>
  );
}

export function OpportunitiesBlock({ list, title }: { list: Opportunity[]; title: string }) {
  if (!list.length) return null;
  return (
    <Block title={title} id="opps">
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((o) => (
          <li key={o.slug} className="flex">
            <OpportunityCard o={o} />
          </li>
        ))}
      </ul>
    </Block>
  );
}
