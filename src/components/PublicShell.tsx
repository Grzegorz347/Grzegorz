import Link from "next/link";
import { LumoLogo } from "./Logo";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/"><LumoLogo size={26} /></Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <Link href="/#features" className="hover:text-white">Funkcje</Link>
            <Link href="/drive" className="hover:text-white">Zostań kierowcą</Link>
            <Link href="/business" className="hover:text-white">Biznes</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/about" className="hover:text-white">O nas</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-outline !py-2 !px-4 text-sm">Zaloguj</Link>
            <Link href="/app" className="btn-primary !py-2 !px-4 text-sm">Aplikacja</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/5 mt-16">
        <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <LumoLogo size={22} />
            <p className="mt-3 text-white/55 max-w-xs">Ride-hailing zaprojektowany jak premium produkt, a nie jak rynek kierowców.</p>
          </div>
          <div>
            <div className="text-white/80 font-semibold mb-2">Produkt</div>
            <ul className="space-y-1.5 text-white/60">
              <li><Link href="/#features">Funkcje</Link></li>
              <li><Link href="/app/ridepass">RidePass</Link></li>
              <li><Link href="/business">Biznes</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold mb-2">Firma</div>
            <ul className="space-y-1.5 text-white/60">
              <li><Link href="/about">O nas</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/drive">Kierowcy</Link></li>
              <li><Link href="/help">Pomoc</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-semibold mb-2">Prawo</div>
            <ul className="space-y-1.5 text-white/60">
              <li>Regulamin</li><li>Polityka prywatności</li><li>Bezpieczeństwo</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 text-xs text-white/40 py-5 text-center">© 2026 Lumo Ride sp. z o.o.</div>
      </footer>
    </div>
  );
}
