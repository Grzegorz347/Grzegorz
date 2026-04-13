"use client";
import { CarArt } from "./CarArt";
import { Icon } from "./icons";
import clsx from "clsx";

export type RideTier = {
  id: "economy" | "standard" | "xl";
  name: string;
  eta: string;
  seats: number;
  price: number;
  badge?: string;
};

export function RideOptionCard({
  tier,
  selected = false,
  onClick,
  currency = "zł",
}: {
  tier: RideTier;
  selected?: boolean;
  onClick?: () => void;
  currency?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative w-full text-left rounded-3xl p-4 transition group",
        selected ? "ring-gradient bg-white/[0.05]" : "hairline bg-white/[0.02] hover:bg-white/[0.04]"
      )}
    >
      {selected && (
        <span className="absolute -top-2 right-4 chip bg-ink-900/80 border-white/20">
          <span className="gradient-text font-semibold">Wybrano</span>
        </span>
      )}
      <div className="flex items-center gap-4">
        <CarArt tier={tier.id} className="w-36 shrink-0 -mt-2" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            {tier.badge && (
              <span className="chip border-white/10 text-[10px] uppercase tracking-widest text-white/70">
                {tier.badge}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
            <span className="inline-flex items-center gap-1"><Icon.Clock size={12} /> {tier.eta}</span>
            <span className="inline-flex items-center gap-1"><Icon.User size={12} /> {tier.seats}</span>
          </div>
          <div className="mt-2 text-xl font-semibold">
            {tier.price.toFixed(2)} <span className="text-white/60 text-sm">{currency}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
