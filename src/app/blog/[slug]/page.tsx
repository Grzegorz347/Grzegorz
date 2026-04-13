import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";

const CONTENT: Record<string, { title: string; date: string; body: string }> = {
  "dlaczego-commute-mode": {
    title: "Dlaczego Commute Mode zmienia codzienne dojazdy",
    date: "12 kwi 2026",
    body:
      "Badania user research pokazały, że 68% naszych pasażerów ma dwa, maksymalnie trzy regularne adresy. Zamiast zmuszać ich do pisania adresu 10 razy w tygodniu, zbudowaliśmy Commute Mode — tryb, który rozumie rytm Twojego tygodnia i proponuje auto 5 minut przed wyjściem.",
  },
  "ridepass-ekonomia": {
    title: "RidePass: ekonomia subskrypcji w ride-hailingu",
    date: "05 kwi 2026",
    body:
      "Subskrypcja w ride-hailingu nie działa, jeśli jest tylko wynalazkiem marketingu. RidePass jest oparty na realnej blokadzie ceny — przerzucamy ryzyko szczytu z pasażera na siebie.",
  },
  "sos-1-5s": {
    title: "Jak zbudowaliśmy SOS w 1.5 sekundy",
    date: "22 mar 2026",
    body:
      "SOS musi być oczywisty, nie wymagać decyzji i być bardzo trudny do wywołania przypadkiem. Dlatego zrobiliśmy hold-to-trigger 1.5s z wizualnym progiem i vibrate feedback.",
  },
  "wplyw-eko": { title: "Eco Route — realny wpływ, nie greenwashing", date: "14 mar 2026", body: "Mierzymy CO₂ na przejazd i pokazujemy Ci różnicę w gramach — nie procentach." },
  "driver-first": { title: "Driver-first policy — rok później", date: "02 mar 2026", body: "Minimum 44 zł/h gwarantowane. 0 zwolnień bez wyjaśnienia. Bonusy za Gold tier." },
};

export function generateStaticParams() {
  return Object.keys(CONTENT).map((slug) => ({ slug }));
}

export default function Post({ params }: { params: { slug: string } }) {
  const p = CONTENT[params.slug];
  if (!p) return <PublicShell><div className="p-20 text-center text-white/60">Nie znaleziono.</div></PublicShell>;
  return (
    <PublicShell>
      <article className="mx-auto max-w-2xl px-6 py-20">
        <Link href="/blog" className="text-xs text-white/50 hover:text-white">← Wróć na blog</Link>
        <h1 className="mt-5 font-display text-4xl md:text-5xl font-extrabold leading-[1.1]">{p.title}</h1>
        <div className="mt-2 text-white/50 text-sm">{p.date}</div>
        <div className="mt-8 text-white/80 text-lg leading-relaxed">{p.body}</div>
      </article>
    </PublicShell>
  );
}
