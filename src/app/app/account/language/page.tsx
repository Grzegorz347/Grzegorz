"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

const LANGS = [
  { id: "pl", label: "Polski", flag: "🇵🇱" },
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
];

export default function LanguagePage() {
  const [lang, setLang] = useState("pl");
  useEffect(() => { fetch("/api/account").then((r) => r.json()).then((d) => setLang(d.user.language)); }, []);
  async function pick(id: string) {
    setLang(id);
    await fetch("/api/account", { method: "PATCH", body: JSON.stringify({ language: id }) });
  }
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Język</h1>
      <div className="card divide-y divide-white/5">
        {LANGS.map((l) => (
          <button key={l.id} onClick={() => pick(l.id)} className="flex items-center gap-3 p-4 w-full hover:bg-white/[0.04] transition">
            <span className="text-2xl">{l.flag}</span>
            <span className="flex-1 text-left font-medium">{l.label}</span>
            {lang === l.id && <Icon.Check size={18} className="text-lumo-cyan" />}
          </button>
        ))}
      </div>
    </div>
  );
}
