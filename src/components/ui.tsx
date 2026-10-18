/**
 * Shared building blocks in the NextSaaS design language:
 * Inter Tight, near-black ink, cool grey surfaces, rounded-[20px] cards,
 * icon-tile buttons. Icons are Heroicons outline.
 */
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  SunIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { flag, type FlagCode } from "@/content/images";
import { pillarName, type PillarId } from "@/content/pillars";

type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export const pillarIcon: Record<PillarId, Icon> = {
  governance: BuildingLibraryIcon,
  procurement: ClipboardDocumentListIcon,
  b2b: UserGroupIcon,
  import: ArrowDownTrayIcon,
  export: ArrowUpTrayIcon,
  investment: ChartBarIcon,
  sustainability: SunIcon,
  icv: WrenchScrewdriverIcon,
};

/** Soft pill badge colours (Chisfis style: tinted background, darker text). */
export const tones = {
  neutral: "bg-neutral-600/10 text-neutral-700",
  blue: "bg-blue-500/15 text-blue-800",
  green: "bg-green-500/15 text-green-800",
  indigo: "bg-indigo-500/15 text-indigo-800",
  sky: "bg-sky-500/15 text-sky-800",
  amber: "bg-amber-400/20 text-amber-900",
  emerald: "bg-emerald-500/15 text-emerald-800",
  lime: "bg-lime-500/20 text-lime-900",
  orange: "bg-orange-500/15 text-orange-900",
  red: "bg-red-500/15 text-red-800",
} as const;

export const pillarTone: Record<PillarId, string> = {
  governance: tones.neutral,
  procurement: tones.blue,
  b2b: tones.indigo,
  import: tones.sky,
  export: tones.amber,
  investment: tones.emerald,
  sustainability: tones.lime,
  icv: tones.orange,
};

export function Badge({ children, tone = "neutral", className = "" }: { children: React.ReactNode; tone?: keyof typeof tones; className?: string }) {
  return <span className={`inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-0.5 text-xs/5 font-medium ${tones[tone]} ${className}`}>{children}</span>;
}

export function PillarTag({ id, link = false }: { id: PillarId; link?: boolean }) {
  const cls = "inline-flex items-center rounded-full bg-bg-3 px-2.5 py-0.5 text-xs/5 font-medium text-ink/75 ring-1 ring-stroke-2";
  return link ? (
    <Link href={`/solutions/${id}`} className={`${cls} relative z-10 hover:opacity-80`}>
      {pillarName(id)}
    </Link>
  ) : (
    <span className={cls}>{pillarName(id)}</span>
  );
}

export function Flag({ code, className = "h-3.5 w-5" }: { code: FlagCode; className?: string }) {
  return <Image src={flag(code)} alt="" width={20} height={14} className={`${className} shrink-0 rounded-[3px] object-cover ring-1 ring-black/5`} />;
}

/**
 * NextSaaS-style button: a rounded box with a small square icon tile and a label.
 * dark = near-black with a white tile, light = white with a black tile.
 */
function Btn({ href, children, className = "", tone }: { href: string; children: React.ReactNode; className?: string; tone: "dark" | "light" | "glass" }) {
  const box = {
    dark: "bg-ink text-white hover:bg-black",
    light: "bg-white text-ink ring-1 ring-stroke-1 hover:ring-neutral-300",
    glass: "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/15",
  }[tone];
  const tile = { dark: "bg-white text-ink", light: "bg-ink text-white", glass: "bg-white text-ink" }[tone];
  const cls = `group inline-flex w-fit items-center gap-x-3.5 rounded-2xl p-1 pe-5 text-[15px] font-medium transition ${box} ${className}`;
  const inner = (
    <>
      <span className={`grid size-10 shrink-0 place-items-center rounded-[13px] transition duration-500 group-hover:rotate-45 ${tile}`}>
        <ArrowUpRightIcon className="size-4" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="first-letter:uppercase">{children}</span>
    </>
  );
  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} className={cls}>{inner}</Link>
  ) : (
    <a href={href} className={cls}>{inner}</a>
  );
}

export const ButtonPrimary = (p: { href: string; children: React.ReactNode; className?: string }) => <Btn {...p} tone="dark" />;
export const ButtonSecondary = (p: { href: string; children: React.ReactNode; className?: string }) => <Btn {...p} tone="light" />;
export const ButtonGlass = (p: { href: string; children: React.ReactNode; className?: string }) => <Btn {...p} tone="glass" />;

/** Small pill label above a heading. */
export function Tagline({ children, invert = false }: { children: React.ReactNode; invert?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${invert ? "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur" : "bg-white text-ink/70 ring-1 ring-stroke-1"}`}>
      <span className={`size-1.5 rounded-full ${invert ? "bg-accent-100" : "bg-accent-500"}`} aria-hidden="true" />
      {children}
    </span>
  );
}

/** Section heading: light, large and calm, in the NextSaaS rhythm. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  id,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  id?: string;
  invert?: boolean;
}) {
  const center = align === "center";
  return (
    <div className={`relative max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Tagline invert={invert}>{eyebrow}</Tagline>}
      <h2 id={id} className={`${eyebrow ? "mt-5" : ""} text-4xl font-normal tracking-[-0.02em] text-balance sm:text-h3 lg:text-h2 ${invert ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && <p className={`mt-4 text-lg text-pretty ${center ? "mx-auto max-w-2xl" : "max-w-2xl"} ${invert ? "text-white/75" : "text-ink/60"}`}>{description}</p>}
    </div>
  );
}

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <Image src="/brand/elev8-framework-logo.png" alt="elev8 framework" width={1658} height={738} priority className={className} />;
}

export function Breadcrumbs({ items, invert = false }: { items: { label: string; href?: string }[]; invert?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${invert ? "text-white/70" : "text-neutral-500"}`}>
        {items.map((it, i) => (
          <li key={it.label + i} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRightIcon className="size-3.5 opacity-60 rtl:rotate-180" aria-hidden="true" />}
            {it.href ? (
              <Link href={it.href} className="hover:text-neutral-900 hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className={invert ? "text-white" : "text-neutral-900"}>
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Sources({ items }: { items: { label: string; url: string }[] }) {
  const unique = items.filter((s, i) => items.findIndex((x) => x.url === s.url) === i);
  if (!unique.length) return null;
  return (
    <div className="mt-16 border-t border-neutral-200 pt-6">
      <h2 className="text-sm font-medium text-neutral-900">Sources</h2>
      <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-500">
        {unique.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 hover:underline">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex shrink-0 items-center gap-x-1.5 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline sm:text-base">
      {children}
      <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" aria-hidden="true" />
    </Link>
  );
}

/** Thin divider used inside detail sections (Chisfis "w-14 border-b"). */
export const Divider = () => <div className="w-14 border-b border-stroke-1" />;

/** Rounded icon tile in elev8 navy, as on NextSaaS feature cards. */
export function IconTile({ icon: I, className = "" }: { icon: Icon; className?: string }) {
  return (
    <span className={`grid size-12 shrink-0 place-items-center rounded-xl bg-primary-900 text-white ${className}`}>
      <I className="size-6" aria-hidden="true" />
    </span>
  );
}
