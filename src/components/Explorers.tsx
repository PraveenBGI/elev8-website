"use client";

import { useState } from "react";
import { corridors, corridorsTouching, type Corridor } from "@/content/corridors";
import { opportunities } from "@/content/opportunities";
import { countries, type CountrySlug } from "@/content/places";
import { pillars, type PillarId } from "@/content/pillars";
import { CorridorRow, OpportunityCard } from "@/components/cards";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2.5 text-sm leading-none font-medium whitespace-nowrap transition sm:px-5 ${active ? "bg-ink text-white" : "border border-stroke-1 text-ink/60 hover:border-neutral-400 hover:text-ink"}`}
    >
      {children}
    </button>
  );
}

function CountrySelect({ value, onChange }: { value: string; onChange: (v: CountrySlug | "") => void }) {
  return (
    <label className="flex shrink-0 items-center gap-3 text-sm text-ink/60">
      Country
      <select value={value} onChange={(e) => onChange(e.target.value as CountrySlug | "")} className="cursor-pointer rounded-full border border-stroke-1 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:border-neutral-400">
        <option value="">All countries</option>
        {countries.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
    </label>
  );
}

function PillarChips({ value, onChange }: { value: "all" | PillarId; onChange: (v: "all" | PillarId) => void }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by solution">
      <Chip active={value === "all"} onClick={() => onChange("all")}>All solutions</Chip>
      {pillars.map((p) => (
        <Chip key={p.id} active={value === p.id} onClick={() => onChange(p.id)}>{p.name}</Chip>
      ))}
    </div>
  );
}

export function CorridorExplorer() {
  const [scope, setScope] = useState<"all" | Corridor["scope"]>("all");
  const [c, setCountry] = useState<CountrySlug | "">("");
  const [pillar, setPillar] = useState<"all" | PillarId>("all");
  const pool = c ? corridorsTouching({ c }) : corridors;
  const visible = pool.filter((k) => (scope === "all" || k.scope === scope) && (pillar === "all" || k.pillars.includes(pillar)));

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Corridor type">
            {(["all", "international", "domestic"] as const).map((s) => (
              <Chip key={s} active={scope === s} onClick={() => setScope(s)}>
                {s === "all" ? "All corridors" : s === "international" ? "International" : "Domestic"}
              </Chip>
            ))}
          </div>
          <CountrySelect value={c} onChange={setCountry} />
        </div>
        <PillarChips value={pillar} onChange={setPillar} />
      </div>
      <p className="mt-6 text-sm text-ink/60" aria-live="polite">
        {visible.length} {visible.length === 1 ? "corridor" : "corridors"}
        {c && ` touching ${countries.find((x) => x.slug === c)!.name}`}
      </p>
      <ul className="mt-4 flex flex-col gap-4">
        {visible.map((k) => (
          <CorridorRow key={k.slug} c={k} />
        ))}
      </ul>
    </div>
  );
}

export function OpportunityExplorer() {
  const [pillar, setPillar] = useState<"all" | PillarId>("all");
  const [country, setCountry] = useState<CountrySlug | "">("");
  const visible = opportunities.filter((o) => (pillar === "all" || o.pillar === pillar) && (!country || o.place.c === country));

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PillarChips value={pillar} onChange={setPillar} />
        <CountrySelect value={country} onChange={setCountry} />
      </div>
      <p className="mt-6 text-sm text-ink/60" aria-live="polite">
        {visible.length} {visible.length === 1 ? "opportunity area" : "opportunity areas"}
      </p>
      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((o) => (
            <li key={o.slug} className="flex">
              <OpportunityCard o={o} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-neutral-300 p-8 text-ink/60">Nothing matches these filters yet. Try another solution or country.</p>
      )}
    </div>
  );
}
