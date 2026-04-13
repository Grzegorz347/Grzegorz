"use client";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { MapView } from "@/components/MapView";
import { useEffect, useState } from "react";

type User = { name: string; email: string; phone: string; walletBalance: number };

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => { fetch("/api/me").then((r) => r.json()).then((d) => setUser(d.user)); }, []);

  const rows: { icon: keyof typeof Icon; label: string; right?: React.ReactNode; href: string }[] = [
    { icon: "User", label: "Edytuj profil", href: "/app/account/profile" },
    { icon: "Sparkle", label: "RidePass", right: <span className="chip !text-[10px] text-lumo-cyan">Aktywny</span>, href: "/app/ridepass" },
    { icon: "Wallet", label: "Portfel", right: <span className="text-sm text-white/70">{user?.walletBalance.toFixed(0)} zł</span>, href: "/app/wallet" },
    { icon: "Cash", label: "Metody płatności", href: "/app/wallet/methods" },
    { icon: "Tag", label: "Promocje", right: <span className="chip !text-[10px] text-lumo-pink">NOWOŚĆ</span>, href: "/app/promotions" },
    { icon: "Clock", label: "Moje przejazdy", href: "/app/history" },
    { icon: "Shield", label: "Bezpieczeństwo i prywatność", href: "/app/account/security" },
    { icon: "Briefcase", label: "Lumo for Business", href: "/app/business" },
    { icon: "Sparkle", label: "Język", href: "/app/account/language" },
    { icon: "Help", label: "Pomoc", href: "/help" },
    { icon: "Info", label: "O nas", href: "/about" },
  ];

  return (
    <div className="max-w-3xl">
      <div className="relative overflow-hidden rounded-3xl">
        <MapView height={200} route={false} pins={4} animateCar={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-950/50 to-ink-950" />
      </div>

      <div className="-mt-20 relative card p-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-lumo-gradient grid place-items-center font-bold text-2xl ring-2 ring-white/20">
            {user?.name?.[0] ?? "G"}
          </div>
          <div className="flex-1">
            <div className="font-display text-2xl font-bold">{user?.name ?? "—"}</div>
            <div className="text-xs text-white/60">{user?.email} · {user?.phone}</div>
          </div>
          <button className="btn-outline !py-2 !px-3 text-xs">Edytuj</button>
        </div>

        <div className="divide-y divide-white/5 -mx-2">
          {rows.map((r) => {
            const I = Icon[r.icon] as React.ComponentType<{ size?: number }>;
            return (
              <Link key={r.label} href={r.href} className="flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[0.04]">
                <span className="h-9 w-9 rounded-xl grid place-items-center bg-white/[0.04]"><I size={16} /></span>
                <span className="flex-1 font-medium">{r.label}</span>
                {r.right}
                <Icon.Arrow size={14} className="text-white/40" />
              </Link>
            );
          })}
        </div>

        <Link href="/" className="btn-primary w-full flex items-center justify-center gap-2">
          Wyloguj się <Icon.Logout size={16} />
        </Link>
      </div>
    </div>
  );
}
