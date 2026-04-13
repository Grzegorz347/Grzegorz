"use client";
import { MapView } from "@/components/MapView";
import { RideOptionCard, type RideTier } from "@/components/RideOptionCard";
import { Icon } from "@/components/icons";
import { Modal, Toggle } from "@/components/Modal";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Stop = { label: string; lat: number; lng: number };
type Stage = "compose" | "matching" | "live" | "done";

type PaymentMethod = { id: string; kind: string; label: string; last4?: string; default?: boolean };
type SavedPlace = { id: string; label: string; address: string; icon: string };

export default function BookPage() {
  const [pickup, setPickup] = useState("Plac Europejski 2");
  const [dropoff, setDropoff] = useState("Lotnisko Chopina");
  const [stops, setStops] = useState<Stop[]>([]);
  const [tier, setTier] = useState<RideTier["id"]>("economy");
  const [tiers, setTiers] = useState<RideTier[]>([]);
  const [stage, setStage] = useState<Stage>("compose");
  const [promo, setPromo] = useState("");
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [payId, setPayId] = useState<string | null>(null);
  const [places, setPlaces] = useState<SavedPlace[]>([]);
  const [rider, setRider] = useState<{ name: string; phone: string }>({ name: "Greg", phone: "+48 600 100 200" });
  const [scheduleAt, setScheduleAt] = useState<string | null>(null);

  // Modals
  const [showPay, setShowPay] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showRider, setShowRider] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareNote, setShareNote] = useState("");

  useEffect(() => {
    fetch("/api/fare?km=8.4").then((r) => r.json()).then((d) => setTiers(d.tiers));
    fetch("/api/payment-methods").then((r) => r.json()).then((d) => {
      setMethods(d.methods);
      const def = d.methods.find((m: PaymentMethod) => m.default);
      setPayId(def?.id ?? d.methods[0]?.id ?? null);
    });
    fetch("/api/places").then((r) => r.json()).then((d) => setPlaces(d.places));
  }, []);

  const selected = useMemo(() => tiers.find((t) => t.id === tier), [tiers, tier]);
  const selectedMethod = methods.find((m) => m.id === payId);

  async function confirm() {
    if (scheduleAt) {
      // Reserve
      setStage("done");
      return;
    }
    setStage("matching");
    await fetch("/api/rides", {
      method: "POST",
      body: JSON.stringify({
        tier,
        distanceKm: 8.4,
        pickup: { label: pickup, lat: 52.23, lng: 21.01 },
        dropoff: { label: dropoff, lat: 52.17, lng: 20.97 },
      }),
    });
    setTimeout(() => setStage("live"), 1600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold">Zamów przejazd</h1>
          <div className="flex items-center gap-2">
            <button className="chip" onClick={() => setShowShare(true)}><Icon.Msg size={12} /> Udostępnij link</button>
            <span className="chip"><Icon.Shield size={12} /> E2E</span>
          </div>
        </div>

        <div className="relative">
          <MapView height={420} />
          <button onClick={() => setShowMap(true)} className="absolute right-3 top-3 btn-secondary !py-2 !px-3 text-xs"><Icon.Pin size={14} /> Ustaw na mapie</button>
        </div>

        {/* Pickup / Dropoff / Stops */}
        <div className="card p-4 space-y-3">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center pt-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white shadow-glow" />
              <span className="my-1 h-6 w-px bg-white/30" />
              {stops.map((_, i) => (
                <span key={i} className="mb-1 flex flex-col items-center">
                  <span className="h-2 w-2 rounded-full bg-lumo-cyan" />
                  <span className="my-1 h-5 w-px bg-white/30" />
                </span>
              ))}
              <span className="h-3 w-3 rounded-full bg-lumo-gradient shadow-glowPink" />
            </div>
            <div className="flex-1 space-y-2">
              <Field icon={<Icon.Pin size={14} />} value={pickup} onChange={setPickup} placeholder="Miejsce odbioru" onPick={() => setShowPlaces(true)} />
              {stops.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Field
                    icon={<Icon.Pin size={14} />}
                    value={s.label}
                    onChange={(v) => setStops((arr) => arr.map((x, ix) => (ix === i ? { ...x, label: v } : x)))}
                    placeholder="Przystanek"
                  />
                  <button className="h-9 w-9 rounded-xl glass-hi grid place-items-center" onClick={() => setStops((a) => a.filter((_, ix) => ix !== i))}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M6 18 18 6"/></svg>
                  </button>
                </div>
              ))}
              <Field icon={<Icon.Pin size={14} />} value={dropoff} onChange={setDropoff} placeholder="Dokąd" highlight onPick={() => setShowPlaces(true)} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <button className="btn-outline !py-2 !px-3 text-xs" onClick={() => setStops((a) => [...a, { label: "", lat: 0, lng: 0 }])}>
              <Icon.Plus size={12} /> Dodaj przystanek
            </button>
            <button className="btn-outline !py-2 !px-3 text-xs" onClick={() => setShowSchedule(true)}>
              <Icon.Clock size={12} /> {scheduleAt ? new Date(scheduleAt).toLocaleString("pl-PL") : "Zaplanuj"}
            </button>
            <button className="btn-outline !py-2 !px-3 text-xs" onClick={() => setShowRider(true)}>
              <Icon.User size={12} /> Pasażer: {rider.name}
            </button>
            <button className="btn-outline !py-2 !px-3 text-xs" onClick={() => setShowPay(true)}>
              <Icon.Wallet size={12} /> {selectedMethod?.label ?? "Sposób płatności"}
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        {stage === "compose" && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Wybierz klasę</h2>
              <Link href="/app/promotions" className="chip"><Icon.Tag size={12} /> Promocje</Link>
            </div>
            <div className="space-y-3">
              {tiers.map((t) => (
                <RideOptionCard key={t.id} tier={t} selected={tier === t.id} onClick={() => setTier(t.id)} />
              ))}
            </div>

            <div className="card p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Icon.Tag size={14} className="text-lumo-pink" />
                <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Kod promocyjny" className="flex-1 bg-transparent outline-none placeholder:text-white/40" />
                <button className="btn-outline !py-1.5 !px-3 text-xs">Zastosuj</button>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Do zapłaty · {selectedMethod?.label}</span>
                <span className="font-semibold text-lg">{(selected?.price ?? 0).toFixed(2)} <span className="text-white/60 text-sm">zł</span></span>
              </div>
              <button onClick={confirm} className="btn-primary w-full flex items-center justify-center gap-2">
                {scheduleAt ? "Zarezerwuj" : "Potwierdź przejazd"} <Icon.Arrow size={16} />
              </button>
              <div className="text-[11px] text-white/40 text-center">
                Cena zablokowana przez RidePass Silver · pozostało 12/20
              </div>
            </div>
          </>
        )}

        {stage === "matching" && (
          <div className="card p-6 space-y-4 text-center">
            <div className="relative mx-auto h-24 w-24">
              <span className="absolute inset-0 rounded-full bg-lumo-gradient opacity-40 blur-xl animate-pulseGlow" />
              <span className="absolute inset-0 rounded-full ring-gradient" />
              <div className="relative h-full w-full rounded-full grid place-items-center">
                <Icon.Car size={36} />
              </div>
            </div>
            <div className="font-display text-xl font-semibold">Szukamy kierowcy…</div>
            <div className="text-sm text-white/60">Średnio 14 sekund w Twojej okolicy.</div>
            <button className="btn-outline w-full" onClick={() => setStage("compose")}>Anuluj</button>
          </div>
        )}

        {stage === "live" && <LiveRide onFinish={() => setStage("done")} />}

        {stage === "done" && (
          <div className="card p-6 space-y-4 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lumo-gradient shadow-glow">
              <Icon.Check size={22} />
            </span>
            <div className="font-display text-xl font-semibold">{scheduleAt ? "Rezerwacja gotowa" : "Dojechałeś bezpiecznie"}</div>
            <div className="text-sm text-white/60">
              {scheduleAt
                ? `Przypomnimy o wyjeździe ${new Date(scheduleAt).toLocaleString("pl-PL")}`
                : "Oceń Emily — zdobędziesz 50 punktów Rewards."}
            </div>
            {!scheduleAt && (
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon.Star key={i} size={28} className="text-lumo-pink" />
                ))}
              </div>
            )}
            <Link href="/app" className="btn-primary w-full block text-center">Wróć do startu</Link>
          </div>
        )}
      </aside>

      {/* Modals */}
      <Modal open={showPay} onClose={() => setShowPay(false)} title="Sposób płatności">
        <div className="space-y-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => { setPayId(m.id); setShowPay(false); }}
              className={`w-full card !rounded-2xl p-3 flex items-center gap-3 ${payId === m.id ? "ring-gradient" : ""}`}
            >
              <span className="h-10 w-10 rounded-xl bg-white/[0.05] grid place-items-center">
                {m.kind === "card" ? <Icon.Cash size={16} /> : m.kind === "cash" ? <Icon.Cash size={16} /> : <Icon.Wallet size={16} />}
              </span>
              <div className="text-left flex-1">
                <div className="font-medium">{m.label}</div>
                {m.last4 && <div className="text-xs text-white/50">•••• {m.last4}</div>}
              </div>
              {payId === m.id && <Icon.Check size={16} className="text-lumo-cyan" />}
            </button>
          ))}
          <Link href="/app/wallet/add" className="btn-primary w-full block text-center !py-2.5 text-sm">+ Dodaj metodę płatności</Link>
        </div>
      </Modal>

      <Modal open={showPlaces} onClose={() => setShowPlaces(false)} title="Ulubione miejsca">
        <div className="space-y-2">
          {places.map((p) => (
            <button key={p.id} onClick={() => { setDropoff(p.address); setShowPlaces(false); }} className="w-full card !rounded-2xl p-3 flex items-center gap-3">
              <span className="h-10 w-10 rounded-xl bg-lumo-gradient/20 ring-gradient grid place-items-center">
                {p.icon === "home" ? <Icon.HomeSolid size={16} /> : p.icon === "work" ? <Icon.Briefcase size={16} /> : <Icon.Star size={16} />}
              </span>
              <div className="text-left flex-1">
                <div className="font-medium">{p.label}</div>
                <div className="text-xs text-white/60">{p.address}</div>
              </div>
              <Icon.Arrow size={14} className="text-white/40" />
            </button>
          ))}
          <AddPlaceForm onAdded={(p) => { setPlaces((a) => [...a, p]); }} />
        </div>
      </Modal>

      <Modal open={showMap} onClose={() => setShowMap(false)} title="Ustaw miejsce na mapie" size="lg">
        <div className="relative">
          <MapView height={320} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <div className="h-10 w-10 rounded-full bg-lumo-gradient shadow-glow grid place-items-center animate-floaty">
              <Icon.Pin size={18} />
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn-outline flex-1" onClick={() => setShowMap(false)}>Anuluj</button>
          <button className="btn-primary flex-1" onClick={() => { setDropoff("Pin na mapie · 52.23, 21.01"); setShowMap(false); }}>Potwierdź pin</button>
        </div>
      </Modal>

      <Modal open={showSchedule} onClose={() => setShowSchedule(false)} title="Zaplanuj odbiór">
        <ScheduleForm onDone={(iso) => { setScheduleAt(iso); setShowSchedule(false); }} />
      </Modal>

      <Modal open={showRider} onClose={() => setShowRider(false)} title="Zmień pasażera">
        <div className="space-y-3">
          <button className="w-full card !rounded-2xl p-3 flex items-center gap-3" onClick={() => { setRider({ name: "Greg", phone: "+48 600 100 200" }); setShowRider(false); }}>
            <span className="h-10 w-10 rounded-full bg-lumo-gradient font-bold grid place-items-center">G</span>
            <div className="text-left flex-1"><div className="font-medium">Greg (Ty)</div><div className="text-xs text-white/60">+48 600 100 200</div></div>
          </button>
          <button className="w-full card !rounded-2xl p-3 flex items-center gap-3" onClick={() => { setRider({ name: "Ania", phone: "+48 600 222 333" }); setShowRider(false); }}>
            <span className="h-10 w-10 rounded-full bg-lumo-cyan/40 font-bold grid place-items-center">A</span>
            <div className="text-left flex-1"><div className="font-medium">Ania</div><div className="text-xs text-white/60">Trusted contact</div></div>
          </button>
          <input className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline focus:ring-gradient outline-none" placeholder="Wpisz telefon innego pasażera" />
        </div>
      </Modal>

      <Modal open={showShare} onClose={() => setShowShare(false)} title="Udostępnij trasę">
        <div className="space-y-3">
          <div className="text-sm text-white/60">Każdy z tym linkiem zobaczy Twój ETA, auto i kierowcę:</div>
          <div className="card !rounded-2xl p-3 flex items-center gap-2">
            <code className="flex-1 text-xs font-mono break-all">lumo.ride/s/kV8nZ-greg</code>
            <button
              className="btn-primary !py-2 !px-3 text-xs"
              onClick={() => { navigator.clipboard?.writeText("https://lumo.ride/s/kV8nZ-greg"); setShareNote("Skopiowano"); }}
            >
              Kopiuj
            </button>
          </div>
          {shareNote && <div className="text-xs text-lumo-cyan">{shareNote}</div>}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button className="btn-secondary">SMS</button>
            <button className="btn-secondary">WhatsApp</button>
            <button className="btn-secondary">E-mail</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Field({
  icon, value, onChange, placeholder, highlight, onPick,
}: {
  icon: React.ReactNode; value: string; onChange: (v: string) => void; placeholder: string; highlight?: boolean; onPick?: () => void;
}) {
  return (
    <div className={`flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2 ${highlight ? "ring-gradient" : "hairline"}`}>
      {icon}
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="bg-transparent flex-1 outline-none placeholder:text-white/40" />
      {onPick && (
        <button className="text-[11px] text-white/50 hover:text-white" onClick={onPick}>Zapisane</button>
      )}
    </div>
  );
}

