"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/Modal";

type PM = { id: string; kind: string; label: string; last4?: string; brand?: string; expiry?: string; default?: boolean; sharedWith?: string[] };

export default function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [m, setM] = useState<PM | null>(null);
  const [share, setShare] = useState(false);
  const [del, setDel] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => { fetch(`/api/payment-methods/${id}`).then((r) => r.json()).then((d) => setM(d.method)); }, [id]);

  async function doShare() {
    await fetch(`/api/payment-methods/${id}`, { method: "PATCH", body: JSON.stringify({ sharedWith: [...(m?.sharedWith ?? []), email] }) });
    setShare(false);
    setM((x) => x ? { ...x, sharedWith: [...(x.sharedWith ?? []), email] } : x);
  }
  async function doDelete() {
    await fetch(`/api/payment-methods/${id}`, { method: "DELETE" });
    router.push("/app/wallet/methods");
  }
  async function makeDefault() {
    await fetch(`/api/payment-methods/${id}`, { method: "PATCH", body: JSON.stringify({ default: true }) });
    setM((x) => x ? { ...x, default: true } : x);
  }

  if (!m) return <div className="text-white/60">Ładowanie…</div>;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">{m.label}</h1>

      <div className="card relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-lumo-gradient opacity-25" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/70">{m.brand ?? m.kind.toUpperCase()}</div>
            <div className="font-display text-3xl font-bold mt-1">•••• {m.last4}</div>
            <div className="text-sm text-white/70 mt-1">Ważna do {m.expiry ?? "—"}</div>
          </div>
          {m.default && <span className="chip text-lumo-cyan"><Icon.Check size={12} /> Domyślna</span>}
        </div>
      </div>

      <div className="card divide-y divide-white/5">
        <Row I={Icon.Check} label="Ustaw jako domyślną" disabled={!!m.default} onClick={makeDefault} />
        <Row I={Icon.Msg} label="Udostępnij tę metodę" onClick={() => setShare(true)} />
        <Row I={Icon.Info} label="Historia transakcji" onClick={() => router.push("/app/wallet")} />
        <Row I={Icon.SOS} label="Usuń metodę" danger onClick={() => setDel(true)} />
      </div>

      {!!m.sharedWith?.length && (
        <div className="card p-4">
          <div className="text-xs uppercase tracking-widest text-white/50 mb-2">Udostępniona</div>
          <div className="flex flex-wrap gap-2">
            {m.sharedWith.map((e) => <span key={e} className="chip">{e}</span>)}
          </div>
        </div>
      )}

      <Modal open={share} onClose={() => setShare(false)} title="Udostępnij kartę">
        <div className="space-y-3">
          <div className="text-sm text-white/60">Udostępnij tę metodę płatności innemu użytkownikowi Lumo (np. rodzinie).</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adres@e-mail.com" className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none" />
          <button className="btn-primary w-full" onClick={doShare}>Udostępnij</button>
        </div>
      </Modal>

      <Modal open={del} onClose={() => setDel(false)} title="Usuń metodę?">
        <div className="space-y-3">
          <div className="text-sm text-white/70">Nie będziesz mógł tym płacić. Możesz dodać ją ponownie w każdej chwili.</div>
          <div className="flex gap-2">
            <button onClick={() => setDel(false)} className="btn-outline flex-1">Anuluj</button>
            <button onClick={doDelete} className="btn-primary flex-1">Usuń</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Row({ I, label, onClick, danger, disabled }: { I: any; label: string; onClick: () => void; danger?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} className="flex w-full items-center gap-3 p-4 hover:bg-white/[0.04] transition disabled:opacity-40">
      <span className={`h-9 w-9 rounded-xl grid place-items-center ${danger ? "bg-lumo-pink/20 text-lumo-pink" : "bg-white/[0.05]"}`}>
        <I size={16} />
      </span>
      <span className="flex-1 text-left font-medium">{label}</span>
      <Icon.Arrow size={14} className="text-white/40" />
    </button>
  );
}
