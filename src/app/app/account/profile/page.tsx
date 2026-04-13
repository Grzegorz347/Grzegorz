"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Toggle } from "@/components/Modal";

export default function EditProfile() {
  const [u, setU] = useState<any>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => { fetch("/api/account").then((r) => r.json()).then((d) => setU(d.user)); }, []);
  async function save(patch: any) {
    const r = await fetch("/api/account", { method: "PATCH", body: JSON.stringify(patch) });
    const d = await r.json();
    setU(d.user);
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  }
  if (!u) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Edytuj profil</h1>

      <div className="card p-5 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-lumo-gradient grid place-items-center font-bold text-2xl">{u.name[0]}</div>
        <div className="flex-1">
          <div className="font-semibold">{u.name}</div>
          <div className="text-xs text-white/55">Zmień avatar</div>
        </div>
        <button className="btn-outline !py-2 !px-3 text-xs">Prześlij</button>
      </div>

      <div className="card divide-y divide-white/5">
        <Inline label="Imię" value={u.name} onSave={(v) => save({ name: v })} />
        <Inline label="E-mail" value={u.email} onSave={(v) => save({ email: v })} />
        <Inline label="Telefon" value={u.phone} onSave={(v) => save({ phone: v })} />
      </div>

      <div className="card p-5 space-y-4">
        <div className="font-semibold">Preferencje komunikacji</div>
        {[
          ["sms", "SMS"], ["email", "E-mail"], ["push", "Push"], ["marketing", "Oferty marketingowe"],
        ].map(([k, label]) => (
          <div key={k} className="flex items-center">
            <span className="flex-1">{label}</span>
            <Toggle on={u.communicationPrefs[k]} onChange={(v) => save({ communicationPrefs: { [k]: v } })} />
          </div>
        ))}
      </div>

      <div className="card p-5 flex items-center gap-3">
        <Icon.Lock size={18} className="text-lumo-cyan" />
        <span className="flex-1">Pickup code (PIN przejazdu)</span>
        <Toggle on={u.pickupCodeEnabled} onChange={(v) => save({ pickupCodeEnabled: v })} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <Link href="/app/account/language" className="card p-4 flex items-center gap-3"><Icon.Sparkle size={16} /> Język — {u.language.toUpperCase()}</Link>
        <Link href="/app/account/password" className="card p-4 flex items-center gap-3"><Icon.Lock size={16} /> Zmień hasło</Link>
      </div>

      {saved && <div className="text-lumo-cyan text-sm">Zapisano.</div>}
    </div>
  );
}

function Inline({ label, value, onSave }: { label: string; value: string; onSave: (v: string) => void }) {
  const [v, setV] = useState(value);
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-32 text-white/60 text-sm">{label}</div>
      {editing ? (
        <>
          <input value={v} onChange={(e) => setV(e.target.value)} className="flex-1 rounded-xl bg-white/[0.04] px-3 py-2 hairline outline-none focus:ring-gradient" />
          <button onClick={() => { onSave(v); setEditing(false); }} className="btn-primary !py-1.5 !px-3 text-xs">Zapisz</button>
          <button onClick={() => { setV(value); setEditing(false); }} className="btn-outline !py-1.5 !px-3 text-xs">Anuluj</button>
        </>
      ) : (
        <>
          <div className="flex-1">{value}</div>
          <button onClick={() => setEditing(true)} className="btn-outline !py-1.5 !px-3 text-xs">Edytuj</button>
        </>
      )}
    </div>
  );
}
