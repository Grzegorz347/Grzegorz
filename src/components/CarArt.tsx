import * as React from "react";

/** Minimal car silhouette with neon glow, three tiers. */
export function CarArt({
  tier = "economy",
  className = "",
}: {
  tier?: "economy" | "standard" | "xl";
  className?: string;
}) {
  const color =
    tier === "economy" ? "#FF4488" : tier === "standard" ? "#9A5CFF" : "#35C3FF";
  const body = {
    economy: "M10 40 L30 22 L75 20 L110 22 L135 30 L140 40 L140 48 L10 48 Z",
    standard: "M10 42 L28 26 L70 22 L120 24 L140 34 L144 44 L144 50 L10 50 Z",
    xl: "M10 44 L26 28 L70 24 L122 24 L142 30 L150 42 L150 52 L10 52 Z",
  }[tier];

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 blur-2xl opacity-60"
        style={{ background: `radial-gradient(closest-side, ${color}55, transparent 70%)` }}
      />
      <svg viewBox="0 0 160 60" className="relative w-full">
        <defs>
          <linearGradient id={`car-${tier}`} x1="0" x2="1">
            <stop offset="0" stopColor="#F2F6FF" />
            <stop offset="1" stopColor="#9FB0C8" />
          </linearGradient>
          <linearGradient id={`acc-${tier}`} x1="0" x2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.95" />
            <stop offset="1" stopColor="#35C3FF" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d={body} fill={`url(#car-${tier})`} stroke={color} strokeOpacity="0.3" />
        <path d="M28 28 L60 24 L95 24 L115 30 Z" fill="#0b0b12" opacity="0.75" />
        <rect x="118" y="32" width="12" height="5" rx="1" fill={`url(#acc-${tier})`} />
        <rect x="18" y="32" width="10" height="4" rx="1" fill={color} opacity="0.7" />
        <circle cx="38" cy="50" r="8" fill="#0b0b12" stroke={color} strokeOpacity="0.4" />
        <circle cx="38" cy="50" r="4" fill="#1a1a24" />
        <circle cx="118" cy="50" r="8" fill="#0b0b12" stroke={color} strokeOpacity="0.4" />
        <circle cx="118" cy="50" r="4" fill="#1a1a24" />
      </svg>
    </div>
  );
}
