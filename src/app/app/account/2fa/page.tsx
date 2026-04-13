"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { Toggle } from "@/components/Modal";

export default function TwoFactor() {
  const [enabled, setEnabled] = useState(false);
  const [method, setMethod] = useState<"sms" | "totp">("totp");
  const [code, setCode] = useState("");
  const [secret] = useState("LUMO-7Q8F-KJ3H-2XPZ");
  useEffect(() => { fetch("/api/account").then((r) => r.json()).then((d) => { setEnabled(d.user.twoFactor.enabled); setMethod(d.user.twoFactor.method ?? "totp"); }); }, []);
  async function update(e: boolean, m: "sms" | "totp") {
    await fetch("/api/account/2fa", { method: "POST", body: JSON.stringify({ enabled: e, method: m }) });
    setEnabled(e); setMethod(m);
  }
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Dwuskładnikowe uwierzytelnianie</h1>
      <div className="card p-5 flex items-center gap-3">
        <Icon.Shield size={18} className="text-lumo-cyan" />
        <span className="flex-1 font-medium">Włącz 2FA</span>
        <Toggle on={enabled} onChange={(v) => update(v, method)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(["totp", "sms"] as const).map((m) => (
          <button key={m} onClick={() => update(enabled, m)} className={`card p-5 text-left ${method === m ? "ring-gradient" : ""}`}>
            <div className="font-semibold">{m === "totp" ? "Aplikacja TOTP" : "Kod SMS"}</div>
            <div className="text-xs text-white/55 mt-1">{m === "totp" ? "Google Authenticator, 1Password, Authy" : "Kod wysłany na +48 600 100 200"}</div>
          </button>
        ))}
      </div>
      {method === "totp" && (
        <div className="card p-5 space-y-3">
          <div className="text-xs uppercase tracking-widest text-white/50">Dodaj do aplikacji</div>
          <div className="flex items-center gap-4">
            <QR />
            <div>
              <div className="text-sm text-white/70">Lub wpisz kod ręcznie:</div>
              <code className="block mt-1 rounded-lg px-3 py-1.5 glass-hi text-sm font-mono">{secret}</code>
            </div>
          </div>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Kod 6-cyfrowy" className="w-full rounded-xl bg-white/[0.04] px-3 py-2.5 hairline outline-none focus:ring-gradient" />
          <button className="btn-primary w-full">Potwierdź 2FA</button>
        </div>
      )}
    </div>
  );
}

function QR() {
  // Decorative QR placeholder
  return (
    <div className="h-32 w-32 rounded-2xl bg-white/[0.05] p-2 hairline">
      <div className="grid grid-cols-12 gap-[2px] h-full">
        {Array.from({ length: 144 }).map((_, i) => (
          <span key={i} className={`${Math.random() > 0.5 ? "bg-white" : "bg-transparent"} rounded-sm`} />
        ))}
      </div>
    </div>
  );
}
