"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";

export default function CreateCompany() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [sector, setSector] = useState("Tech");
  const [step, setStep] = useState(0);
  async function save() {
    await fetch("/api/companies", { method: "POST", body: JSON.stringify({ name, nip, sector }) });
    router.push("/app/business");
  }
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Utwórz firmę</h1>
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-12 bg-lumo-gradient" : "w-4 bg-white/15"}`} />
        ))}
      </div>
      <div className="card p-6 space-y-4">
        {step === 0 && (
          <>
            <label className="text-xs text-white/60">Nazwa firmy</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme sp. z o.o." className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none focus:ring-gradient" />
            <label className="text-xs text-white/60">NIP</label>
            <input value={nip} onChange={(e) => setNip(e.target.value)} placeholder="525-000-00-00" className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none focus:ring-gradient" />
            <button disabled={!name} onClick={() => setStep(1)} className="btn-primary w-full disabled:opacity-50">Dalej</button>
          </>
        )}
        {step === 1 && (
          <>
            <div className="text-xs text-white/60">Branża</div>
            <div className="grid grid-cols-2 gap-2">
              {["Tech", "Finanse", "Consulting", "Produkcja", "Media", "Inna"].map((s) => (
                <button key={s} onClick={() => setSector(s)} className={`card p-3 text-left ${sector === s ? "ring-gradient" : ""}`}>{s}</button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="btn-primary w-full">Dalej</button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="text-sm text-white/65">Zapraszamy Cię jako administratora. Za chwilę zaprosisz zespół e-mailem.</div>
            <div className="card !rounded-2xl p-4 text-sm">
              <div className="flex justify-between"><span>Firma</span><span className="font-semibold">{name}</span></div>
              <div className="flex justify-between"><span>NIP</span><span>{nip || "—"}</span></div>
              <div className="flex justify-between"><span>Branża</span><span>{sector}</span></div>
            </div>
            <button onClick={save} className="btn-primary w-full">Utwórz firmę</button>
          </>
        )}
      </div>
    </div>
  );
}
