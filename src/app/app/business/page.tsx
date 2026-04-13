"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

type Company = { id: string; name: string; nip: string; members: number; monthSpendPLN: number; createdAt: string };

export default function Business() {
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => { fetch("/api/companies").then((r) => r.json()).then((d) => setCompanies(d.companies)); }, []);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Lumo for Business</h1>
        <Link href="/app/business/create" className="btn-primary !py-2 !px-4 text-sm"><Icon.Plus size={14} /> Nowa firma</Link>
      </div>
      <p className="text-white/65 max-w-xl">Zarządzaj przejazdami zespołu, wystawiaj vouchery, zbieraj raporty. Mniej kosztu, więcej kontroli niż w Uber for Business.</p>

      {companies.length === 0 ? (
        <div className="card p-10 text-center space-y-3">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lumo-gradient/20 ring-gradient"><Icon.Briefcase size={24} /></span>
          <div className="font-display text-xl font-semibold">Brak firmy — załóż w 30 sekund.</div>
          <Link href="/app/business/create" className="btn-primary inline-flex">Utwórz firmę</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {companies.map((c) => (
            <Link key={c.id} href="/app/business/dashboard" className="card p-5 flex items-center gap-4 hover:-translate-y-0.5 transition">
              <span className="h-12 w-12 rounded-2xl bg-lumo-gradient grid place-items-center font-bold">{c.name[0]}</span>
              <div className="flex-1">
                <div className="font-semibold">{c.name}</div>
                <div className="text-xs text-white/55">NIP {c.nip || "—"} · {c.members} osób</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/60">Ten miesiąc</div>
                <div className="font-semibold">{c.monthSpendPLN.toFixed(0)} zł</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-3">
        <Link href="/app/business/dashboard" className="card p-4 flex items-center gap-3"><Icon.Menu size={16} /> Dashboard</Link>
        <Link href="/app/business/vouchers" className="card p-4 flex items-center gap-3"><Icon.Tag size={16} /> Vouchery</Link>
        <Link href="/app/business/requests" className="card p-4 flex items-center gap-3"><Icon.Car size={16} /> Zgłoszenia</Link>
      </div>
    </div>
  );
}
