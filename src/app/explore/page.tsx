import type { Metadata } from "next";
import Link from "next/link";
import { cities, countries, regionsOf, zonesOf } from "@/content/places";
import { NetworkMap } from "@/components/NetworkMap";
import { CtaBand, ListHeader } from "@/components/page";
import { Flag } from "@/components/ui";

export const metadata: Metadata = {
  title: "Network map",
  description: "Every country, state, city and corridor on elev8 on one map.",
};

export default function ExplorePage() {
  return (
    <>
      <ListHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Network map" }]}
        eyebrow="Network map"
        title="The elev8 network"
        description="Every dot is a city on the platform and every line is a corridor. Select a city on the map, or browse country by country below."
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-white p-2 ring-1 ring-neutral-200 sm:p-4">
          <NetworkMap />
        </div>

        <h2 className="mt-16 text-2xl font-semibold tracking-tight text-ink">Browse by country</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {countries.map((c) => (
            <section key={c.slug} aria-labelledby={`x-${c.slug}`} className="rounded-2xl border border-stroke-1 p-6 sm:p-8">
              <h3 id={`x-${c.slug}`} className="flex items-center gap-3 text-xl font-semibold text-ink">
                <Flag code={c.flag} className="h-5 w-7" />
                <Link href={`/countries/${c.slug}`} className="hover:text-ink/60 hover:underline">{c.name}</Link>
              </h3>
              <p className="mt-1 text-sm text-ink/60">
                {regionsOf(c.slug).length} {c.regionTermPlural.toLowerCase()} · {cities.filter((x) => x.country === c.slug).length} cities · {zonesOf(c.slug).length} ports and zones
              </p>
              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {regionsOf(c.slug).map((r) => (
                  <li key={r.slug}>
                    <Link href={`/countries/${c.slug}/${r.slug}`} className="font-medium text-ink hover:text-ink/60 hover:underline">{r.name}</Link>
                    <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      {cities
                        .filter((x) => x.country === c.slug && x.region === r.slug)
                        .map((x) => (
                          <li key={x.slug}>
                            <Link href={`/countries/${c.slug}/${r.slug}/${x.slug}`} className="text-sm text-ink/60 hover:text-ink hover:underline">{x.name}</Link>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
