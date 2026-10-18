import Image from "next/image";
import Link from "next/link";
import { ArrowLongRightIcon, ArrowsRightLeftIcon, BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { isCityCorridor, refContext, refHref, refName, type Corridor, type PlaceRef } from "@/content/corridors";
import { img, type FlagCode, type ImageName } from "@/content/images";
import type { Opportunity } from "@/content/opportunities";
import { countryBySlug } from "@/content/places";
import type { Pillar } from "@/content/pillars";
import { Badge, Divider, Flag, PillarTag } from "@/components/ui";

/** Category card (Chisfis card-category-3): tall image, name and one line below. */
export function PlaceCard({
  href,
  image,
  title,
  subtitle,
  flag,
  badge,
  aspect = "aspect-[5/6]",
}: {
  href: string;
  image: ImageName;
  title: string;
  subtitle?: string;
  flag?: FlagCode;
  badge?: string;
  aspect?: string;
}) {
  const pic = img(image);
  return (
    <div className="group relative flex flex-col">
      <div className={`relative w-full ${aspect} overflow-hidden rounded-[22px] bg-bg-3`}>
        <Image src={pic.src} alt={pic.alt} fill sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
        {badge && <span className="absolute start-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink shadow-sm">{badge}</span>}
      </div>
      <div className="mt-4">
        <h3 className="flex items-center gap-2 text-base font-medium text-ink">
          {flag && <Flag code={flag} />}
          <Link href={href} className="after:absolute after:inset-0">
            <span className="line-clamp-1">{title}</span>
          </Link>
        </h3>
        {subtitle && <span className="mt-1.5 line-clamp-2 block text-sm text-ink/60">{subtitle}</span>}
      </div>
    </div>
  );
}

/** Solution card: image, name, outcome. */
export function PillarCard({ p }: { p: Pillar }) {
  return <PlaceCard href={`/solutions/${p.id}`} image={p.image} title={p.name} subtitle={p.outcome} aspect="aspect-[4/3]" />;
}

export function StopChip({ s, invert = false }: { s: PlaceRef; invert?: boolean }) {
  const country = countryBySlug(s.c)!;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${invert ? "bg-white/95 text-ink" : "bg-neutral-100 text-ink"}`}>
      <Flag code={country.flag} />
      <span className="font-medium">{refName(s)}</span>
      <span className="text-ink/60">{refContext(s).split(",")[0]}</span>
    </span>
  );
}

export function StopChain({ c, invert = false }: { c: Corridor; invert?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {c.stops.map((s, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 &&
            (c.kind === "bilateral" ? (
              <ArrowsRightLeftIcon className={`size-4 ${invert ? "text-white" : "text-neutral-400"}`} aria-hidden="true" />
            ) : (
              <ArrowLongRightIcon className={`size-4 ${invert ? "text-white" : "text-neutral-400"} rtl:rotate-180`} aria-hidden="true" />
            ))}
          <StopChip s={s} invert={invert} />
        </span>
      ))}
    </div>
  );
}

/** Corridor card in the style of the Chisfis stay card. */
export function CorridorCard({ c }: { c: Corridor }) {
  const pic = img(c.image);
  return (
    <div className="group relative">
      <div className="relative w-full overflow-hidden rounded-[22px]">
        <div className="relative aspect-[12/11] bg-neutral-100">
          <Image src={pic.src} alt={pic.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 rounded-b-[22px] bg-gradient-to-t from-neutral-900 opacity-50" aria-hidden="true" />
        <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
          {c.agreement && <span className="rounded-full border border-red-100 bg-red-50 px-3 py-0.5 text-xs font-medium text-red-700">{c.agreement}</span>}
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <span className="text-sm text-ink/60">
            {c.scope === "international" ? "International" : "Domestic"} · {c.kind === "bilateral" ? "Two-way" : `${c.stops.length}-stop route`}
            {isCityCorridor(c) ? " · Investment and trade" : ""}
          </span>
          <h3 className="text-lg font-normal text-ink">
            <Link href={`/corridors/${c.slug}`} className="after:absolute after:inset-0">
              {c.name}
            </Link>
          </h3>
          <div className="flex items-center gap-x-1.5 text-sm text-ink/60">
            <MapPinIcon className="size-4 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{c.stops.map((s) => countryBySlug(s.c)!.name).filter((v, i, arr) => arr.indexOf(v) === i).join(" · ")}</span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-wrap gap-1.5">
          {c.pillars.map((p) => (
            <PillarTag key={p} id={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Horizontal corridor row for lists. */
export function CorridorRow({ c }: { c: Corridor }) {
  const pic = img(c.image);
  return (
    <li className="group relative flex flex-col gap-5 rounded-[22px] bg-bg-3 p-2 ring-1 ring-stroke-2 transition hover:bg-white hover:shadow-[0_20px_50px_-24px_rgba(11,35,80,0.35)] sm:flex-row sm:items-center">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[16px] bg-bg-4 sm:aspect-square sm:w-40">
        <Image src={pic.src} alt={pic.alt} fill sizes="160px" className="object-cover" />
      </div>
      <div className="flex grow flex-col gap-3 px-2 pb-2 sm:px-0 sm:pb-0 sm:pe-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-ink/60">
          <span>{c.scope === "international" ? "International" : "Domestic"}</span>
          {c.agreement && <Badge tone="red">{c.agreement}</Badge>}
          {isCityCorridor(c) && <Badge tone="green">Investment and trade</Badge>}
        </div>
        <h3 className="text-h6 font-normal text-ink">
          <Link href={`/corridors/${c.slug}`} className="after:absolute after:inset-0">
            {c.name}
          </Link>
        </h3>
        <StopChain c={c} />
        <div className="flex flex-wrap gap-1.5">
          {c.pillars.map((p) => (
            <PillarTag key={p} id={p} />
          ))}
        </div>
      </div>
      <ArrowLongRightIcon className="me-4 hidden size-6 shrink-0 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-ink sm:block rtl:rotate-180" aria-hidden="true" />
    </li>
  );
}

/** Opportunity card, stay-card layout. */
export function OpportunityCard({ o }: { o: Opportunity }) {
  const image = img(o.image);
  const href = o.corridor ? `/corridors/${o.corridor}` : refHref(o.place);
  const country = countryBySlug(o.place.c)!;
  return (
    <div className="group relative flex h-full w-full flex-col">
      <div className="relative overflow-hidden rounded-[22px]">
        <div className="relative aspect-[12/11] bg-neutral-100">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-900 opacity-50" aria-hidden="true" />
        <div className="absolute start-3 top-3">
          <PillarTag id={o.pillar} />
        </div>
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-sm text-ink/60">
          <BriefcaseIcon className="size-4" aria-hidden="true" />
          {o.sector}
        </span>
        <h3 className="text-lg font-normal text-ink">
          <Link href={href} className="after:absolute after:inset-0">
            {o.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink/60">{o.text}</p>
        <div className="mt-auto flex items-center gap-x-1.5 pt-1 text-sm text-ink/60">
          <Flag code={country.flag} />
          <span className="line-clamp-1">
            {refName(o.place)}
            {o.place.r ? `, ${country.name}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
