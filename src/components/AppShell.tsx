"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
import { LumoLogo } from "./Logo";
import * as React from "react";

const nav = [
  { href: "/app", label: "Home", icon: Icon.Home },
  { href: "/app/book", label: "Rides", icon: Icon.Car },
  { href: "/app/history", label: "History", icon: Icon.Clock },
  { href: "/app/wallet", label: "Wallet", icon: Icon.Wallet },
  { href: "/app/ridepass", label: "RidePass", icon: Icon.Sparkle },
  { href: "/app/rewards", label: "Rewards", icon: Icon.Star },
  { href: "/app/safety", label: "Safety", icon: Icon.Shield },
  { href: "/app/account", label: "Account", icon: Icon.User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link href="/app" className="flex items-center gap-3">
            <LumoLogo size={26} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex chip">
              <span className="h-1.5 w-1.5 rounded-full bg-lumo-cyan animate-pulseGlow" />
              Aktualna lokalizacja · Warszawa, Tuwim
            </div>
            <Link href="/app/notifications" className="relative h-10 w-10 rounded-full glass grid place-items-center" aria-label="Notifications">
              <Icon.Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-lumo-pink shadow-glowPink" />
            </Link>
            <Link href="/app/account" className="h-10 w-10 overflow-hidden rounded-full ring-gradient grid place-items-center bg-ink-800">
              <span className="gradient-text font-bold text-sm">G</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <nav className="sticky top-20 card p-2">
            {nav.map((n) => {
              const active = path === n.href || (n.href !== "/app" && path?.startsWith(n.href));
              const I = n.icon;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "ring-gradient bg-white/[0.04] text-white"
                      : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-xl ${
                      active ? "bg-lumo-gradient" : "bg-white/[0.04]"
                    }`}
                  >
                    <I size={16} />
                  </span>
                  <span>{n.label}</span>
                </Link>
              );
            })}
            <div className="mx-3 my-3 h-px bg-white/5" />
            <Link href="/" className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.04]">
              <Icon.Logout size={16} /> Wyloguj się
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 pb-28 lg:pb-6">{children}</main>
      </div>

      {/* Mobile tab bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/5 bg-ink-950/80 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {nav.slice(0, 5).map((n) => {
            const active = path === n.href || (n.href !== "/app" && path?.startsWith(n.href));
            const I = n.icon;
            return (
              <Link key={n.href} href={n.href} className="flex flex-col items-center gap-1 px-2 py-1.5">
                <span className={`grid h-9 w-9 place-items-center rounded-2xl ${active ? "bg-lumo-gradient shadow-glow" : "bg-white/5"}`}>
                  <I size={18} />
                </span>
                <span className={`text-[10px] ${active ? "text-white" : "text-white/50"}`}>{n.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
