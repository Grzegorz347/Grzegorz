import Link from "next/link";
import { PublicShell } from "@/components/PublicShell";
import { Icon } from "@/components/icons";

export default function BusinessPublic() {
  return (
    <PublicShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-lumo-radial" />
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="chip mb-5">Lumo for Business</div>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.02] max-w-3xl">
            Transport firmowy, który <span className="gradient-text">faktycznie się wpina</span> w księgowość.
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">
            Centralne faktury, vouchery, QR-zamówienia, limity per-team, SSO i automatyczny eksport do ERP.
            Wszystko to, czego Uber for Business obiecuje i nie dowozi.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/app/business/create" className="btn-primary">Utwórz firmę</Link>
            <Link href="/app/business/dashboard" className="btn-outline">Zobacz dashboard</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 gap-4">
        {[
          { t: "Central billing", d: "Jedna faktura, wiele centrów kosztów", I: Icon.Cash },
          { t: "Vouchery", d: "Wydruki z QR dla recepcji i eventów", I: Icon.Tag },
          { t: "Policy engine", d: "Limity zł/miesiąc, klasa, strefy, godziny", I: Icon.Shield },
        ].map((f) => (
          <div key={f.t} className="card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-lumo-gradient/20 ring-gradient"><f.I size={18} /></span>
            <div className="font-display text-xl font-semibold mt-4">{f.t}</div>
            <div className="text-sm text-white/65 mt-1">{f.d}</div>
          </div>
        ))}
      </section>
    </PublicShell>
  );
}
