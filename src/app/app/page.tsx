"use client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { MapView } from "@/components/MapView";
import { CarArt } from "@/components/CarArt";
import { useState } from "react";

export default function HomePage() {
  const [dest, setDest] = useState("");
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      {/* Left: Commute Mode + map */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">Commute Mode</div>
            <h1 className="font-display text-4xl font-bold leading-tight">
              Dobry wieczór, <span className="gradient-text">Greg</span>
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Twoje regularne trasy są gotowe. Ceny zablokowane dzięki RidePass Silver.
            </p>
          </div>
          <div className="hidden sm:flex chip">
            <Icon.Sparkle size={12} /> AI sugeruje: Dom · 18:04
          </div>
        </div>

        {/* Commute tiles */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/app/book?to=work"
            className="card relative overflow-hidden p-5 transition hover:-translate-y-0.5"
          >
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-lumo-blue/40 to-transparent blur-2xl" />
            <div className="relative flex flex-col gap-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lumo-blue/20 ring-gradient">
                <Icon.Building size={22} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">W tym tygodniu · 4 ×</div>
                <div className="text-xl font-semibold">To Work</div>
                <div className="mt-1 text-xs text-white/55">Plac Europejski 2 · ~14 min</div>
              </div>
            </div>
          </Link>

          <Link
            href="/app/book?to=home"
            className="card relative overflow-hidden p-5 transition hover:-translate-y-0.5"
          >
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-lumo-pink/50 to-transparent blur-2xl" />
            <div className="relative flex flex-col gap-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lumo-pink/20 ring-gradient">
                <Icon.HomeSolid size={22} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50">Zwykle · 18:00</div>
                <div className="text-xl font-semibold">To Home</div>
                <div className="mt-1 text-xs text-white/55">ul. Wiślana 12 · ~17 min</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Where to */}
        <div className="card p-3">
          <div className="text-xs text-white/50 px-2 py-1">Szukasz czegoś innego?</div>
          <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] px-3 py-2.5 hairline">
            <Icon.Search size={18} />
            <input
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              placeholder="Dokąd jedziemy?"
              className="flex-1 bg-transparent outline-none placeholder:text-white/40"
            />
            <button className="h-9 w-9 grid place-items-center rounded-xl glass-hi" aria-label="Mic">
              <Icon.Mic size={16} />
            </button>
            <Link href={`/app/book?q=${encodeURIComponent(dest)}`} className="btn-primary !py-2 !px-4 text-sm">
              Szukaj
            </Link>
          </div>
        </div>

        {/* Map */}
        <MapView height={340} />

        {/* Quick chips */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="chip"><Icon.HomeSolid size={12} /> Dom · ul. Wiślana 12</button>
          <button className="chip"><Icon.Briefcase size={12} /> Biuro · Plac Europejski 2</button>
          <button className="chip"><Icon.Star size={12} /> Ulubione · Mama</button>
          <button className="chip"><Icon.Plus size={12} /> Dodaj miejsce</button>
        </div>
      </section>

      {/* Right: Ride options */}
      <aside className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Ride Options</h2>
          <Link href="/app/book" className="text-xs text-white/60 inline-flex items-center gap-1">
            Zobacz wszystkie <Icon.Arrow size={12} />
          </Link>
        </div>

        {(
          [
            { id: "economy", name: "Economy", eta: "5–7 min", price: 12.8, color: "#FF4488" },
            { id: "standard", name: "Standard", eta: "6–8 min", price: 18.5, color: "#9A5CFF" },
            { id: "xl", name: "XL", eta: "7–9 min", price: 24.9, color: "#35C3FF" },
          ] as const
        ).map((t) => (
          <Link
            key={t.id}
            href={`/app/book?tier=${t.id}`}
            className="card group relative block overflow-hidden p-4 transition hover:-translate-y-0.5"
          >
            <div
              className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full opacity-40 blur-2xl transition group-hover:opacity-70"
              style={{ background: `radial-gradient(closest-side, ${t.color}80, transparent 70%)` }}
            />
            <div className="relative flex items-center gap-4">
              <CarArt tier={t.id} className="w-40" />
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-white/50">{t.eta}</div>
                <div className="text-xl font-semibold">{t.name}</div>
                <div className="mt-1 text-lg font-semibold">
                  {t.price.toFixed(2)} <span className="text-white/60 text-sm">zł</span>
                </div>
              </div>
              <Icon.Arrow size={18} />
            </div>
          </Link>
        ))}

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-gradient shadow-glow">
              <Icon.Clock size={18} />
            </span>
            <div className="flex-1">
              <div className="text-sm text-white/60">Zaplanuj przejazd</div>
              <div className="font-semibold">Jutro · 12:00 PM · Dom → Biuro</div>
            </div>
            <button className="btn-primary !py-2 !px-4 text-sm">Schedule</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
