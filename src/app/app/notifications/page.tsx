"use client";
import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Icon } from "@/components/icons";

type Notif = {
  id: string;
  title: string;
  body: string;
  at: string;
  kind: "ride" | "wallet" | "promo" | "safety" | "system";
  unread?: boolean;
  href?: string;
};

const INITIAL: Notif[] = [
  { id: "n1", kind: "ride", title: "Jutro 7:45 — auto zamówione", body: "Plac Europejski 2 → ul. Wiślana 12. Price Lock 22,40 zł.", at: "2 min temu", unread: true, href: "/app/history/r_1004" },
  { id: "n2", kind: "promo", title: "Nowa promocja: RUSH30", body: "−30% na 5 przejazdów w godzinach szczytu do 10 maja.", at: "godzinę temu", unread: true, href: "/app/promotions" },
  { id: "n3", kind: "wallet", title: "+14 zł zwrotu", body: "RidePass Silver zablokował cenę przy surge 1.8×.", at: "wczoraj", unread: true, href: "/app/wallet" },
  { id: "n4", kind: "safety", title: "Trusted Contacts zaktualizowane", body: "Ania dodana do kontaktów bezpieczeństwa.", at: "3 dni temu", href: "/app/safety" },
  { id: "n5", kind: "system", title: "Zalogowano na iPhone 15 Pro", body: "Face ID · Warszawa. Jeśli to nie Ty — kliknij tutaj.", at: "5 dni temu", href: "/app/account/security" },
  { id: "n6", kind: "ride", title: "Kierowca ocenił Cię 5★", body: "Adam napisał: „Super rozmowa, polecam!”", at: "10 kwi", href: "/app/history/r_1003" },
];

const KIND_ICON = {
  ride: Icon.Car,
  wallet: Icon.Wallet,
  promo: Icon.Tag,
  safety: Icon.Shield,
  system: Icon.Bell,
} as const;

const KIND_COLOR = {
  ride: "from-lumo-violet/25 to-lumo-blue/25",
  wallet: "from-lumo-pink/25 to-lumo-magenta/25",
  promo: "from-lumo-pink/25 to-lumo-violet/25",
  safety: "from-emerald-500/25 to-lumo-cyan/25",
  system: "from-white/10 to-white/5",
};

export default function Notifications() {
  const [list, setList] = useState<Notif[]>(INITIAL);
  const [filter, setFilter] = useState<"all" | "unread" | Notif["kind"]>("all");

  const unread = list.filter((n) => n.unread).length;
  const filtered = list.filter((n) => filter === "all" ? true : filter === "unread" ? n.unread : n.kind === filter);

  function markAll() {
    setList((l) => l.map((n) => ({ ...n, unread: false })));
  }
  function open(n: Notif) {
    setList((l) => l.map((x) => (x.id === n.id ? { ...x, unread: false } : x)));
  }

  return (
    <AppShell>
      <header className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Powiadomienia</h1>
          <p className="text-sm text-white/60 mt-1">{unread > 0 ? `${unread} nowych` : "Wszystko przeczytane"}</p>
        </div>
        <button onClick={markAll} className="btn-outline !py-2 !px-4 text-sm">Oznacz wszystkie jako przeczytane</button>
      </header>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {([
          ["all", "Wszystkie"],
          ["unread", "Nowe"],
          ["ride", "Przejazdy"],
          ["promo", "Promocje"],
          ["wallet", "Portfel"],
          ["safety", "Bezpieczeństwo"],
          ["system", "System"],
        ] as const).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`chip whitespace-nowrap transition ${filter === k ? "ring-gradient bg-lumo-gradient/15 text-white" : ""}`}
          >
            {l}
          </button>
        ))}
      </div>

      <section className="mt-4 space-y-2">
        {filtered.length === 0 && (
          <div className="card p-10 text-center text-white/50 text-sm">Nic tu jeszcze nie ma.</div>
        )}
        {filtered.map((n) => {
          const I = KIND_ICON[n.kind];
          const content = (
            <div className={`card p-4 flex items-start gap-3 transition ${n.unread ? "ring-gradient" : ""}`}>
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${KIND_COLOR[n.kind]}`}>
                <I size={18} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{n.title}</div>
                  {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-lumo-pink shadow-glowPink" />}
                </div>
                <div className="text-sm text-white/65 mt-0.5">{n.body}</div>
                <div className="text-xs text-white/40 mt-1">{n.at}</div>
              </div>
            </div>
          );
          return n.href ? (
            <Link key={n.id} href={n.href} onClick={() => open(n)}>{content}</Link>
          ) : (
            <button key={n.id} onClick={() => open(n)} className="w-full text-left">{content}</button>
          );
        })}
      </section>

      <section className="mt-8 card p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5"><Icon.User size={16} /></span>
          <div className="flex-1">
            <div className="font-semibold">Preferencje powiadomień</div>
            <div className="text-xs text-white/60">SMS, e-mail, push, marketing.</div>
          </div>
          <Link href="/app/account/profile" className="btn-outline !py-2 !px-4 text-sm">Ustaw</Link>
        </div>
      </section>
    </AppShell>
  );
}