function LiveRide({ onFinish }: { onFinish: () => void }) {
  const [eta, setEta] = useState(7);
  useEffect(() => {
    const t = setInterval(() => setEta((n) => (n > 0 ? n - 1 : 0)), 1200);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (eta <= 0) onFinish(); }, [eta, onFinish]);
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-lumo-cyan animate-pulseGlow" /> W drodze</span>
        <span className="text-white/60">ETA {eta} min</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl grid place-items-center bg-lumo-gradient font-bold">E</div>
        <div className="flex-1">
          <div className="font-semibold">Emily Roberton</div>
          <div className="text-xs text-white/60">VW Passat · WE 2211P · 4.95 ★</div>
        </div>
        <button className="h-10 w-10 rounded-xl glass-hi grid place-items-center"><Icon.Msg size={16} /></button>
        <Link href="/app/safety" className="h-10 w-10 rounded-xl bg-lumo-gradient grid place-items-center"><Icon.Shield size={16} /></Link>
      </div>
      <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
        <div className="h-full bg-lumo-gradient" style={{ width: `${100 - eta * 14}%` }} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button className="btn-outline !py-2 flex items-center justify-center gap-1.5"><Icon.Shield size={14} /> Udostępnij trasę</button>
        <button className="btn-outline !py-2 flex items-center justify-center gap-1.5"><Icon.Msg size={14} /> Wiadomość</button>
        <Link href="/app/safety" className="btn-outline !py-2 flex items-center justify-center gap-1.5 text-lumo-pink"><Icon.SOS size={14} /> SOS</Link>
      </div>
      <button className="btn-primary w-full" onClick={onFinish}>Zakończ (demo)</button>
    </div>
  );
}

