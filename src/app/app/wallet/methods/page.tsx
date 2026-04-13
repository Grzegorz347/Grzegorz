"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

type PM = { id: string; kind: string; label: string; last4?: string; brand?: string; expiry?: string; default?: boolean };

export default function Methods() {
  const [methods, setMethods] = useState<PM[]>([]);
  const load = () => fetch("/api/payment-methods").then((r) => r.json()).then((d) => setMethods(d.methods));
  useEffect(() => { load(); }, []);

  async function makeDefault(id: string) {
    await fetch(`/api/payment-methods/${id}`, { method: "PATCH", body: JSON.stringify({ default: true }) });
    load();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Metody płatności</h1>
        <Link href="/app/wallet/add" className="btn-primary !py-2 !px-4 text-sm"><Icon.Plus size={14} /> Dodaj</Link>
      </div>
      <div className="space-y-3">
        {methods.map((m) => (
          <Link href={`/app/wallet/card/${m.id}`} key={m.id} className="card p-4 flex items-center gap-4 hover:-translate-y-0.5 transition">
            <span className="h-11 w-11 rounded-xl bg-lumo-gradient/20 ring-gradient grid place-items-center">
              {m.kind === "card" ? <Icon.Cash size={18} /> : m.kind === "cash" ? <Icon.Cash size={18} /> : <Icon.Wallet size={18} />}
            </span>
            <div className="flex-1">
              <div className="font-medium flex items-center gap-2">
                {m.label}
                {m.default && <span className="chip !text-[10px] text-lumo-cyan"><Icon.Check size={10} /> Domyślna</span>}
              </div>
              {m.expiry && <div className="text-xs text-white/55">Ważna do {m.expiry}</div>}
            </div>
            {!m.default && (
              <button onClick={(e) => { e.preventDefault(); makeDefault(m.id); }} className="btn-outline !py-1.5 !px-3 text-xs">Ustaw domyślną</button>
            )}
            <Icon.Arrow size={14} className="text-white/40" />
          </Link>
        ))}
      </div>
    </div>
  );
}
