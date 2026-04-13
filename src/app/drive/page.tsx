import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";
import { Icon } from "@/components/icons";
import { CarArt } from "@/components/CarArt";

export default function Drive() {
  return (
    <PublicShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-lumo-radial" />
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 items-center">
          <div>
            <div className="chip mb-5">Rekrutacja otwarta · Warszawa, Kraków, Wrocław</div>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight">
              Jedź z <span className="gradient-text">Lumo</span>.<br /> Zarabiaj, jak powinieneś.
            </h1>
            <p className="mt-5 text-white/70 max-w-lg">
              14% prowizji. Natychmiastowa wypłata. Bez algorytmu, który wygasza
              Twoje konto bez powodu. Gwarantowana stawka minimalna 44 zł/h.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/drive/apply" className="btn-primary">Aplikuj teraz</Link>
              <Link href="#calc" className="btn-outline">Oblicz zarobki</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-lumo-gradient opacity-20 blur-3xl rounded-full" />
            <div className="relative card p-6 space-y-4">
              <div className="flex items-center gap-4">
                <CarArt tier="standard" className="w-48" />
                <div>
                  <div className="text-xs text-white/50 uppercase">Twój poziom</div>
                  <div className="font-display text-2xl font-bold gradient-text">Driver Gold</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="card !rounded-2xl p-3"><div className="text-xs text-white/50">Prowizja</div><div className="font-semibold">14%</div></div>
                <div className="card !rounded-2xl p-3"><div className="text-xs text-white/50">Min / h</div><div className="font-semibold">44 zł</div></div>
                <div className="card !rounded-2xl p-3"><div className="text-xs text-white/50">Wypłata</div><div className="font-semibold">Instant</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calc" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "0% na paliwo", d: "Dopłata do tankowania dla kierowców Gold+", I: Icon.Leaf },
            { t: "Szkolenia", d: "Bezpieczeństwo, obsługa klienta, EV — płatne", I: Icon.Sparkle },
            { t: "Wsparcie 24/7", d: "Polski zespół, nie outsourcing w Bangalore", I: Icon.Shield },
          ].map((f) => (
            <div key={f.t} className="card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-gradient/20 ring-gradient"><f.I size={16} /></span>
              <div className="mt-4 font-display text-lg font-semibold">{f.t}</div>
              <div className="text-sm text-white/60 mt-1">{f.d}</div>
            </div>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
