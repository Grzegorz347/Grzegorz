"use client";
import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";
import { Icon } from "@/components/icons";

type Step = 1 | 2 | 3 | 4;

export default function DriveApply() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Warszawa",
    licensePlate: "",
    carModel: "",
    carYear: "2022",
    licenseNumber: "",
    hours: "40",
    refCode: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  const canNext: Record<Step, boolean> = {
    1: form.name.length > 1 && /@/.test(form.email) && form.phone.length > 5,
    2: form.carModel.length > 1 && form.licensePlate.length > 2,
    3: form.licenseNumber.length > 3,
    4: form.agree,
  };

  function submit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <PublicShell>
        <section className="mx-auto max-w-xl px-6 py-24 text-center space-y-6">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-lumo-gradient shadow-glow">
            <Icon.Check size={32} />
          </div>
          <h1 className="font-display text-4xl font-extrabold">Aplikacja przyjęta</h1>
          <p className="text-white/70">
            Dzięki, {form.name.split(" ")[0]}. Zespół Lumo odezwie się w ciągu 48 h
            z zaproszeniem na szkolenie w {form.city}.
          </p>
          <div className="card p-5 text-left text-sm">
            <div className="flex justify-between"><span className="text-white/50">ID aplikacji</span><span className="font-mono">APP-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span></div>
            <div className="flex justify-between mt-2"><span className="text-white/50">Status</span><span className="gradient-text font-semibold">W weryfikacji</span></div>
            <div className="flex justify-between mt-2"><span className="text-white/50">Szacowany start</span><span>7–10 dni</span></div>
          </div>
          <Link href="/drive" className="btn-outline inline-flex">Wróć do Drive</Link>
        </section>
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <section className="mx-auto max-w-2xl px-6 py-16">
        <Link href="/drive" className="text-xs text-white/50 hover:text-white">← Wróć</Link>
        <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold">Aplikuj jako kierowca</h1>
        <p className="text-white/60 mt-2">4 kroki, ok. 5 minut. Bez papieru.</p>

        <div className="mt-6 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-lumo-gradient" : "bg-white/10"}`} />
          ))}
        </div>

        <div className="mt-8 card p-6 space-y-4">
          {step === 1 && (
            <>
              <div className="font-display text-xl font-bold">1. Ty</div>
              <Field label="Imię i nazwisko" value={form.name} onChange={(v) => update("name", v)} placeholder="Jan Kowalski" />
              <Field label="E-mail" value={form.email} onChange={(v) => update("email", v)} placeholder="jan@gmail.com" />
              <Field label="Telefon" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+48 600 ..." />
              <Select label="Miasto" value={form.city} onChange={(v) => update("city", v)} options={["Warszawa", "Kraków", "Wrocław", "Poznań", "Gdańsk", "Łódź", "Katowice"]} />
            </>
          )}
          {step === 2 && (
            <>
              <div className="font-display text-xl font-bold">2. Auto</div>
              <Field label="Marka i model" value={form.carModel} onChange={(v) => update("carModel", v)} placeholder="Toyota Corolla" />
              <Field label="Rejestracja" value={form.licensePlate} onChange={(v) => update("licensePlate", v.toUpperCase())} placeholder="WE 12345" />
              <Select label="Rok produkcji" value={form.carYear} onChange={(v) => update("carYear", v)} options={["2024", "2023", "2022", "2021", "2020", "2019", "2018 lub starsze"]} />
            </>
          )}
          {step === 3 && (
            <>
              <div className="font-display text-xl font-bold">3. Dokumenty</div>
              <Field label="Numer prawa jazdy" value={form.licenseNumber} onChange={(v) => update("licenseNumber", v)} placeholder="ABC123456" />
              <Select label="Ile godzin tygodniowo planujesz jeździć?" value={form.hours} onChange={(v) => update("hours", v)} options={["10", "20", "30", "40", "50+"]} />
              <div className="text-xs text-white/50">
                Na następnym kroku poprosimy o zdjęcia: dowodu osobistego, prawa jazdy, dowodu rejestracyjnego, OC i licencji TAXI.
                To zrobisz w appce kierowcy po akceptacji.
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="font-display text-xl font-bold">4. Podsumowanie</div>
              <Summary label="Imię" value={form.name} />
              <Summary label="Kontakt" value={`${form.email} · ${form.phone}`} />
              <Summary label="Miasto" value={form.city} />
              <Summary label="Auto" value={`${form.carModel} · ${form.licensePlate} · ${form.carYear}`} />
              <Summary label="Tygodniowo" value={`${form.hours} h`} />
              <Field label="Kod polecającego (opcjonalnie)" value={form.refCode} onChange={(v) => update("refCode", v.toUpperCase())} placeholder="np. GREG-R7T2" />
              <label className="flex items-start gap-3 mt-2 text-sm">
                <input type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} className="mt-1 accent-lumo-pink" />
                <span className="text-white/70">
                  Zgadzam się na weryfikację moich danych, przetwarzanie zgodnie z{" "}
                  <Link href="/about" className="gradient-text">polityką prywatności</Link> Lumo, oraz oświadczam, że
                  moje uprawnienia do wykonywania przewozu osób są ważne.
                </span>
              </label>
            </>
          )}

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
              disabled={step === 1}
              className="btn-outline !py-2 !px-4 text-sm disabled:opacity-40"
            >
              ← Wstecz
            </button>
            {step < 4 ? (
              <button
                disabled={!canNext[step]}
                onClick={() => setStep((s) => ((s + 1) as Step))}
                className="btn-primary !py-2 !px-5 text-sm disabled:opacity-40"
              >
                Dalej →
              </button>
            ) : (
              <button onClick={submit} disabled={!canNext[4]} className="btn-primary !py-2 !px-5 text-sm disabled:opacity-40">
                Wyślij aplikację
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <Perk I={Icon.Cash} t="14% prowizji" />
          <Perk I={Icon.Flash} t="Wypłata instant" />
          <Perk I={Icon.Shield} t="Wsparcie 24/7 PL" />
        </div>
      </section>
    </PublicShell>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <div className="text-xs text-white/60 mb-1.5">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl glass-hi px-4 py-3 outline-none ring-gradient"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <div className="text-xs text-white/60 mb-1.5">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl glass-hi px-4 py-3 outline-none ring-gradient"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink-900">{o}</option>
        ))}
      </select>
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm border-b border-white/5 py-2">
      <span className="text-white/50">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Perk({ I, t }: { I: typeof Icon.Cash; t: string }) {
  return (
    <div className="card !rounded-2xl p-3">
      <span className="grid h-8 w-8 mx-auto place-items-center rounded-xl bg-lumo-gradient/20 ring-gradient"><I size={14} /></span>
      <div className="text-xs text-white/70 mt-2">{t}</div>
    </div>
  );
}
