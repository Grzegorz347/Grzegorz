"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { LumoLogo } from "@/components/Logo";
import { MapView } from "@/components/MapView";
import { CarArt } from "@/components/CarArt";

type Step = 0 | 1 | 2 | 3 | 4;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);

  const steps = [
    { title: "Witaj w Lumo", sub: "Ride-hailing, który działa dla Ciebie — nie dla prowizji." },
    { title: "Commute Mode", sub: "Poznamy Twoje trasy i zaproponujemy auto 5 min przed wyjściem." },
    { title: "RidePass", sub: "Zablokuj cenę w szczycie. Oszczędź nawet 22%." },
    { title: "Safety first", sub: "SOS, Trusted Contacts, weryfikacja twarzą — domyślnie włączone." },
    { title: "Zaczynamy", sub: "Dodajmy telefon i e-mail, żeby zamówić pierwszy przejazd." },
  ];

  const s = steps[step];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-lumo-radial" />
      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <LumoLogo size={22} />
        <Link href="/login" className="text-sm text-white/60 hover:text-white">Pomiń</Link>
      </header>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-8 px-6 py-6 md:grid-cols-2 items-center">
        <div>
          <div className="chip mb-5">Krok {step + 1} / {steps.length}</div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight">{s.title}</h1>
          <p className="mt-4 text-white/70 max-w-md">{s.sub}</p>

          <div className="mt-8 flex items-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === step ? "w-10 bg-lumo-gradient" : "w-3 bg-white/20"}`}
              />
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button className="btn-outline" onClick={() => setStep((n) => (n - 1) as Step)}>
                Wstecz
              </button>
            )}
            {step < 4 ? (
              <button className="btn-primary" onClick={() => setStep((n) => (n + 1) as Step)}>
                Dalej <Icon.Arrow size={14} />
              </button>
            ) : (
              <Signup onDone={() => router.push("/app")} />
            )}
          </div>
        </div>
        <div className="relative">
          {step === 0 && <MapView height={340} />}
          {step === 1 && (
            <div className="card p-6 grid grid-cols-2 gap-3">
              <div className="card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-blue/20 ring-gradient"><Icon.Building size={16} /></span>
                <div className="mt-6 font-semibold">To Work · 8:00</div>
              </div>
              <div className="card p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-pink/20 ring-gradient"><Icon.HomeSolid size={16} /></span>
                <div className="mt-6 font-semibold">To Home · 18:00</div>
              </div>
              <div className="col-span-2 card p-4 flex items-center gap-3">
                <Icon.Sparkle size={16} className="text-lumo-cyan" />
                <span className="text-sm">AI uczy się Twojego rytmu tygodnia.</span>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="card p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-lumo-gradient opacity-15" />
              <div className="relative font-display text-2xl font-bold gradient-text">RidePass Silver</div>
              <div className="relative text-sm text-white/60">29 zł / miesiąc · 20 price locków</div>
              <div className="relative mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-lumo-gradient w-3/5" />
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="card p-6 space-y-3">
              <div className="flex items-center gap-3"><Icon.Shield size={18} className="text-lumo-cyan" /> Trusted contacts</div>
              <div className="flex items-center gap-3"><Icon.SOS size={18} className="text-lumo-pink" /> SOS 1.5s</div>
              <div className="flex items-center gap-3"><Icon.Lock size={18} className="text-lumo-violet" /> Pick-up code</div>
              <div className="flex items-center gap-3"><Icon.Check size={18} className="text-lumo-cyan" /> Verified driver</div>
            </div>
          )}
          {step === 4 && (
            <div className="card p-6 flex items-center gap-4">
              <CarArt tier="standard" className="w-48" />
              <div>
                <div className="font-display text-xl font-bold">Twoje pierwsze auto</div>
                <div className="text-sm text-white/60">Czeka na zamówienie · 5–7 min</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Signup({ onDone }: { onDone: () => void }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  async function submit() {
    await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: email || phone }) });
    onDone();
  }
  return (
    <div className="w-full max-w-md">
      <div className="card p-4 space-y-2">
        <input className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline focus:ring-gradient outline-none" placeholder="+48 600 100 200" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline focus:ring-gradient outline-none" placeholder="e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn-primary w-full" onClick={submit}>Stwórz konto</button>
      </div>
    </div>
  );
}
