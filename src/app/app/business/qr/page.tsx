"use client";
import { useState } from "react";
import { Icon } from "@/components/icons";

export default function QR() {
  const [copied, setCopied] = useState(false);
  const link = "lumo.ride/b/acme-xR7fZ";
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Zamów przez QR</h1>
      <p className="text-white/65">
        Wydrukuj i postaw przy recepcji. Gość skanuje — zamawia — koszty lądują w Twojej firmie.
      </p>
      <div className="card p-6 flex items-center gap-6">
        <div className="h-56 w-56 rounded-3xl bg-white p-3 shadow-card">
          <div className="grid grid-cols-16 gap-[2px] h-full">
            {Array.from({ length: 256 }).map((_, i) => (
              <span key={i} className={`${Math.random() > 0.48 ? "bg-black" : "bg-transparent"} rounded-sm`} />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="text-xs uppercase tracking-widest text-white/50">Link</div>
          <code className="block rounded-lg px-3 py-1.5 glass-hi text-sm font-mono">{link}</code>
          <div className="flex gap-2">
            <button className="btn-primary !py-2 !px-4 text-sm" onClick={() => { navigator.clipboard?.writeText(link); setCopied(true); }}>Kopiuj</button>
            <button className="btn-outline !py-2 !px-4 text-sm">Pobierz PDF</button>
          </div>
          {copied && <div className="text-xs text-lumo-cyan flex items-center gap-1"><Icon.Check size={12} /> Skopiowano</div>}
        </div>
      </div>
    </div>
  );
}
