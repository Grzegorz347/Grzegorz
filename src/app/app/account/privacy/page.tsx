"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/Modal";

export default function PrivacyCenter() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [downloadResult, setDownloadResult] = useState<any>(null);
  const [deleteResult, setDeleteResult] = useState<any>(null);
  const [confirm, setConfirm] = useState("");

  async function requestDownload() {
    const r = await fetch("/api/account/data", { method: "POST" });
    setDownloadResult(await r.json());
  }
  async function deleteAccount() {
    const r = await fetch("/api/account/delete", { method: "POST" });
    setDeleteResult(await r.json());
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Centrum prywatności</h1>
      <p className="text-white/65 max-w-lg">Twoje dane, Twoje zasady. Tu zarządzasz tym, co Lumo wie.</p>

      <div className="card divide-y divide-white/5">
        <Row I={Icon.Info} label="Pobierz swoje dane" sub="Kompletny archiwum w 30 minut" onClick={() => setDownloadOpen(true)} />
        <Row I={Icon.Shield} label="Zarządzaj zgodami marketingowymi" sub="E-mail, SMS, push" to="/app/account/profile" />
        <Row I={Icon.User} label="Widoczność profilu dla kierowców" sub="Imię, ocena, numer telefonu" />
        <Row I={Icon.Lock} label="Sesje aktywne" sub="2 urządzenia" />
        <Row I={Icon.Logout} label="Wyloguj wszędzie" onClick={() => alert("Wszystkie sesje wylogowane")} />
        <Row I={Icon.SOS} label="Usuń konto" danger sub="30-dniowy okres cofnięcia" onClick={() => setDeleteOpen(true)} />
      </div>

      <Modal open={downloadOpen} onClose={() => setDownloadOpen(false)} title="Pobierz dane">
        <div className="space-y-3">
          {!downloadResult ? (
            <>
              <div className="text-sm text-white/70">Zbierzemy Twoje dane i wyślemy link na {downloadResult?.email ?? "Twój e-mail"}. Szacowany czas: 30 min.</div>
              <button className="btn-primary w-full" onClick={requestDownload}>Zamów paczkę</button>
            </>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="text-lumo-cyan flex items-center gap-1"><Icon.Check size={14} /> Zamówiono #{downloadResult.caseId}</div>
              <div className="text-white/60">Gotowe ok. {new Date(downloadResult.estimatedReady).toLocaleTimeString("pl-PL")}.</div>
            </div>
          )}
        </div>
      </Modal>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Usunąć konto?">
        {!deleteResult ? (
          <div className="space-y-3">
            <div className="text-sm text-white/70">To nieodwracalne po 30 dniach. Wpisz <b>USUN</b> aby potwierdzić.</div>
            <input value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none" />
            <button disabled={confirm !== "USUN"} onClick={deleteAccount} className="btn-primary w-full disabled:opacity-50">Zaplanuj usunięcie</button>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="text-lumo-pink flex items-center gap-1"><Icon.Info size={14} /> Konto zaplanowane do usunięcia</div>
            <div className="text-white/60">Możesz cofnąć przez {new Date(deleteResult.completesAt).toLocaleDateString("pl-PL")}.</div>
            <Link href="/" className="btn-primary w-full block text-center">Wyloguj</Link>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Row({ I, label, sub, to, onClick, danger }: { I: any; label: string; sub?: string; to?: string; onClick?: () => void; danger?: boolean }) {
  const inner = (
    <div className="flex items-center gap-3 p-4 hover:bg-white/[0.04] transition w-full">
      <span className={`h-9 w-9 rounded-xl grid place-items-center ${danger ? "bg-lumo-pink/20 text-lumo-pink" : "bg-white/[0.05]"}`}><I size={16} /></span>
      <div className="flex-1 text-left">
        <div className="font-medium">{label}</div>
        {sub && <div className="text-xs text-white/55">{sub}</div>}
      </div>
      <Icon.Arrow size={14} className="text-white/40" />
    </div>
  );
  if (to) return <Link href={to}>{inner}</Link>;
  return <button onClick={onClick} className="w-full">{inner}</button>;
}
