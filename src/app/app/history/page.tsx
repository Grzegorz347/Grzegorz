"use client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/Modal";
import { useEffect, useMemo, useState } from "react";

type Ride = {
  id: string;
  status: string;
  pickup: { label: string };
  dropoff: { label: string };
  price: number;
  currency: string;
  createdAt: string;
  distanceKm: number;
  tier: string;
};

export default function HistoryPage() {
  const [tab, setTab] = useState<"past" | "upcoming">("past");
  const [rides, setRides] = useState<Ride[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [priceMax, setPriceMax] = useState<number>(500);

  useEffect(() => {
    fetch("/api/rides").then((r) => r.json()).then((d) => setRides(d.rides));
  }, []);

  const filtered = useMemo(() => {
    return rides
      .filter((r) => (tab === "past" ? ["completed", "cancelled"].includes(r.status) : ["matched", "requested", "on_trip", "arriving", "scheduled"].includes(r.status)))
      .filter((r) => (tierFilter === "all" ? true : r.tier === tierFilter))
      .filter((r) => r.price <= priceMax);
  }, [rides, tab, tierFilter, priceMax]);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Przejazdy</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setFilterOpen(true)} className="h-10 w-10 rounded-xl glass-hi grid place-items-center" title="Filtr"><Icon.Filter size={16} /></button>
          <button className="h-10 w-10 rounded-xl glass-hi grid place-items-center" title="Opcje"><Icon.Menu size={16} /></button>
        </div>
      </div>

      <div className="flex gap-1 rounded-full p-1 glass w-fit">
        {(["past", "upcoming"] as const).map((k) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-1.5 text-sm rounded-full transition ${tab === k ? "bg-lumo-gradient shadow-glow text-white" : "text-white/60"}`}>
            {k === "past" ? "Minione" : "Nadchodzące"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {groupByMonth(filtered).map(([month, items]) => (
          <div key={month} className="space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] text-white/40 px-1">{month}</div>
            {items.map((r) => {
              const cancelled = r.status === "cancelled";
              return (
                <Link href={`/app/history/${r.id}`} key={r.id} className="card p-4 flex items-start gap-4 hover:-translate-y-0.5 transition">
                  <span className={`h-10 w-10 grid place-items-center rounded-xl ${cancelled ? "bg-white/[0.05]" : "bg-lumo-gradient/20 ring-gradient"}`}>
                    {cancelled ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m6 6 12 12M6 18 18 6"/><path d="M3 13l2-5a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 5"/></svg>
                    ) : <Icon.Car size={18} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span>{fmt(r.createdAt)}</span>
                      {r.status === "scheduled" && <span className="chip !py-0.5 !text-[10px] text-lumo-cyan">Zaplanowany</span>}
                      {cancelled && <span className="chip !py-0.5 !text-[10px] text-lumo-pink">Anulowano</span>}
                      {r.status === "completed" && <span className="chip !py-0.5 !text-[10px] text-white/80">{r.tier.toUpperCase()}</span>}
                    </div>
                    <div className="mt-1 font-medium truncate">{r.pickup.label}</div>
                    <div className="text-sm text-white/60 truncate">→ {r.dropoff.label}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${cancelled ? "text-white/40" : ""}`}>
                      {r.price.toFixed(2)} <span className="text-white/50 text-xs">{r.currency}</span>
                    </div>
                    <span className="mt-2 chip !py-1 !text-[10px]"><Icon.Arrow size={10} /> Szczegóły</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}

        {filtered.length === 0 && <div className="card p-10 text-center text-white/50">Brak przejazdów.</div>}
      </div>

      <Modal open={filterOpen} onClose={() => setFilterOpen(false)} title="Filtry">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-white/60 mb-2">Klasa</div>
            <div className="flex flex-wrap gap-2">
              {["all", "economy", "standard", "xl"].map((t) => (
                <button key={t} onClick={() => setTierFilter(t)} className={`chip ${tierFilter === t ? "ring-gradient" : ""}`}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-white/60 mb-2">Maks. cena: {priceMax} zł</div>
            <input type="range" min={0} max={500} step={5} value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} className="w-full" />
          </div>
          <button className="btn-primary w-full" onClick={() => setFilterOpen(false)}>Zastosuj</button>
        </div>
      </Modal>
    </div>
  );
}

function fmt(iso: string) {
  const d = new Date(iso);
  const dd = d.getDate().toString().padStart(2, "0");
  const mm = ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"][d.getMonth()];
  const hh = d.getHours().toString().padStart(2, "0");
  const mi = d.getMinutes().toString().padStart(2, "0");
  return `${dd} ${mm} · ${hh}:${mi}`;
}

function groupByMonth(rides: Ride[]): [string, Ride[]][] {
  const months: Record<string, Ride[]> = {};
  rides.forEach((r) => {
    const d = new Date(r.createdAt);
    const key = `${["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"][d.getMonth()]} ${d.getFullYear()}`;
    (months[key] ??= []).push(r);
  });
  return Object.entries(months);
}
