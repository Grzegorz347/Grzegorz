"use client";
import { useState } from "react";
import { Icon } from "@/components/icons";

export default function ChangePassword() {
  const [cur, setCur] = useState("");
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [saved, setSaved] = useState(false);
  const strength = scoreStrength(n1);
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Zmień hasło</h1>
      <div className="card p-5 space-y-4">
        <Field label="Obecne hasło" value={cur} onChange={setCur} />
        <Field label="Nowe hasło" value={n1} onChange={setN1} />
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < strength ? "bg-lumo-gradient" : "bg-white/10"}`} />
          ))}
        </div>
        <div className="text-xs text-white/55">{["Słabe", "OK", "Dobre", "Silne", "Świetne"][strength]}</div>
        <Field label="Powtórz nowe hasło" value={n2} onChange={setN2} />
        <button
          disabled={!cur || !n1 || n1 !== n2}
          onClick={() => { setSaved(true); setCur(""); setN1(""); setN2(""); }}
          className="btn-primary w-full disabled:opacity-50"
        >
          Zapisz hasło
        </button>
        {saved && <div className="text-lumo-cyan text-sm flex items-center gap-1"><Icon.Check size={14} /> Hasło zmienione.</div>}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <input type="password" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none focus:ring-gradient" />
    </div>
  );
}

function scoreStrength(s: string) {
  let score = 0;
  if (s.length >= 8) score++;
  if (/[A-Z]/.test(s)) score++;
  if (/[0-9]/.test(s)) score++;
  if (/[^A-Za-z0-9]/.test(s)) score++;
  return score;
}
