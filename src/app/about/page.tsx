import { PublicShell } from "@/components/PublicShell";
import { Icon } from "@/components/icons";

export default function About() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="chip mb-6">Warszawa · 2024 — dzisiaj</div>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.02]">
          Budujemy transport, który <span className="gradient-text">traktuje ludzi po ludzku</span>.
        </h1>
        <p className="mt-6 text-white/70 text-lg max-w-2xl">
          Lumo powstało z jednego powodu: Uber i Bolt zoptymalizowały platformę
          pod wskaźniki zarządu, nie pod Ciebie. Dlatego zaczęliśmy od nowa —
          produkt, który zarabia, gdy pasażer i kierowca są zadowoleni.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { t: "3 wartości", v: "Transparentność, bezpieczeństwo, design" },
            { t: "42 osoby", v: "Zespół rozproszony w 4 miastach" },
            { t: "240 000", v: "Aktywnych pasażerów miesięcznie" },
          ].map((b) => (
            <div key={b.t} className="card p-5">
              <div className="text-xs uppercase tracking-widest text-white/50">{b.t}</div>
              <div className="font-display text-xl font-semibold mt-1">{b.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-4 text-white/75 leading-relaxed">
          <p>Założyliśmy Lumo, ponieważ uwierzyliśmy, że ride-hailing może być zaprojektowany.
          Nie „zoptymalizowany pod LTV”, nie „zhiperkomprowany A/B”, tylko faktycznie <i>zaprojektowany</i> jak premium produkt.</p>
          <p>Naszym pierwszym kierowcą był Piotr. Powiedział nam, że Uber zamknął mu konto po 3 latach bez powodu,
          a Bolt nie podnosi stawki przy deszczu. Jego historia stała się fundamentem naszej polityki.</p>
          <p>Dzisiaj obsługujemy 240 000 osób miesięcznie, a nasza prowizja jest
          najniższa w Europie (14%). Daleko nam do Ubera pod względem skali —
          ale blisko pod względem szacunku. I tak ma być.</p>
        </div>
      </section>
    </PublicShell>
  );
}
