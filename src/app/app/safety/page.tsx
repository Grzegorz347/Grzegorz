"use client";
import { Icon } from "@/components/icons";
import { useState } from "react";

export default function SafetyPage() {
  const [dispatched, setDispatched] = useState<null | { caseId: string; message: string }>(null);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  function startHold() {
    setHolding(true);
    const start = Date.now();
    const t = setInterval(() => {
      const p = Math.min(100, (Date.now() - start) / 15);
      setProgress(p);
      if (p >= 100) {
        clearInterval(t);
        setHolding(false);
        fetch("/api/safety/sos", { method: "POST" }).then((r) => r.json()).then(setDispatched);
      }
    }, 50);
    (startHold as any)._t = t;
  }
  function cancelHold() {
    clearInterval((startHold as any)._t);
    setHolding(false);
    setProgress(0);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Bezpieczeństwo</h1>
      <p className="text-white/60 max-w-xl">
        Lumo domyślnie wysyła Twoją lokalizację do zaufanych kontaktów, szyfruje
        rozmowy z kierowcą i uruchamia SOS 24/7.
      </p>

      <div className="card relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,68,136,0.3),transparent_70%)]" />
        <div className="relative flex flex-col items-center text-center">
          <button
            onMouseDown={startHold}
            onTouchStart={startHold}
            onMouseUp={cancelHold}
            onMouseLeave={cancelHold}
            onTouchEnd={cancelHold}
            className="relative h-40 w-40 rounded-full bg-lumo-gradient shadow-glow grid place-items-center select-none active:scale-95 transition"
          >
            <span className="absolute inset-3 rounded-full border border-white/30" />
            <span className="absolute inset-8 rounded-full border border-white/20" />
            <Icon.SOS size={44} />
            {holding && (
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="white" strokeOpacity="0.15" strokeWidth="4" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(progress / 100) * 301.5} 301.5`}
                  transform="rotate(-90 50 50)"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
          <div className="mt-5 font-display text-2xl font-bold">Przytrzymaj 1.5 sek, aby wysłać SOS</div>
          <div className="text-sm text-white/60 mt-1">Dzwonimy na 112 i dzielimy się lokalizacją.</div>

          {dispatched && (
            <div className="mt-5 card ring-gradient p-4 text-left w-full">
              <div className="font-semibold">{dispatched.message}</div>
              <div className="text-xs text-white/60 mt-1">Numer zgłoszenia: {dispatched.caseId}</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { t: "Trusted contacts", s: "Udostępniaj lokalizację automatycznie", I: Icon.User },
          { t: "Verified driver", s: "Twarzowa weryfikacja + kod PIN przejazdu", I: Icon.Shield },
          { t: "Night mode", s: "Wyłącznie kierowcy 4.9★ po 22:00", I: Icon.Sparkle },
          { t: "Safety center", s: "Rozmawiaj z agentem 24/7", I: Icon.Help },
        ].map((f) => (
          <div key={f.t} className="card p-4 flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-lumo-gradient/20 ring-gradient grid place-items-center">
              <f.I size={16} />
            </span>
            <div>
              <div className="font-semibold">{f.t}</div>
              <div className="text-xs text-white/55">{f.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
