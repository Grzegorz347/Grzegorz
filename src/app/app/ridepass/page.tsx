"use client";
import { Icon } from "@/components/icons";
import { useEffect, useState } from "react";

type Tier = { id: "Silver" | "Gold" | "Platinum"; price: number; locks: number; perks: string[] };
type Current = { tier: string; priceLocksRemaining: number; priceLocksTotal: number; renewsAt: string };

export default function RidePassPage() {
  const [data, setData] = useState<{ current: Current | null; tiers: Tier[] }>({ current: null, tiers: [] });
  const [picked, setPicked] = useState<Tier["id"]>("Silver");

  const load = () =>
    fetch("/api/ridepass").then((r) => r.json()).then((d) => setData({ current: d.ridePass, tiers: d.tiers }));
  useEffect(() => { load(); }, []);

  async function subscribe(tier: Tier["id"]) {
    await fetch("/api/ridepass", { method: "POST", body: JSON.stringify({ tier }) });
    load();
  }

  const remaining = data.current?.priceLocksRemaining ?? 0;
  const total = data.current?.priceLocksTotal ?? 1;

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="font-display text-3xl font-bold">RidePass</h1>
      <p className="text-white/60 max-w-xl">
        Subskrypcja, która blokuje ceny w godzinach szczytu, daje priorytet przy deszczu
        i cashback w Rewards — lepsze niż jakikolwiek Uber One czy Bolt Plus.
      </p>

      {data.current && (
        <div className="card relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-lumo-gradient opacity-25" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lumo-gradient opacity-30 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/70">Twoja subskrypcja</div>
              <div className="font-display text-3xl font-bold">RidePass <span className="gradient-text">{data.current.tier}</span></div>
              <div className="text-sm text-white/70 mt-1">Odnawia się {data.current.renewsAt}</div>
            </div>
            <div className="flex-1 md:ml-auto md:max-w-sm">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Price locks pozostałe</span>
                <span className="font-semibold">{remaining} / {total}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-lumo-gradient" style={{ width: `${(remaining / total) * 100}%` }} />
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-outline !py-2 !px-3 text-xs"><Icon.Lock size={12} /> Zamroź cenę</button>
                <button className="btn-outline !py-2 !px-3 text-xs"><Icon.Info size={12} /> Szczegóły</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {data.tiers.map((t) => {
          const active = picked === t.id;
          const isCurrent = data.current?.tier === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setPicked(t.id)}
              className={`card text-left p-5 transition hover:-translate-y-0.5 ${active ? "ring-gradient" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-xl font-bold gradient-text">{t.id}</div>
                {isCurrent && <span className="chip !text-[10px] text-lumo-cyan"><Icon.Check size={10} /> Aktywny</span>}
              </div>
              <div className="mt-2">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                <span className="text-white/60"> zł / mies.</span>
              </div>
              <div className="mt-1 text-xs text-white/60">{t.locks} price-locków w miesiącu</div>
              <ul className="mt-4 space-y-2 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2"><Icon.Check size={14} className="text-lumo-cyan" /> {p}</li>
                ))}
              </ul>
              <button
                onClick={(e) => { e.stopPropagation(); subscribe(t.id); }}
                className={`mt-5 w-full ${isCurrent ? "btn-outline" : "btn-primary"}`}
              >
                {isCurrent ? "Zarządzaj" : "Wybierz"}
              </button>
            </button>
          );
        })}
      </div>
    </div>
  );
}
