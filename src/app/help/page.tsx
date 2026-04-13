"use client";
import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";
import { Icon } from "@/components/icons";

const FAQ = [
  { q: "Jak działa Price Lock?", a: "Subskrypcja RidePass zamraża cenę, nawet gdy surge wchodzi 2×. Masz 20–200 blokad w miesiącu w zależności od tieru." },
  { q: "Czy mogę anulować przejazd bez opłaty?", a: "Tak — w pierwszych 3 min. Później może zostać naliczone 3 zł, jeśli kierowca jest bliżej niż 2 min." },
  { q: "Jak działa SOS?", a: "Przytrzymaj przycisk 1.5s. Dzwonimy do dyspozytora i opcjonalnie 112, udostępniamy lokalizację Trusted Contacts." },
  { q: "Czy Lumo działa poza Polską?", a: "Tak — w 14 miastach Europy. Wschód Azji w 2027." },
  { q: "Dlaczego Lumo jest tańsze w szczycie?", a: "Dlatego, że Price Lock przenosi ryzyko surge'u z Ciebie na nas." },
];

export default function Help() {
  const [q, setQ] = useState("");
  const filtered = FAQ.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));
  return (
    <PublicShell>
      <section className="mx-auto max-w-3xl px-6 py-20 space-y-8">
        <h1 className="font-display text-5xl font-extrabold">Pomoc</h1>
        <div className="flex items-center gap-2 rounded-2xl glass-hi px-4 py-3 ring-gradient">
          <Icon.Search size={16} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Czego szukasz?" className="flex-1 bg-transparent outline-none" />
        </div>
        <div className="space-y-3">
          {filtered.map((f) => (
            <details key={f.q} className="card p-5 group">
              <summary className="cursor-pointer list-none flex items-center gap-3">
                <span className="font-semibold flex-1">{f.q}</span>
                <Icon.Plus size={16} className="group-open:rotate-45 transition" />
              </summary>
              <div className="mt-3 text-white/70 text-sm">{f.a}</div>
            </details>
          ))}
        </div>
        <div className="card p-5 flex items-center gap-3">
          <Icon.Msg size={18} />
          <div className="flex-1">
            <div className="font-semibold">Nie znalazłeś odpowiedzi?</div>
            <div className="text-xs text-white/60">Napisz do nas — odpowiadamy w 14 min średnio.</div>
          </div>
          <Link href="mailto:hello@lumo.ride" className="btn-primary !py-2 !px-4 text-sm">Kontakt</Link>
        </div>
      </section>
    </PublicShell>
  );
}
