"use client";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/icons";

type Redeemed = { code: string; amount: number; at: string };

const INITIAL: Redeemed[] = [
  { code: "LUMO-WELCOME-25", amount: 25, at: "2026-03-14" },
  { code: "WORKFRIDAY-15", amount: 15, at: "2026-03-28" },
];

export default function UserVouchers() {
  const [code, setCode] = useState("");
  const [list, setList] = useState<Redeemed[]>(INITIAL);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function redeem() {
    if (!code.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const upper = code.toUpperCase().trim();
    const amount = upper.startsWith("LUMO") ? 25 : upper.length >= 6 ? 10 : 0;
    if (amount === 0) {
      setMsg({ kind: "err", text: "Kod jest niepoprawny lub wygasł." });
    } else {
      setList((l) => [{ code: upper, amount, at: new Date().toISOString().slice(0, 10) }, ...l]);
      setMsg({ kind: "ok", text: `Dodano voucher +${amount} zł.` });
      setCode("");
    }
    setLoading(false);
  }

  const total = list.reduce((a, b) => a + b.amount, 0);

  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Vouchery</h1>
          <p className="text-sm text-white/60 mt-1">Dodaj kod promocyjny lub voucher firmowy.</p>
        </div>
        <div className="chip"><Icon.Tag size={14} /> Saldo voucherów: <span className="gradient-text font-bold">{total} zł</span></div>
      </header>

      <section className="mt-6 card p-6 bg-lumo-gradient/10 ring-gradient">
        <div className="flex items-center gap-3 mb-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-gradient"><Icon.Tag size={18} /></span>
          <div>
            <div className="font-display text-xl font-bold">Dodaj voucher</div>
            <div className="text-xs text-white/60">np. LUMO-WELCOME-25</div>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="WPISZ KOD"
            className="flex-1 rounded-2xl glass-hi px-4 py-3 tracking-widest font-mono outline-none ring-gradient"
          />
          <button onClick={redeem} disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? "Sprawdzam..." : "Zrealizuj"}
          </button>
        </div>
        {msg && (
          <div className={`mt-3 text-sm rounded-xl px-3 py-2 ${msg.kind === "ok" ? "bg-emerald-500/15 text-emerald-200" : "bg-lumo-pink/15 text-lumo-pink"}`}>
            {msg.text}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold mb-3">Twoje vouchery</h2>
        <div className="space-y-2">
          {list.map((v) => (
            <div key={v.code + v.at} className="card p-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-gradient/20 ring-gradient">
                <Icon.Tag size={16} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm">{v.code}</div>
                <div className="text-xs text-white/50">Dodano {v.at}</div>
              </div>
              <div className="font-display font-bold gradient-text">+{v.amount} zł</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 card p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5"><Icon.Building size={16} /></span>
          <div className="flex-1">
            <div className="font-semibold">Masz voucher firmowy?</div>
            <div className="text-xs text-white/60">QR z recepcji lub eventu — otwórz aparat i zeskanuj.</div>
          </div>
          <button className="btn-outline !py-2 !px-4 text-sm">Skanuj QR</button>
        </div>
      </section>
    </AppShell>
  );
}
