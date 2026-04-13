import * as React from "react";

export function LumoLogo({
  size = 36,
  withRide = true,
  className = "",
}: {
  size?: number;
  withRide?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className="font-display font-bold tracking-tight leading-none gradient-text"
        style={{ fontSize: size }}
      >
        lumo
      </span>
      {withRide && (
        <span
          className="relative px-2.5 py-0.5 rounded-full text-[0.55em] font-semibold tracking-wide text-white ring-gradient"
          style={{ fontSize: size * 0.5 }}
        >
          ride
        </span>
      )}
    </div>
  );
}
