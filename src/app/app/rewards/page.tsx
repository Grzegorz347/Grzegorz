"use client";
import { Icon } from "@/components/icons";
import { useEffect, useState } from "react";

type Activity = { id: string; title: string; note: string; points: number; avatar: string };
type Redeem = { id: string; title: string; cost: number };

export default function RewardsPage() {
  const [data, setData] = useState<{ points: number; balancePLN: number; activity: Activity[]; redeem: Redeem[] }>({
    points: 0, balancePLN: 0, activity: [], redeem: [],
  });
  useEffect(() => { fetch("/api/rewards").then((r) => r.json()).then(setData); }, []);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Rewards Wallet</h1>
        <div className="chip"><Icon.Star size={12} /> {data.points.toLocaleString("pl-PL")} pkt</div>
      </div>

      <div className="card relative overflow-hidden p-6">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-lumo-gradient opacity-30 blur-3xl" />
        <div className="relative flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/60">Saldo nagród</div>
            <div className="font-display text-5xl font-bold">${data.balancePLN.toFixed(2)}</div>
            <div className="mt-1 inline-flex items-center gap-2 chip"><Icon.Sparkle size={12} /> RidePass Silver</div>
          </div>
          <svg width="160" height="64" viewBox="0 0 160 64" className="opacity-90">
            <defs>
              <linearGradient id="rw" x1="0" x2="1"><stop offset="0" stopColor="#FF4488"/><stop offset="1" stopColor="#35C3FF"/></linearGradient>
            </defs>
            <path d="M10 54 Q 40 10 80 32 T 150 14" stroke="url(#rw)" strokeWidth="3" fill="none"/>
            <circle cx="150" cy="14" r="5" fill="#35C3FF"/>
          </svg>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold mb-3">Wymień punkty</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.redeem.map((r) => (
            <div key={r.id} className="card p-4 flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-lumo-gradient/20 ring-gradient grid place-items-center"><Icon.Tag size={16} /></span>
              <div className="flex-1">
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-white/60">{r.cost} pkt</div>
              </div>
              <button disabled={data.points < r.cost} className="btn-primary !py-2 !px-3 text-xs disabled:opacity-40">Wymień</button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold mb-3">Ostatnia aktywność</h2>
        <div className="card divide-y divide-white/5">
          {data.activity.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4">
              <span className="h-10 w-10 rounded-full bg-lumo-gradient grid place-items-center font-bold">{a.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{a.title}</div>
                <div className="text-xs text-white/55">{a.note}</div>
              </div>
              <div className="font-semibold">+{a.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
