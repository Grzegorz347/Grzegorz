import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";

export default function NotFound() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-2xl px-6 py-24 text-center space-y-6">
        <div className="font-display text-[9rem] leading-none font-extrabold gradient-text">404</div>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold">
          Ten przejazd nie istnieje.
        </h1>
        <p className="text-white/60">
          Strona, której szukasz, pojechała w inne miasto. Wróć na mapę.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Strona główna</Link>
          <Link href="/app" className="btn-outline">Otwórz aplikację</Link>
        </div>
      </section>
    </PublicShell>
  );
}
