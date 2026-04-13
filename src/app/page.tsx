import Link from "next/link";
import { LumoLogo } from "@/components/Logo";
import { Icon } from "@/components/icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { MapView } from "@/components/MapView";
import { CarArt } from "@/components/CarArt";

export default function Landing() {
  return (
    <div className="relative">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <LumoLogo size={28} />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white">Funkcje</a>
            <a href="#ridepass" className="hover:text-white">RidePass</a>
            <a href="#safety" className="hover:text-white">Bezpieczeństwo</a>
            <a href="#compare" className="hover:text-white">vs. Uber / Bolt</a>
            <a href="#drivers" className="hover:text-white">Kierowcy</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-outline !py-2 !px-4 text-sm">Zaloguj</Link>
            <Link href="/app" className="btn-primary !py-2 !px-4 text-sm">Otwórz aplikację</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-lumo-radial" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div className="relative">
            <div className="chip mb-6"><span className="h-1.5 w-1.5 rounded-full bg-lumo-cyan animate-pulseGlow" /> Nowość · Commute Mode z AI</div>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight">
              Podróżuj <span className="gradient-text">lepiej</span> niż <br className="hidden md:block" />
              w Uber. Inaczej niż w Bolt.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Lumo to ride-hailing nowej generacji: zablokowane ceny, nagrody za
              każdy kilometr, hyper-personalizowana trasa i bezpieczeństwo, które
              wreszcie działa. Zbudowane wokół Ciebie — nie wokół prowizji.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/app" className="btn-primary text-base">Rozpocznij — to darmowe</Link>
              <Link href="#compare" className="btn-outline">Zobacz dlaczego</Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["4.96★", "Ocena kierowców"],
                ["−22%", "Tańsze w szczycie*"],
                ["14s", "Średni czas dopasowania"],
              ].map(([v, l]) => (
                <div key={l as string}>
                  <div className="font-display text-2xl font-bold gradient-text">{v}</div>
                  <div className="text-xs text-white/55">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-lumo-gradient opacity-20 blur-3xl rounded-full" />
            <PhoneFrame>
              <div className="h-full px-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">Commute Mode</div>
                    <div className="font-display text-2xl font-bold">Cześć, <span className="gradient-text">Greg</span></div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-lumo-gradient grid place-items-center font-bold text-sm">G</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="card p-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-lumo-blue/20 ring-gradient"><Icon.Building size={16} /></span>
                    <div className="mt-4 text-xs text-white/50">Zwykle · 8:00</div>
                    <div className="font-semibold">To Work</div>
                  </div>
                  <div className="card p-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-lumo-pink/20 ring-gradient"><Icon.HomeSolid size={16} /></span>
                    <div className="mt-4 text-xs text-white/50">Zwykle · 18:00</div>
                    <div className="font-semibold">To Home</div>
                  </div>
                </div>
                <div className="mt-3">
                  <MapView height={160} />
                </div>
                <div className="mt-3 card p-3">
                  <div className="flex items-center gap-3">
                    <CarArt tier="economy" className="w-24 -my-1" />
                    <div className="flex-1">
                      <div className="text-[11px] text-white/50">5–7 min</div>
                      <div className="font-semibold">Economy</div>
                    </div>
                    <div className="font-semibold">12.80 <span className="text-xs text-white/60">zł</span></div>
                  </div>
                </div>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold max-w-3xl">Zaprojektowane, żeby było po prostu lepsze.</h2>
        <p className="mt-4 max-w-2xl text-white/65">Każda funkcja rozwiązuje prawdziwy problem, którego Uber i Bolt nie rozwiązały.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { t: "Commute Mode", d: "Zapamiętuje Twoje dojazdy i sugeruje auto 5 min przed wyjściem.", I: Icon.Home, c: "#FF4488" },
            { t: "Price Lock", d: "Zablokuj cenę z RidePass — nawet gdy wszyscy inni płacą surge.", I: Icon.Lock, c: "#9A5CFF" },
            { t: "Rewards Wallet", d: "Każdy kilometr to realne pieniądze — nie wirtualne punkty donikąd.", I: Icon.Star, c: "#35C3FF" },
            { t: "Live Share 2.0", d: "Rodzina widzi ETA, kierowcę i puls akumulatora Twojego telefonu.", I: Icon.Shield, c: "#FF4488" },
            { t: "SOS w 1.5s", d: "Przytrzymaj przycisk — dzwonimy do dyspozytora i 112.", I: Icon.SOS, c: "#9A5CFF" },
            { t: "Eco Route", d: "Wybierz niższy ślad węglowy — dostajesz eco-kredyt do portfela.", I: Icon.Leaf, c: "#35C3FF" },
          ].map((f) => (
            <div key={f.t} className="card relative overflow-hidden p-6">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl opacity-50" style={{ background: `radial-gradient(closest-side, ${f.c}70, transparent 70%)` }} />
              <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-lumo-gradient/20 ring-gradient"><f.I size={20} /></span>
              <div className="relative mt-5 font-display text-xl font-semibold">{f.t}</div>
              <div className="relative mt-2 text-sm text-white/65">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RIDEPASS */}
      <section id="ridepass" className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="card relative overflow-hidden p-10">
          <div className="absolute inset-0 bg-lumo-gradient opacity-15" />
          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <div className="chip mb-4"><Icon.Sparkle size={12} /> RidePass</div>
              <h3 className="font-display text-4xl font-bold">Subskrypcja, która naprawdę oszczędza.</h3>
              <p className="mt-3 text-white/70 max-w-lg">
                Od 29 zł / miesiąc. Zamrażaj ceny, dostawaj priorytet w deszczu,
                zbieraj 5–15% cashback. Anuluj w każdej chwili.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/app/ridepass" className="btn-primary">Wybierz plan</Link>
                <Link href="#compare" className="btn-outline">Porównaj</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: "Silver", p: 29, perks: "20 locków" },
                { n: "Gold", p: 59, perks: "60 locków + upgrade'y" },
                { n: "Platinum", p: 129, perks: "200 locków, VIP support" },
              ].map((t, i) => (
                <div key={t.n} className={`card p-4 ${i === 2 ? "ring-gradient" : ""}`}>
                  <div className="font-display text-lg font-semibold gradient-text">{t.n}</div>
                  <div className="mt-2 font-display text-2xl font-bold">{t.p}<span className="text-white/60 text-sm"> zł</span></div>
                  <div className="text-xs text-white/55 mt-1">{t.perks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="font-display text-3xl md:text-5xl font-bold">Lumo vs. konkurencja</h2>
        <p className="mt-3 max-w-xl text-white/65">Różnica nie jest drobna — to zupełnie inne podejście.</p>
        <div className="mt-8 card overflow-hidden">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] text-sm">
            <div className="p-4 text-white/50">Funkcja</div>
            <div className="p-4 font-semibold gradient-text">Lumo</div>
            <div className="p-4 text-white/60">Uber</div>
            <div className="p-4 text-white/60">Bolt</div>
            {[
              ["Price Lock w szczycie", true, false, false],
              ["Rewards w realnej walucie", true, false, false],
              ["Commute Mode z AI", true, false, false],
              ["SOS z dyspozytorem 24/7", true, "częściowo", false],
              ["Eco-kredyt za niskoemisyjne", true, false, false],
              ["Bez prowizji dla kierowców < 20km", true, false, false],
              ["Split w 1 dotknięciu", true, true, true],
              ["Pełna dostępność offline", true, false, false],
            ].map(([k, a, b, c], i) => (
              <div key={k as string} className={`contents ${i % 2 ? "" : ""}`}>
                <div className={`p-4 border-t border-white/5`}>{k}</div>
                <div className="p-4 border-t border-white/5"><Cell v={a} good /></div>
                <div className="p-4 border-t border-white/5"><Cell v={b} /></div>
                <div className="p-4 border-t border-white/5"><Cell v={c} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section id="safety" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold">Bezpieczeństwo nie jest opcją.</h2>
            <p className="mt-4 max-w-lg text-white/65">
              Weryfikacja twarzą, PIN przejazdu, szyfrowane połączenia, tryb nocny
              z kierowcami 4.9★. Trusted contacts widzą puls Twojego telefonu.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/app/safety" className="btn-primary">Zobacz centrum bezpieczeństwa</Link>
            </div>
          </div>
          <div className="card relative overflow-hidden p-6">
            <MapView height={260} />
            <div className="absolute bottom-6 left-6 right-6 glass-hi p-4 rounded-2xl flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-pink/20 ring-gradient"><Icon.Shield size={16} /></span>
              <div className="flex-1">
                <div className="font-semibold">Trasa udostępniana rodzinie</div>
                <div className="text-xs text-white/60">Live share · 2 osoby widzą Twój ETA</div>
              </div>
              <span className="chip !text-[10px] text-lumo-cyan"><span className="h-1.5 w-1.5 rounded-full bg-lumo-cyan animate-pulseGlow" /> LIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="card relative overflow-hidden p-12 text-center">
          <div className="absolute inset-0 bg-lumo-gradient opacity-25" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold">Witamy w Lumo.</h2>
            <p className="mt-3 text-white/75 max-w-xl mx-auto">
              Dołącz do 240 tysięcy osób, które codziennie jeżdżą lepiej.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/app" className="btn-primary">Otwórz aplikację</Link>
              <Link href="/login" className="btn-outline">Zaloguj się</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-white/50">
          <LumoLogo size={20} />
          <div>© 2026 Lumo Ride. Zaprojektowane lepiej niż trzeba.</div>
        </div>
      </footer>
    </div>
  );
}

function Cell({ v, good = false }: { v: boolean | string; good?: boolean }) {
  if (v === true) return <span className={`inline-flex items-center gap-1 ${good ? "text-lumo-cyan" : "text-white/80"}`}><Icon.Check size={14} /> Tak</span>;
  if (v === false) return <span className="text-white/30">—</span>;
  return <span className="text-white/60">{v}</span>;
}
