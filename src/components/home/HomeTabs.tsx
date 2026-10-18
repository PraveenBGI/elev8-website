"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { pillarHeadline } from "@/content/home";
import { img } from "@/content/images";
import { pillars, type PillarId } from "@/content/pillars";
import { ButtonSecondary, IconTile, pillarIcon } from "@/components/ui";

/** NextSaaS tab block: pill bar on a grey track, then image + copy panel. */
export function SolutionTabs() {
  const [id, setId] = useState<PillarId>("procurement");
  const p = pillars.find((x) => x.id === id)!;
  const pic = img(p.image);
  return (
    <div>
      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div role="tablist" aria-label="Solutions" className="mx-auto flex w-max gap-1 rounded-[18px] bg-bg-3 p-1.5 ring-1 ring-stroke-2">
          {pillars.map((x) => (
            <button
              key={x.id}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={id === x.id}
              aria-controls="solution-panel"
              onClick={() => setId(x.id)}
              className={`rounded-[13px] px-4 py-2.5 text-[15px] whitespace-nowrap transition sm:px-5 ${id === x.id ? "bg-ink text-white shadow-sm" : "text-ink/65 hover:bg-white hover:text-ink"}`}
            >
              {x.name}
            </button>
          ))}
        </div>
      </div>

      <div id="solution-panel" role="tabpanel" aria-labelledby={`tab-${id}`} className="mt-8 grid gap-2 rounded-[28px] bg-bg-3 p-2 lg:grid-cols-2">
        <div key={pic.src} className="rise relative aspect-[4/3] overflow-hidden rounded-[22px] bg-bg-4 lg:aspect-auto lg:min-h-[30rem]">
          <Image src={pic.src} alt={pic.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div key={p.id} className="rise flex flex-col justify-center rounded-[22px] bg-white p-7 sm:p-10 lg:p-14">
          <IconTile icon={pillarIcon[p.id]} />
          <p className="mt-8 text-[15px] text-ink/50">{p.name}</p>
          <h3 className="mt-2 text-3xl font-normal tracking-[-0.02em] text-ink sm:text-h4">{pillarHeadline[p.id]}</h3>
          <p className="mt-4 text-lg text-ink/60">{p.intro}</p>
          <ul className="mt-8 flex flex-col gap-3.5">
            {p.actions.map((a) => (
              <li key={a} className="flex items-start gap-3 text-ink/80">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-500 text-white">
                  <CheckIcon className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {a}
              </li>
            ))}
          </ul>
          <ButtonSecondary href={`/solutions/${p.id}`} className="mt-10">
            Explore {p.name}
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
