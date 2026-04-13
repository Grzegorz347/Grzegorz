"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

type PK = { id: string; label: string; createdAt: string; lastUsed?: string };

export default function Passkey() {
  const [pks, setPks] = useState<PK[]>([]);
  const [step, setStep] = useState<"idle" | "creating" | "done">("idle");
  const load = () => fetch("/api/account/passkeys").then((r) => r.json()).then((d) => setPks(d.passkeys));
  useEffect(() => { load(); }, []);
  async function create() {
    setStep("creating");
    await new Promise((r) => setTimeout(r, 1200));
    await fetch("/api/account/passkeys", { method: "POST", body: JSON.stringify({ label: "Ten telefon · Face ID" }) });
    await load();
    setStep("done");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Passkey</h1>
      <p className="text-white/65 max-w-lg">
        Bezpieczniejsze niż hasło. Logowanie twarzą, odciskiem palca lub PIN-em urządzenia.
        Działa w Apple, Google i Windows — bez phishingu.
      </p>

      <div className="card p-6 text-center space-y-4">
        <div className="mx-auto h-24 w-24 rounded-full bg-lumo-gradient/20 ring-gradient grid place-items-center">
          {step === "creating" ? <Icon.Sparkle size={36} className="animate-pulseGlow" /> : <Icon.Lock size={36} />}
        </div>
        {step === "idle" && <button className="btn-primary" onClick={create}>Skonfiguruj passkey</button>}
        {step === "creating" && <div className="text-white/70">Uwierzytelnij na urządzeniu…</div>}
        {step === "done" && <div className="text-lumo-cyan flex items-center justify-center gap-1"><Icon.Check size={14} /> Passkey utworzony.</div>}
      </div>

      <div className="card divide-y divide-white/5">
        <div className="p-4 text-xs uppercase tracking-widest text-white/50">Aktywne passkeys</div>
        {pks.map((p) => (
          <div key={p.id} className="p-4 flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-white/[0.05] grid place-items-center"><Icon.Lock size={16} /></span>
            <div className="flex-1">
              <div className="font-medium">{p.label}</div>
              <div className="text-xs text-white/55">Dodano {p.createdAt}{p.lastUsed ? ` · ostatnio ${p.lastUsed}` : ""}</div>
            </div>
            <button className="btn-outline !py-1.5 !px-3 text-xs">Usuń</button>
          </div>
        ))}
      </div>
    </div>
  );
}
