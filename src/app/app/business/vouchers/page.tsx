"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/Modal";

type V = { id: string; code: string; amount: number; remaining: number; expiresAt: string };

export default function Vouchers() {
  const [vouchers, setVouchers] = useState<V[]>([]);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(50);
  const [label, setLabel] = useState("");
  const load = () => fetch("/api/vouchers").then((r) => r.json()).then((d) => setVouchers(d.vouchers));
  useEffect(() => { load(); }, []);
  async function create() {
    await fetch("/api/vouchers", { method: "POST", body: JSON.stringify({ amount }) });
    setOpen(false); load();
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Vouchery</h1>
        <button className="btn-primary !py-2 !px-4 text-sm" onClick={() => setOpen(true)}><Icon.Plus size={14} /> Utwórz voucher</button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vouchers.map((v) => (
          <div key={v.id} className="card relative overflow-hidden p-5">
            <div className="absolute inset-0 bg-lumo-gradient opacity-15" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-white/60">Voucher</div>
              <div className="font-display text-3xl font-bold">{v.amount} zł</div>
              <div className="text-xs text-white/55 mt-1">Ważny do {v.expiresAt}</div>
              <div className="mt-3 flex items-center justify-between">
                <code className="rounded px-2 py-1 glass-hi text-xs font-mono">{v.code}</code>
                <button className="chip !text-[10px]" onClick={() => navigator.clipboard?.writeText(v.code)}>Kopiuj</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Nowy voucher">
        <div className="space-y-3">
          <label className="text-xs text-white/60">Kwota (zł)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none" />
          <label className="text-xs text-white/60">Opis (opcjonalnie)</label>
          <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Onboarding Q2" className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none" />
          <button className="btn-primary w-full" onClick={create}>Utwórz</button>
        </div>
      </Modal>
    </div>
  );
}
