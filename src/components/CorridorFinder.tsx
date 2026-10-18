"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLongRightIcon, ArrowsRightLeftIcon, MagnifyingGlassIcon, MapPinIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { findCorridors, parseRefKey, refName, type PlaceRef } from "@/content/corridors";
import { countries, regions } from "@/content/places";
import { site } from "@/content/site";

/** One field of the Chisfis hero search bar: big outline icon, bold label, quiet hint. */
function PlaceField({ id, label, value, onChange, placeholder, icon: Icon }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder: string; icon: typeof MapPinIcon }) {
  return (
    <div className="relative flex flex-1 items-center gap-x-3 rounded-full px-5 py-4 transition focus-within:bg-neutral-100 hover:bg-neutral-50 md:px-7 md:py-5">
      <Icon className="size-6 shrink-0 text-neutral-300 lg:size-7" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none truncate bg-transparent text-base font-semibold text-ink focus:outline-none xl:text-lg"
        >
          <option value="">{placeholder}</option>
          {countries.map((c) => (
            <optgroup key={c.slug} label={c.name}>
              <option value={c.slug}>{c.name} (whole country)</option>
              {regions
                .filter((r) => r.country === c.slug)
                .map((r) => (
                  <option key={r.slug} value={`${c.slug}/${r.slug}`}>
                    {"  "}
                    {r.name} ({c.regionTerm.toLowerCase()})
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <label htmlFor={id} className="mt-0.5 block text-sm font-light text-neutral-400">
          {label}
        </label>
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  { from: "india/tamil-nadu", to: "oman/north-batinah" },
  { from: "india/karnataka", to: "oman/muscat" },
  { from: "united-kingdom/scotland", to: "oman/al-wusta" },
  { from: "tanzania/zanzibar", to: "oman" },
];

export function CorridorFinder() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fromRef: PlaceRef | undefined = from ? parseRefKey(from) : undefined;
  const toRef: PlaceRef | undefined = to ? parseRefKey(to) : undefined;
  const results = useMemo(() => (fromRef || toRef ? findCorridors(fromRef ?? toRef, fromRef ? toRef : undefined) : []), [fromRef, toRef]);
  const searched = Boolean(from || to);

  return (
    <div className="w-full">
      <form
        role="search"
        aria-label="Find a corridor"
        onSubmit={(e) => e.preventDefault()}
        className="relative flex flex-col gap-1 rounded-3xl bg-white p-2 shadow-xl ring-1 ring-black/5 md:flex-row md:items-center md:gap-0 md:rounded-full"
      >
        <PlaceField id="finder-from" label="Trading or investing from" value={from} onChange={setFrom} placeholder="Country or state" icon={MapPinIcon} />
        <div className="relative flex items-center justify-center md:h-10">
          <span className="absolute inset-x-6 h-px bg-neutral-200 md:inset-x-auto md:inset-y-0 md:h-full md:w-px" aria-hidden="true" />
          <button
            type="button"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            className="relative grid size-9 place-items-center rounded-full bg-white text-ink/60 ring-1 ring-neutral-200 transition hover:text-ink hover:ring-neutral-400"
            aria-label="Swap from and to"
          >
            <ArrowsRightLeftIcon className="size-4 rotate-90 md:rotate-0" aria-hidden="true" />
          </button>
        </div>
        <PlaceField id="finder-to" label="Destination" value={to} onChange={setTo} placeholder="Anywhere" icon={MapPinIcon} />
        <span className="m-2 flex h-12 items-center justify-center gap-2 rounded-full bg-primary-600 px-6 text-white md:m-0 md:me-2 md:size-16 md:shrink-0 md:px-0" aria-hidden="true">
          <MagnifyingGlassIcon className="size-5 md:size-6" strokeWidth={2} />
          <span className="font-medium md:hidden">Find corridors</span>
        </span>
      </form>

      <div className="mt-4 px-2" aria-live="polite">
        {!searched && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm text-ink/60">
              <SparklesIcon className="size-4" aria-hidden="true" /> Popular:
            </span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s.from + s.to}
                type="button"
                onClick={() => {
                  setFrom(s.from);
                  setTo(s.to);
                }}
                className="rounded-full border border-stroke-1 bg-white/80 px-3.5 py-1.5 text-sm text-ink/75 backdrop-blur transition hover:border-neutral-400 hover:text-ink"
              >
                {refName(parseRefKey(s.from))} <span className="text-neutral-400">to</span> {refName(parseRefKey(s.to))}
              </button>
            ))}
          </div>
        )}

        {searched && results.length > 0 && (
          <div className="rounded-3xl bg-white p-4 shadow-lg ring-1 ring-black/5 sm:p-5">
            <p className="text-sm text-ink/60">
              {results.length} {results.length === 1 ? "corridor" : "corridors"}
              {fromRef && <> from <strong className="font-semibold text-ink">{refName(fromRef)}</strong></>}
              {toRef && <> to <strong className="font-semibold text-ink">{refName(toRef)}</strong></>}
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {results.slice(0, 4).map((k) => (
                <li key={k.slug}>
                  <Link href={`/corridors/${k.slug}`} className="group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition hover:bg-neutral-100">
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-ink">{k.name}</span>
                      <span className="block truncate text-sm text-ink/60">{k.moves.slice(0, 2).join(" · ")}</span>
                    </span>
                    <ArrowLongRightIcon className="size-5 shrink-0 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-ink rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            {results.length > 4 && (
              <Link href="/corridors" className="mt-3 inline-block px-4 text-sm font-medium text-ink underline underline-offset-4">
                See all {results.length} corridors
              </Link>
            )}
          </div>
        )}

        {searched && results.length === 0 && (
          <div className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-lg ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="flex items-start gap-2 text-sm text-ink/60">
              <MapPinIcon className="mt-0.5 size-5 shrink-0 text-neutral-400" aria-hidden="true" />
              <span>
                No corridor between {fromRef ? refName(fromRef) : "these places"}
                {toRef ? ` and ${refName(toRef)}` : ""} yet. Register and tell us you want it: corridors open where demand is.
              </span>
            </p>
            <a href={site.links.register} className="shrink-0 rounded-full bg-neutral-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-neutral-700">
              Register interest
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
