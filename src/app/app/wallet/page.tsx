"use client";
import { Icon } from "@/components/icons";
import { useEffect, useState } from "react";

type Tx = { id: string; kind: string; amount: number; label: string; at: string };

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [txs, setTxs] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(false);

  const reload = () =>
    fetch("/api/wallet").then((r) => r.json()).then((d) => {
      setBalance(d.balance);
      setTxs(d.transactions);
    });

  useEffect(() => { reload(); }, []);

  async function topup(amount: number, label: string) {
    setLoading(true);
    await fetch("/api/wallet", { method: "POST", body: JSON.stringify({ amount, label }) });
    await reload();
    setLoading(false);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Portfel</h1>

      <div className="card relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-lumo-gradient opacity-20" />
        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-lumo-gradient opacity-40 blur-3xl" />
        <div className="relative flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/60">Dostępne środki</div>
            <div className="font-display text-5xl font-bold">{balance.toFixed(2)} <span className="text-white/70 text-xl">zł</span></div>
            <div className="mt-1 text-sm text-white/70">Konto główne · BLIK, Apple Pay, karta •• 4411</div>
          </div>
          <Icon.Wallet size={36} />
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {[50, 100, 200, 500].map((v) => (
            <button
              key={v}
              disabled={loading}
              onClick={() => topup(v, `Doładowanie BLIK +${v} zł`)}
              className="btn-secondary !py-2 !px-4 text-sm"
            >
              + {v} zł
            </button>
          ))}
          <button className="btn-outline !py-2 !px-4 text-sm"><Icon.Plus size={14} /> Inna kwota</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { t: "Auto-topup", s: "Przy saldzie < 20 zł", I: Icon.Flash },
          { t: "Podziel rachunek", s: "Split ride w 1 dotknięcie", I: Icon.User },
          { t: "Eco-kredyt", s: "+1 zł za każdy Eco", I: Icon.Leaf },
        ].map(({ t, s, I }) => (
          <div key={t} className="card p-4 flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-lumo-gradient/20 ring-gradient grid place-items-center">
              <I size={16} />
            </span>
            <div>
              <div className="font-semibold">{t}</div>
              <div className="text-xs text-white/55">{s}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-xl font-semibold">Historia transakcji</h2>
        <div className="card divide-y divide-white/5">
          {txs.map((t) => (
            <div key={t.id} className="flex items-center gap-4 p-4">
              <span className={`h-9 w-9 rounded-xl grid place-items-center ${
                t.amount > 0 ? "bg-lumo-cyan/20 text-lumo-cyan" : t.amount < 0 ? "bg-lumo-pink/15 text-lumo-pink" : "bg-white/[0.05]"
              }`}>
                {t.kind === "topup" ? <Icon.Plus size={16} /> :
                 t.kind === "ride" ? <Icon.Car size={16} /> :
                 t.kind === "refund" ? <Icon.Arrow size={16} /> :
                 <Icon.Star size={16} />}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{t.label}</div>
                <div className="text-xs text-white/50">{new Date(t.at).toLocaleString("pl-PL")}</div>
              </div>
              <div className={`font-semibold ${t.amount > 0 ? "text-lumo-cyan" : t.amount < 0 ? "text-white" : "text-white/70"}`}>
                {t.amount === 0 ? "—" : `${t.amount > 0 ? "+" : ""}${t.amount.toFixed(2)} zł`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