function ScheduleForm({ onDone }: { onDone: (iso: string) => void }) {
  const [date, setDate] = useState(new Date(Date.now() + 864e5).toISOString().slice(0, 10));
  const [time, setTime] = useState("08:00");
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-white/60">Data</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none mt-1" />
        </div>
        <div>
          <label className="text-xs text-white/60">Godzina</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none mt-1" />
        </div>
      </div>
      <div className="text-xs text-white/50">Lumo dopasuje kierowcę z 15-minutowym wyprzedzeniem i przypomni.</div>
      <button className="btn-primary w-full" onClick={() => onDone(new Date(`${date}T${time}:00`).toISOString())}>
        Zarezerwuj
      </button>
    </div>
  );
}

function AddPlaceForm({ onAdded }: { onAdded: (p: SavedPlace) => void }) {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  async function save() {
    const r = await fetch("/api/places", { method: "POST", body: JSON.stringify({ label, address, icon: "pin" }) });
    const d = await r.json();
    onAdded(d.place);
    setLabel(""); setAddress("");
  }
  return (
    <div className="card !rounded-2xl p-3 space-y-2">
      <div className="text-xs text-white/60">Dodaj nowe miejsce</div>
      <input placeholder="Etykieta (np. Siłownia)" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full rounded-xl bg-white/[0.04] px-3 py-2 hairline outline-none" />
      <input placeholder="Adres" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl bg-white/[0.04] px-3 py-2 hairline outline-none" />
      <button disabled={!label || !address} className="btn-primary w-full !py-2 disabled:opacity-50" onClick={save}>Zapisz</button>
    </div>
  );
}
