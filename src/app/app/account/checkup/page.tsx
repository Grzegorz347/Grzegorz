"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

type Item = { id: string; label: string; status: "ok" | "warn" };

export default function AccountCheckup() {
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    fetch("/api/account").then((r) => r.json()).then((d) => { setScore(d.checkup.score); setItems(d.checkup.items); });
  }, []);
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Checkup konta</h1>
      <div className="card relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-lumo-gradient opacity-20" />
        <div className="relative flex items-center gap-6">
          <ScoreRing score={score} />
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/60">Bezpieczeństwo</div>
            <div className="font-display text-3xl font-bold">Bardzo dobrze</div>
            <div className="text-sm text-white/60 mt-1">Uzupełnij 2 elementy, żeby dojść do 100/100.</div>
          </div>
        </div>
      </div>
      <div className="card divide-y divide-white/5">
        {items.map((it) => (
          <div key={it.id} className="flex items-center gap-3 p-4">
            <span className={`h-9 w-9 rounded-xl grid place-items-center ${it.status === "ok" ? "bg-lumo-cyan/20 text-lumo-cyan" : "bg-lumo-pink/20 text-lumo-pink"}`}>
              {it.status === "ok" ? <Icon.Check size={16} /> : <Icon.Info size={16} />}
            </span>
            <span className="flex-1 font-medium">{it.label}</span>
            <Link href="/app/account/security" className="chip !text-[10px]">{it.status === "ok" ? "OK" : "Uzupełnij"}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="sc" x1="0" x2="1"><stop offset="0" stopColor="#FF4488"/><stop offset="1" stopColor="#35C3FF"/></linearGradient>
      </defs>
      <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
      <circle cx="60" cy="60" r={r} stroke="url(#sc)" strokeWidth="10" fill="none" strokeLinecap="round"
        strokeDasharray={`${(score / 100) * c} ${c}`} transform="rotate(-90 60 60)" />
      <text x="60" y="58" fontSize="22" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="Space Grotesk">{score}</text>
      <text x="60" y="78" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.55)">/ 100</text>
    </svg>
  );
}
