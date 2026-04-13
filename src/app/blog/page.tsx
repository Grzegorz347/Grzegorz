import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";

const posts = [
  { slug: "dlaczego-commute-mode", title: "Dlaczego Commute Mode zmienia codzienne dojazdy", date: "12 kwi 2026", tag: "Produkt" },
  { slug: "ridepass-ekonomia", title: "RidePass: ekonomia subskrypcji w ride-hailingu", date: "05 kwi 2026", tag: "Biznes" },
  { slug: "sos-1-5s", title: "Jak zbudowaliśmy SOS w 1.5 sekundy", date: "22 mar 2026", tag: "Bezpieczeństwo" },
  { slug: "wplyw-eko", title: "Eco Route — realny wpływ, nie greenwashing", date: "14 mar 2026", tag: "Klimat" },
  { slug: "driver-first", title: "Driver-first policy — rok później", date: "02 mar 2026", tag: "Kierowcy" },
];

export default function Blog() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="font-display text-5xl md:text-6xl font-extrabold">Blog Lumo.</h1>
        <p className="mt-3 text-white/65 max-w-xl">Produkt, badania, historie kierowców i pasażerów.</p>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card relative overflow-hidden p-6 hover:-translate-y-0.5 transition">
              <div className={`absolute -right-10 -top-10 h-44 w-44 rounded-full blur-2xl ${i % 2 ? "bg-lumo-cyan/20" : "bg-lumo-pink/20"}`} />
              <div className="relative">
                <div className="chip !text-[10px]">{p.tag}</div>
                <h2 className="mt-4 font-display text-2xl font-semibold">{p.title}</h2>
                <div className="mt-2 text-xs text-white/50">{p.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
