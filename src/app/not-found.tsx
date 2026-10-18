import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary-600">Page not found</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">We couldn’t find that page</h1>
      <p className="mt-4 text-lg text-ink/60">It may have moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700">Home</Link>
        <Link href="/corridors" className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-ink">Corridors</Link>
        <Link href="/countries" className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-ink">Countries</Link>
      </div>
    </section>
  );
}
