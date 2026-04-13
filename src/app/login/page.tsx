"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LumoLogo } from "@/components/Logo";
import { Icon } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"id" | "code" | "password">("id");
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function submitId(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    const r = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier: id }) });
    if (!r.ok) { setErr("Sprawdź e-mail lub telefon."); return; }
    setStep("code");
  }
  function verify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length < 4) { setErr("Kod musi mieć 6 cyfr."); return; }
    router.push("/app");
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 bg-lumo-radial" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-96 w-96 rounded-full bg-lumo-gradient opacity-30 blur-3xl animate-pulseGlow" />
        </div>
        <div className="relative z-10 p-10">
          <LumoLogo />
          <h1 className="mt-20 font-display text-5xl font-extrabold leading-tight">
            Witaj <br />w <span className="gradient-text">Lumo Ride</span>.
          </h1>
          <p className="mt-4 max-w-md text-white/70">
            Zaloguj się w 6 sekund. Passkey, SMS, Apple / Google — wybierasz jak wygodnie.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md card p-6 space-y-5">
          <Link href="/" className="md:hidden"><LumoLogo size={24} /></Link>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50">
              {step === "id" ? "Krok 1 z 2" : "Krok 2 z 2"}
            </div>
            <h2 className="font-display text-2xl font-bold mt-1">
              {step === "id" ? "Zaloguj się" : step === "code" ? "Wpisz kod SMS" : "Hasło"}
            </h2>
          </div>
          {err && <div className="text-sm rounded-xl border border-lumo-pink/30 bg-lumo-pink/10 p-3 text-lumo-pink">{err}</div>}

          {step === "id" && (
            <form onSubmit={submitId} className="space-y-3">
              <label className="block text-xs text-white/60">E-mail lub telefon</label>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-2xl bg-white/[0.04] px-4 py-3 outline-none hairline focus:ring-gradient"
                placeholder="greg@lumo.ride"
                autoFocus
              />
              <button className="btn-primary w-full">Dalej</button>
              <div className="flex items-center gap-3 text-xs text-white/40">
                <span className="h-px flex-1 bg-white/10" /> lub <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button type="button" className="btn-secondary !py-2.5 text-xs">Apple</button>
                <button type="button" className="btn-secondary !py-2.5 text-xs">Google</button>
                <button type="button" className="btn-secondary !py-2.5 text-xs">Passkey</button>
              </div>
              <div className="text-xs text-white/50 text-center">
                Nie masz konta? <Link href="/onboarding" className="gradient-text font-semibold">Zarejestruj się</Link>
              </div>
            </form>
          )}

          {step === "code" && (
            <form onSubmit={verify} className="space-y-3">
              <label className="block text-xs text-white/60">Kod 6-cyfrowy z SMS</label>
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    inputMode="numeric"
                    maxLength={1}
                    value={code[i] ?? ""}
                    onChange={(e) => {
                      const next = (code.slice(0, i) + e.target.value + code.slice(i + 1)).slice(0, 6);
                      setCode(next);
                      const el = e.target as HTMLInputElement;
                      const n = el.nextElementSibling as HTMLInputElement | null;
                      if (e.target.value && n) n.focus();
                    }}
                    className="h-14 w-full text-center text-xl font-semibold rounded-2xl bg-white/[0.04] hairline focus:ring-gradient outline-none"
                  />
                ))}
              </div>
              <button className="btn-primary w-full">Zaloguj</button>
              <button type="button" onClick={() => setStep("id")} className="text-xs text-white/50 w-full">Wróć</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
