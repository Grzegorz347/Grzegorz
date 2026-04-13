"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";

export default function AddMethod() {
  const router = useRouter();
  const [kind, setKind] = useState<"card" | "blik" | "applepay" | "googlepay">("card");
  const [num, setNum] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [saving, setSaving] = useState(false);

  const last4 = num.replace(/\s/g, "").slice(-4);
  const brand = num.startsWith("4") ? "Visa" : num.startsWith("5") ? "Mastercard" : num.startsWith("3") ? "Amex" : undefined;

  async function save() {
    setSaving(true);
    await fetch("/api/payment-methods", {
      method: "POST",
      body: JSON.stringify({ kind, last4, brand, expiry: exp, label: brand ? `${brand} •• ${last4}` : "Nowa karta" }),
    });
    router.push("/app/wallet/methods");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Dodaj metodę płatności</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {([
          ["card", "Karta", Icon.Cash],
          ["blik", "BLIK", Icon.Flash],
          ["applepay", "Apple Pay", Icon.Cash],
          ["googlepay", "Google Pay", Icon.Cash],
        ] as const).map(([id, label, I]) => (
          <button key={id} onClick={() => setKind(id)} className={`card p-4 text-left flex items-center gap-2 ${kind === id ? "ring-gradient" : ""}`}>
            <I size={16} /> <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      {kind === "card" && (
        <div className="card p-5 space-y-4">
          {/* Faux card preview */}
          <div className="relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-lumo-pink via-lumo-violet to-lumo-cyan p-5 shadow-glow">
            <div className="flex items-center justify-between">
              <div className="font-display text-lg font-bold">Lumo</div>
              <div className="text-xs">{brand ?? "KARTA"}</div>
            </div>
            <div className="mt-8 text-xl font-mono tracking-widest">{(num || "•••• •••• •••• ••••").replace(/(.{4})/g, "$1 ").trim()}</div>
            <div className="mt-4 flex gap-6 text-xs">
              <div>
                <div className="opacity-60">Ważna do</div>
                <div>{exp || "••/••"}</div>
              </div>
              <div>
                <div className="opacity-60">CVC</div>
                <div>{cvc ? "•••" : "•••"}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-white/60">Numer karty</label>
            <input inputMode="numeric" value={num} onChange={(e) => setNum(e.target.value.replace(/[^\d ]/g, "").slice(0, 19))} placeholder="4242 4242 4242 4242" className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none focus:ring-gradient" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/60">Ważna do</label>
              <input value={exp} onChange={(e) => setExp(e.target.value)} placeholder="07/28" className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none focus:ring-gradient mt-1" />
            </div>
            <div>
              <label className="text-xs text-white/60">CVC</label>
              <input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none focus:ring-gradient mt-1" />
            </div>
          </div>
          <button disabled={saving} onClick={save} className="btn-primary w-full">{saving ? "Zapisywanie…" : "Zapisz kartę"}</button>
        </div>
      )}

      {kind !== "card" && (
        <div className="card p-6 text-center space-y-3">
          <div className="text-white/70">W rzeczywistej aplikacji nastąpi redirect do providera.</div>
          <button onClick={save} className="btn-primary">Zapisz {kind.toUpperCase()}</button>
        </div>
      )}
    </div>
  );
}
