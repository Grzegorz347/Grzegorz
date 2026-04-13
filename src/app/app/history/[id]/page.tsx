"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MapView } from "@/components/MapView";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/Modal";

type Ride = {
  id: string; tier: string; status: string;
  pickup: { label: string }; dropoff: { label: string };
  price: number; currency: string; distanceKm: number; durationMin: number;
  createdAt: string; completedAt?: string; rating?: number; tip?: number;
  driver?: { name: string; car: string; plate: string; rating: number };
};
type Receipt = { id: string; items: { label: string; amount: number }[]; total: number; currency: string; issuedAt: string };

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [ride, setRide] = useState<Ride | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [rateOpen, setRateOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(0);
  const [sent, setSent] = useState<string | null>(null);

  const load = () => fetch(`/api/rides/${id}`).then((r) => r.json()).then((d) => { setRide(d.ride); setRating(d.ride.rating ?? 5); setTip(d.ride.tip ?? 0); });
  useEffect(() => { load(); }, [id]);

  async function openReceipt() {
    const r = await fetch(`/api/rides/${id}/receipt`).then((r) => r.json());
    setReceipt(r.receipt);
    setReceiptOpen(true);
  }
  async function resend() {
    const r = await fetch(`/api/rides/${id}/receipt`, { method: "POST" }).then((r) => r.json());
    setSent(`Paragon wysłany na ${r.to}`);
  }
  async function saveRating() {
    await fetch(`/api/rides/${id}/rate`, { method: "POST", body: JSON.stringify({ rating, tip }) });
    setRateOpen(false);
    load();
  }
  async function cancel() {
    await fetch(`/api/rides/${id}`, { method: "PATCH", body: JSON.stringify({ status: "cancelled" }) });
    setCancelOpen(false);
    router.push("/app/history");
  }

  if (!ride) return <div className="text-white/60">Ładowanie…</div>;

  const cancellable = ["requested", "matched", "scheduled", "arriving"].includes(ride.status);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/history" className="h-10 w-10 rounded-xl glass-hi grid place-items-center"><Icon.Arrow size={14} className="rotate-180" /></Link>
        <h1 className="font-display text-3xl font-bold">Przejazd #{ride.id.slice(2)}</h1>
        <span className={`chip ml-auto ${ride.status === "completed" ? "text-lumo-cyan" : ride.status === "cancelled" ? "text-lumo-pink" : "text-white/80"}`}>
          {ride.status}
        </span>
      </div>

      <MapView height={280} animateCar={ride.status !== "completed" && ride.status !== "cancelled"} />

      <div className="card p-5 space-y-4">
        <div className="flex items-center gap-4">
          {ride.driver && (
            <>
              <div className="h-14 w-14 rounded-2xl bg-lumo-gradient grid place-items-center font-bold text-xl">{ride.driver.name[0]}</div>
              <div className="flex-1">
                <div className="font-semibold">{ride.driver.name}</div>
                <div className="text-xs text-white/60">{ride.driver.car} · {ride.driver.plate} · {ride.driver.rating} ★</div>
              </div>
            </>
          )}
          {!ride.driver && <div className="text-white/60">Kierowca zostanie przydzielony przed rozpoczęciem.</div>}
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <Info label="Dystans" value={`${ride.distanceKm.toFixed(1)} km`} />
          <Info label="Czas" value={`${ride.durationMin} min`} />
          <Info label="Klasa" value={ride.tier.toUpperCase()} />
        </div>
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center pt-1">
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="my-1 h-10 w-px bg-white/30" />
            <span className="h-3 w-3 rounded-full bg-lumo-gradient" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="font-medium">{ride.pickup.label}</div>
            <div className="text-white/60">{ride.dropoff.label}</div>
          </div>
        </div>
      </div>

      <div className="card divide-y divide-white/5">
        <Row I={Icon.Star} label={ride.rating ? `Oceniono ${ride.rating} ★` : "Oceń przejazd"} onClick={() => setRateOpen(true)} disabled={ride.status !== "completed"} />
        <Row I={Icon.Info} label="Pokaż paragon" onClick={openReceipt} disabled={ride.status !== "completed"} />
        <Row I={Icon.Msg} label="Wyślij paragon ponownie" onClick={resend} disabled={ride.status !== "completed"} />
        <Row I={Icon.Arrow} label="Zamów ponownie" onClick={() => router.push("/app/book")} />
        {cancellable && <Row I={Icon.SOS} label="Anuluj przejazd" danger onClick={() => setCancelOpen(true)} />}
      </div>

      {sent && <div className="text-lumo-cyan text-sm">{sent}</div>}

      <Modal open={rateOpen} onClose={() => setRateOpen(false)} title="Oceń Emily">
        <div className="space-y-4 text-center">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} onClick={() => setRating(i)} className={`${i <= rating ? "text-lumo-pink" : "text-white/20"} transition`}>
                <Icon.Star size={40} />
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[0, 5, 10, 20].map((t) => (
              <button key={t} onClick={() => setTip(t)} className={`chip ${tip === t ? "ring-gradient" : ""}`}>
                Napiwek {t} zł
              </button>
            ))}
          </div>
          <button className="btn-primary w-full" onClick={saveRating}>Zapisz ocenę</button>
        </div>
      </Modal>

      <Modal open={receiptOpen} onClose={() => setReceiptOpen(false)} title="Paragon">
        {receipt ? (
          <div className="space-y-2 text-sm">
            <div className="text-white/50 text-xs">Wystawiono {new Date(receipt.issuedAt).toLocaleString("pl-PL")}</div>
            <div className="card !rounded-2xl p-4 divide-y divide-white/5">
              {receipt.items.map((it) => (
                <div key={it.label} className="flex justify-between py-2">
                  <span className="text-white/70">{it.label}</span>
                  <span>{it.amount.toFixed(2)} {receipt.currency}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-semibold">
                <span>Razem</span>
                <span>{receipt.total.toFixed(2)} {receipt.currency}</span>
              </div>
            </div>
            <button className="btn-primary w-full" onClick={resend}>Wyślij e-mailem</button>
          </div>
        ) : <div className="text-white/60 text-sm">Ładowanie…</div>}
      </Modal>

      <Modal open={cancelOpen} onClose={() => setCancelOpen(false)} title="Anulować przejazd?">
        <div className="space-y-3">
          <div className="text-sm text-white/70">Może zostać naliczona opłata za anulowanie (3 zł) jeśli kierowca jest bliżej niż 2 min.</div>
          <div className="flex gap-2">
            <button onClick={() => setCancelOpen(false)} className="btn-outline flex-1">Nie</button>
            <button onClick={cancel} className="btn-primary flex-1">Tak, anuluj</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="card !rounded-2xl p-3">
      <div className="text-xs text-white/50">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
function Row({ I, label, onClick, disabled, danger }: { I: any; label: string; onClick: () => void; disabled?: boolean; danger?: boolean }) {
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
