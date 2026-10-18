import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { finalCta } from "@/content/home";
import { img, type ImageName } from "@/content/images";
import { site } from "@/content/site";
import { Breadcrumbs, ButtonGlass, Tagline, ButtonPrimary, ButtonSecondary } from "@/components/ui";

/** Soft colour blobs behind headers (Chisfis "BgGlassmorphism"). */
export function Glow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex overflow-hidden opacity-60">
      <span className="block size-96 -translate-x-1/3 rounded-full bg-primary-500/10 blur-3xl lg:size-[32rem]" />
      <span className="mt-40 -ms-20 block size-96 rounded-full bg-accent-500/10 blur-3xl lg:size-[32rem]" />
      <span className="-ms-20 block size-96 rounded-full bg-sky-400/10 blur-3xl lg:size-[32rem]" />
    </div>
  );
}

/**
 * Detail page header in the Chisfis listing style: breadcrumb, title and meta,
 * actions on the right, then a photo gallery (one large, up to four small).
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  subtitle,
  image,
  gallery = [],
  children,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow?: React.ReactNode;
  title: string;
  subtitle?: string;
  image: ImageName;
  gallery?: ImageName[];
  children?: React.ReactNode;
}) {
  const pics = [image, ...gallery.filter((g) => g !== image)].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5).map(img);
  const [main, ...rest] = pics;
  return (
    <section className="relative">
      <Glow />
      <div className="mx-auto max-w-[1290px] px-4 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow && <div className="text-sm text-neutral-500">{eyebrow}</div>}
            <h1 className="mt-3 text-4xl font-normal tracking-[-0.03em] text-ink sm:text-6xl">{title}</h1>
            {subtitle && <p className="mt-4 text-lg text-ink/60 sm:text-xl">{subtitle}</p>}
          </div>
          {children && <div className="flex shrink-0 flex-wrap items-center gap-3">{children}</div>}
        </div>

        <div className={`mt-8 grid gap-2 ${rest.length ? "grid-cols-2 sm:grid-cols-4 sm:grid-rows-2" : ""}`}>
          <div className={`relative overflow-hidden rounded-[22px] bg-bg-3 ${rest.length ? "col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[26rem]" : "aspect-[21/9]"}`}>
            <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
          {rest.map((p, i) => (
            <div key={p.src} className={`relative aspect-[4/3] overflow-hidden rounded-[22px] bg-bg-3 sm:aspect-auto ${i > 1 ? "hidden sm:block" : ""} ${rest.length < 3 ? "sm:col-span-2" : ""} ${rest.length === 1 ? "sm:row-span-2" : ""}`}>
              <Image src={p.src} alt={p.alt} fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Category-page header: large title and description over a soft glow. */
export function ListHeader({ crumbs, eyebrow, title, description, children }: { crumbs: { label: string; href?: string }[]; eyebrow?: string; title: string; description?: string; children?: React.ReactNode }) {
  return (
    <section className="relative">
      <Glow />
      <div className="mx-auto max-w-[1290px] px-4 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 max-w-3xl">
          {eyebrow && <Tagline>{eyebrow}</Tagline>}
          <h1 className="mt-6 text-4xl font-normal tracking-[-0.035em] text-ink sm:text-7xl/[1.05]">{title}</h1>
          {description && <p className="mt-6 text-lg text-ink/60 sm:text-xl">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** A page section with a heading, used for card grids. */
export function Block({ title, children, id, aside, description }: { title: string; children: React.ReactNode; id: string; aside?: React.ReactNode; description?: string }) {
  return (
    <section aria-labelledby={id} className="mt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 id={id} className="text-3xl font-normal tracking-[-0.02em] text-ink sm:text-h4">{title}</h2>
          {description && <p className="mt-2 text-ink/60">{description}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

/** Bordered content box (Chisfis listingSection). */
export function DetailSection({ title, description, children, id }: { title: string; description?: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-y-6 rounded-[22px] bg-bg-3 p-5 ring-1 ring-stroke-2 sm:gap-y-8 sm:p-9">
      <div>
        <h2 id={id} className="text-h5 font-normal text-ink sm:text-[1.75rem]">{title}</h2>
        {description && <p className="mt-2 text-ink/60">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-s border-neutral-200 ps-5">
      <dt className="text-sm text-neutral-500">{label}</dt>
      <dd className="text-lg font-semibold text-neutral-900">{value}</dd>
    </div>
  );
}

export function HeroButton({ href = site.links.register, children }: { href?: string; children: React.ReactNode }) {
  return <ButtonPrimary href={href}>{children}</ButtonPrimary>;
}

/** Closing call to action: the inset gradient panel used across the site. */
export function CtaBand({ title = finalCta.title, text = finalCta.text, label = finalCta.cta, href = site.links.register }: { title?: string; text?: string; image?: ImageName; label?: string; href?: string }) {
  return (
    <section aria-labelledby="cta-title" className="mt-24 px-2 pb-2 lg:mt-32">
      <div className="panel-deep overflow-hidden rounded-3xl md:rounded-[40px] xl:rounded-[56px]">
        <div className="mx-auto max-w-[1290px] px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <h2 id="cta-title" className="mx-auto max-w-4xl whitespace-pre-line text-4xl font-normal tracking-[-0.03em] text-white sm:text-6xl/[1.08]">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">{text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonSecondary href={href}>{label}</ButtonSecondary>
            <ButtonGlass href={site.links.briefing}>{finalCta.secondary}</ButtonGlass>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Simple list with check icons (Chisfis amenities style). */
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-5 text-ink/80 sm:grid-cols-2">
      {items.map((a) => (
        <li key={a} className="flex items-start gap-x-3">
          <CheckCircleIcon className="mt-0.5 size-6 shrink-0 text-accent-500" aria-hidden="true" />
          <span>{a}</span>
        </li>
      ))}
    </ul>
  );
}
