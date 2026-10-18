"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon as ArrowRight, ChevronDownIcon as ChevronDown, MapIcon, Bars3Icon as Menu, ArrowsRightLeftIcon as Route, XMarkIcon as X, ArrowUpRightIcon as ArrowUpRight } from "@heroicons/react/24/outline";
import { corridors } from "@/content/corridors";
import { countries, regionsOf } from "@/content/places";
import { pillars } from "@/content/pillars";
import { audiences, site } from "@/content/site";
import { Flag, Logo, pillarIcon } from "@/components/ui";

type MenuId = "explore" | "solutions" | "audiences";

function useOutside(ref: React.RefObject<HTMLElement | null>, onOut: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && onOut();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, onOut]);
}

export function Header() {
  const [open, setOpen] = useState<MenuId | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);

  useOutside(ref, () => setOpen(null));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setOpen(null);
    setMobile(false);
  };
  const toggle = (m: MenuId) => setOpen((o) => (o === m ? null : m));
  const active = (prefixes: string[]) => prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));

  const trigger = (id: MenuId, label: string, prefixes: string[]) => (
    <button
      type="button"
      aria-expanded={open === id}
      aria-controls={`menu-${id}`}
      onClick={() => toggle(id)}
      className={`inline-flex items-center gap-1 rounded-xl px-4 py-2 text-[15px] transition hover:bg-bg-3 ${
        active(prefixes) || open === id ? "bg-bg-3 text-ink" : "text-ink/75"
      }`}
    >
      {label}
      <ChevronDown className={`size-4 transition ${open === id ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  );

  const featured = corridors.filter((c) => c.featured).slice(0, 4);

  return (
    <header ref={ref} className="sticky top-3 z-40 -mb-[5.25rem] px-3 sm:top-4 sm:px-4">
      <div className="mx-auto flex h-[4.5rem] max-w-[1290px] items-center justify-between gap-4 rounded-[20px] bg-white/90 ps-5 pe-2.5 shadow-[0_10px_40px_-16px_rgba(11,35,80,0.25)] ring-1 ring-black/5 backdrop-blur-xl">
        <Link href="/" className="shrink-0" aria-label="elev8 home" onClick={close}>
          <Logo className="h-9 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>{trigger("explore", "Explore", ["/countries", "/corridors", "/explore"])}</li>
            <li>{trigger("solutions", "Solutions", ["/solutions"])}</li>
            <li>{trigger("audiences", "Who it’s for", ["/for"])}</li>
            <li>
              <Link
                href="/opportunities"
                onClick={close}
                className={`rounded-xl px-4 py-2 text-[15px] transition hover:bg-bg-3 ${active(["/opportunities"]) ? "bg-bg-3 text-ink" : "text-ink/75"}`}
              >
                Opportunities
              </Link>
            </li>
          </ul>
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <a href={site.links.arabic} lang="ar" className="rounded-xl px-3 py-2 text-[15px] text-ink/75 hover:bg-bg-3">
            العربية
          </a>
          <a href={site.links.login} className="rounded-xl px-3 py-2 text-[15px] text-ink/75 hover:bg-bg-3">
            Log in
          </a>
          <a href={site.links.register} className="group ms-1 inline-flex items-center gap-x-3 rounded-[14px] bg-ink p-1 pe-4 text-[15px] font-medium text-white transition hover:bg-black">
            <span className="grid size-9 place-items-center rounded-[11px] bg-white text-ink transition duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </span>
            Get started
          </a>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl bg-bg-3 lg:hidden"
          aria-expanded={mobile}
          aria-controls="mobile-menu"
          aria-label={mobile ? "Close menu" : "Open menu"}
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {/* ---------------------------------------------------------- mega menus */}
      {open === "explore" && (
        <div id="menu-explore" className="absolute inset-x-0 top-[5rem] hidden px-8 lg:block">
          <div className="mx-auto grid max-w-6xl grid-cols-[1.4fr_1.2fr_1fr] gap-10 rounded-[20px] bg-white px-10 py-10 shadow-[0_20px_60px_-20px_rgba(11,35,80,0.3)] ring-1 ring-black/5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Countries</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/countries/${c.slug}`} onClick={close} className="group flex items-start gap-3">
                      <Flag code={c.flag} className="mt-1 h-4 w-6" />
                      <span>
                        <span className="block font-semibold text-neutral-900 group-hover:text-neutral-600">{c.name}</span>
                        <span className="block text-sm text-neutral-600">
                          {regionsOf(c.slug).length} {regionsOf(c.slug).length === 1 ? c.regionTerm.toLowerCase() : c.regionTermPlural.toLowerCase()}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/countries" onClick={close} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline">
                All countries <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Featured corridors</p>
              <ul className="mt-4 flex flex-col gap-3">
                {featured.map((k) => (
                  <li key={k.slug}>
                    <Link href={`/corridors/${k.slug}`} onClick={close} className="group block">
                      <span className="block font-semibold text-neutral-900 group-hover:text-neutral-600">{k.name}</span>
                      <span className="block text-sm text-neutral-600">{k.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/corridors" onClick={close} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline">
                All corridors <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/explore" onClick={close} className="group flex gap-4 rounded-2xl bg-primary-900 p-5 text-white">
                <MapIcon className="size-6 shrink-0 text-white/80" aria-hidden="true" />
                <span>
                  <span className="block font-semibold">Network map</span>
                  <span className="mt-1 block text-sm text-white/70">Every country, state, city and corridor on one map</span>
                </span>
              </Link>
              <Link href="/corridors" onClick={close} className="group flex gap-4 rounded-2xl bg-bg-3 p-5">
                <Route className="size-6 shrink-0 text-neutral-500" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-neutral-900">Find a corridor</span>
                  <span className="mt-1 block text-sm text-neutral-600">Between countries and states</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {open === "solutions" && (
        <div id="menu-solutions" className="absolute inset-x-0 top-[5rem] hidden px-8 lg:block">
          <ul className="mx-auto grid max-w-6xl grid-cols-4 gap-x-8 gap-y-6 rounded-[20px] bg-white px-10 py-10 shadow-[0_20px_60px_-20px_rgba(11,35,80,0.3)] ring-1 ring-black/5">
            {pillars.map((p) => {
              const Icon = pillarIcon[p.id];
              return (
                <li key={p.id}>
                  <Link href={`/solutions/${p.id}`} onClick={close} className="group flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-900 text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-neutral-900 group-hover:text-neutral-600">{p.name}</span>
                      <span className="block text-sm text-neutral-600">{p.outcome}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {open === "audiences" && (
        <div id="menu-audiences" className="absolute inset-x-0 top-[5rem] hidden px-8 lg:block">
          <ul className="mx-auto grid max-w-6xl grid-cols-3 gap-6 rounded-[20px] bg-white p-8 shadow-[0_20px_60px_-20px_rgba(11,35,80,0.3)] ring-1 ring-black/5">
            {audiences.map((a) => (
              <li key={a.slug}>
                <Link href={`/for/${a.slug}`} onClick={close} className="group block rounded-2xl bg-bg-3 p-6 transition hover:bg-bg-4">
                  <span className="block text-lg font-semibold text-neutral-900 group-hover:text-neutral-600">For {a.label.toLowerCase()}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-neutral-600">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------------------------------------------------------- mobile */}
      {mobile && (
        <div id="mobile-menu" className="mx-auto mt-2 max-h-[calc(100vh-7rem)] max-w-[1290px] overflow-y-auto rounded-[20px] bg-white shadow-[0_20px_60px_-20px_rgba(11,35,80,0.3)] ring-1 ring-black/5 lg:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <details className="group border-b border-neutral-100 py-2" open>
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-base font-semibold">
                Explore <ChevronDown className="size-4 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="pb-2">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/countries/${c.slug}`} onClick={close} className="flex items-center gap-3 rounded-xl px-2 py-2.5">
                      <Flag code={c.flag} /> {c.name}
                    </Link>
                  </li>
                ))}
                <li><Link href="/corridors" onClick={close} className="block rounded-xl px-2 py-2.5">Corridors</Link></li>
                <li><Link href="/explore" onClick={close} className="block rounded-xl px-2 py-2.5">Network map</Link></li>
              </ul>
            </details>
            <details className="group border-b border-neutral-100 py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-base font-semibold">
                Solutions <ChevronDown className="size-4 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="pb-2">
                {pillars.map((p) => (
                  <li key={p.id}><Link href={`/solutions/${p.id}`} onClick={close} className="block rounded-xl px-2 py-2.5">{p.name}</Link></li>
                ))}
              </ul>
            </details>
            <details className="group border-b border-neutral-100 py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-base font-semibold">
                Who it’s for <ChevronDown className="size-4 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="pb-2">
                {audiences.map((a) => (
                  <li key={a.slug}><Link href={`/for/${a.slug}`} onClick={close} className="block rounded-xl px-2 py-2.5">For {a.label.toLowerCase()}</Link></li>
                ))}
              </ul>
            </details>
            <Link href="/opportunities" onClick={close} className="block border-b border-neutral-100 py-4 text-base font-semibold">
              Opportunities
            </Link>
            <div className="mt-4 flex flex-wrap gap-2 pb-2">
              <a href={site.links.register} className="flex-1 rounded-xl bg-ink px-5 py-3 text-center text-sm font-medium text-white">Get started</a>
              <a href={site.links.login} className="flex-1 rounded-xl bg-bg-3 px-5 py-3 text-center text-sm font-medium">Log in</a>
              <a href={site.links.arabic} lang="ar" className="w-full rounded-full px-5 py-3 text-center text-sm font-medium text-neutral-700">العربية</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
