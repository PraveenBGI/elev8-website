import Link from "next/link";
import { countries } from "@/content/places";
import { pillars } from "@/content/pillars";
import { audiences, site } from "@/content/site";
import { Logo } from "@/components/ui";

const columns = [
  { title: "Explore", links: [{ label: "Network map", href: "/explore" }, { label: "Corridors", href: "/corridors" }, { label: "Opportunities", href: "/opportunities" }, ...countries.map((c) => ({ label: c.name, href: `/countries/${c.slug}` }))] },
  { title: "Solutions", links: pillars.map((p) => ({ label: p.name, href: `/solutions/${p.id}` })) },
  { title: "Who it’s for", links: audiences.map((a) => ({ label: `For ${a.label.toLowerCase()}`, href: `/for/${a.slug}` })) },
  { title: "Platform", links: [{ label: "How it works", href: "/#how" }, { label: "gatewAI", href: "/#gatewai" }, { label: "Register", href: site.links.register }, { label: "Log in", href: site.links.login }] },
];

export function Footer() {
  return (
    <footer className="px-2 pb-2">
      <div className="rounded-3xl bg-bg-3 lg:rounded-[56px]">
        <div className="mx-auto grid max-w-[1290px] gap-12 px-6 pb-12 pt-16 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-10 lg:pt-24">
          <div>
            <Logo className="h-11 w-auto" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ink/60">One verified profile for trade, procurement and investment, across countries and their states.</p>
            <a href={site.links.register} className="mt-8 inline-flex items-center rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-black">
              Get started
            </a>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[15px] font-medium text-ink">{col.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") || l.href.startsWith("mailto") ? (
                      <a href={l.href} className="text-[15px] text-ink/60 transition hover:text-ink">{l.label}</a>
                    ) : (
                      <Link href={l.href} className="text-[15px] text-ink/60 transition hover:text-ink">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mx-auto max-w-[1290px] px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stroke-1 py-8 text-sm text-ink/50">
            <span>© 2026 elev8. All rights reserved.</span>
            <span>Governance · Procurement · B2B · Import · Export · Investment · Sustainability · ICV</span>
          </div>
        </div>
        {/* oversized wordmark, as in the theme's footer */}
        <p aria-hidden="true" className="select-none overflow-hidden px-6 text-center text-[22vw] font-medium leading-[0.8] tracking-[-0.06em] text-white lg:text-[16rem]">
          elev8
        </p>
      </div>
    </footer>
  );
}
