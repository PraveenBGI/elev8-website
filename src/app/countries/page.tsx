import type { Metadata } from "next";
import { countries, citiesOf, regionsOf } from "@/content/places";
import { PlaceCard } from "@/components/cards";
import { CtaBand, ListHeader } from "@/components/page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Countries",
  description: "elev8 is built for every country, down to state level. Explore the first countries on the network, their states, regions and cities.",
};

export default function CountriesPage() {
  return (
    <>
      <ListHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Countries" }]}
        eyebrow="Countries"
        title="Every country. State by state."
        description="elev8 works the same way in any country: national rules, then each state with its own strengths. These are the first countries on the network, with more joining. For investors and traders, we also show the cities, ports and zones that matter."
      />
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {countries.map((c) => {
            const rs = regionsOf(c.slug);
            return (
              <li key={c.slug}>
                <PlaceCard
                  href={`/countries/${c.slug}`}
                  image={c.image}
                  title={c.name}
                  flag={c.flag}
                  aspect="aspect-[4/5]"
                  badge={`${rs.length} ${rs.length === 1 ? c.regionTerm.toLowerCase() : c.regionTermPlural.toLowerCase()} · ${citiesOf(c.slug).length} cities`}
                  subtitle={c.summary}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <CtaBand title={"Your country,\nnext."} text="elev8 grows country by country. Governments can bring it home, and businesses can register today and be ready as new markets join." label="Bring elev8 to your country" href={site.links.briefing} />
    </>
  );
}
