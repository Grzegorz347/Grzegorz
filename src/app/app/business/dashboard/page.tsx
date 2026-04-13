"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";

type BR = { id: string; from: string; to: string; when: string; status: string; amount: number; employee: string };

export default function Dashboard() {
  const [q, setQ] = useState("");
  const [requests, setRequests] = useState<BR[]>([]);
  useEffect(() => { fetch("/api/business/requests").then((r) => r.json()).then((d) => setRequests(d.requests)); }, []);
  const filtered = useMemo(() => requests.filter((r) => (r.employee + r.from + r.to).toLowerCase().includes(q.toLowerCase())), [requests, q]);

  const kpis = [
    { label: "Wydatki / mies.", v: `${requests.reduce((s, r) => s + r.amount, 0).toFixed(0)} zł`, g: "#FF4488" },
    { label: "Przejazdy", v: requests.length.toString(), g: "#9A5CFF" },
    { label: "Pracowników", v: "14", g: "#35C3FF" },
    { label: "Oszczędności", v: "−22%", g: "#FF4488" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Dashboard biznesowy</h1>
        <div className="flex items-center gap-2">
          <Link href="/app/business/vouchers" className="btn-outline !py-2 !px-3 text-xs"><Icon.Tag size={12} /> Vouchery</Link>
          <Link href="/app/business/qr" className="btn-primary !py-2 !px-3 text-xs"><Icon.Plus size={12} /> QR Request</Link>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] px-3 py-2 hairline">
        <Icon.Search size={14} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Szukaj w dashboardzie (pracownik, trasa)…" className="flex-1 bg-transparent outline-none placeholder:text-white/40" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="card relative overflow-hidden p-4">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-60" style={{ background: `radial-gradient(closest-side, ${k.g}80, transparent)` }} />
            <div className="relative text-xs text-white/55">{k.label}</div>
            <div className="relative font-display text-2xl font-bold mt-1">{k.v}</div>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Zgłoszenia ostatnie</div>
        <div className="divide-y divide-white/5">
          {filtered.map((r) => (
            <div key={r.id} className="flex items-center gap-3 py-3">
              <span className="h-9 w-9 rounded-full bg-lumo-gradient grid place-items-center font-semibold text-sm">{r.employee[0]}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{r.employee}</div>
                <div className="text-xs text-white/60 truncate">{r.from} → {r.to}</div>
              </div>
              <div className="text-sm">{r.amount.toFixed(2)} zł</div>
              <span className={`chip !text-[10px] ${r.status === "approved" ? "text-lumo-cyan" : r.status === "rejected" ? "text-lumo-pink" : "text-white/70"}`}>{r.status}</span>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-white/50 text-sm py-6 text-center">Brak wyników.</div>}
        </div>
      </div>
    </div>
  );
}
