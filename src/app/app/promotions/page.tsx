"use client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useEffect, useState } from "react";

type Promo = { id: string; title: string; subtitle: string; code: string; color: string; expiresAt: string; isNew?: boolean };

export default function PromotionsPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  useEffect(() => { fetch("/api/promotions").then((r) => r.json()).then((d) => setPromos(d.promotions)); }, []);
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-3xl font-bold">Promocje</h1>
        <Link href="/app/vouchers" className="btn-outline !py-2 !px-4 text-sm inline-flex items-center gap-2">
          <Icon.Tag size={14} /> Dodaj voucher / kod
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {promos.map((p) => (
          <div key={p.id} className="card relative overflow-hidden p-5">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl opacity-60" style={{ background: `radial-gradient(closest-side, ${p.color}80, transparent 70%)` }} />
            <div className="relative flex items-start justify-between">
              <span className="h-10 w-10 rounded-xl bg-lumo-gradient/20 ring-gradient grid place-items-center"><Icon.Tag size={16} /></span>
              {p.isNew && <span className="chip !text-[10px] text-lumo-pink">NOWOŚĆ</span>}
            </div>
            <div className="relative mt-4 font-display text-xl font-bold">{p.title}</div>
            <div className="relative text-sm text-white/60 mt-1">{p.subtitle}</div>
            <div className="relative mt-4 flex items-center justify-between">
              <code className="rounded-lg px-3 py-1.5 glass-hi text-sm font-mono">{p.code}</code>
              <button className="btn-primary !py-2 !px-4 text-sm">Aktywuj</button>
            </div>
            <div className="relative mt-2 text-[11px] text-white/50">Ważne do {p.expiresAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
