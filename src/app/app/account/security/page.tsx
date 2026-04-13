import Link from "next/link";
import { Icon } from "@/components/icons";

const rows = [
  { href: "/app/account/password", label: "Zmień hasło", sub: "Wymagane co 180 dni", icon: Icon.Lock },
  { href: "/app/account/passkey", label: "Passkey", sub: "Bezpieczniej niż hasło", icon: Icon.Sparkle },
  { href: "/app/account/2fa", label: "2FA", sub: "TOTP lub SMS", icon: Icon.Shield },
  { href: "/app/account/checkup", label: "Checkup konta", sub: "Zobacz ocenę bezpieczeństwa", icon: Icon.Check },
  { href: "/app/account/privacy", label: "Centrum prywatności", sub: "Dane, zgody, usunięcie", icon: Icon.Info },
];

export default function Security() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold">Bezpieczeństwo i prywatność</h1>
      <div className="card divide-y divide-white/5">
        {rows.map((r) => {
          const I = r.icon;
          return (
            <Link key={r.href} href={r.href} className="flex items-center gap-3 p-4 hover:bg-white/[0.04] transition">
              <span className="h-9 w-9 rounded-xl bg-white/[0.05] grid place-items-center"><I size={16} /></span>
              <div className="flex-1">
                <div className="font-medium">{r.label}</div>
                <div className="text-xs text-white/55">{r.sub}</div>
              </div>
              <Icon.Arrow size={14} className="text-white/40" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
