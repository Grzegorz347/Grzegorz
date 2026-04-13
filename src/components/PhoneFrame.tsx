import * as React from "react";

export function PhoneFrame({
  children,
  title,
  className = "",
  time = "9:41",
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  time?: string;
}) {
  return (
    <div className={`relative mx-auto w-[340px] sm:w-[360px] ${className}`}>
      <div className="absolute -inset-4 rounded-[3.5rem] bg-lumo-gradient opacity-20 blur-2xl" />
      <div className="relative rounded-[3rem] border border-white/10 bg-ink-950 p-2 shadow-2xl shadow-black/60">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-900 aspect-[9/19.5]">
          {/* Notch */}
          <div className="absolute left-1/2 top-2.5 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
          {/* Status bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold">
            <span>{time}</span>
            <div className="flex items-center gap-1.5">
              <svg width="18" height="10" viewBox="0 0 18 10"><rect x="0" y="4" width="3" height="6" rx="1" fill="#fff"/><rect x="5" y="2.5" width="3" height="7.5" rx="1" fill="#fff"/><rect x="10" y="1" width="3" height="9" rx="1" fill="#fff"/><rect x="15" y="0" width="3" height="10" rx="1" fill="#fff"/></svg>
              <svg width="16" height="10" viewBox="0 0 16 10"><path d="M1 5a9 9 0 0 1 14 0l-1.5 1.5a7 7 0 0 0-11 0L1 5z" fill="#fff"/><circle cx="8" cy="8" r="1.5" fill="#fff"/></svg>
              <svg width="22" height="10" viewBox="0 0 22 10"><rect x="0.5" y="0.5" width="19" height="9" rx="2" stroke="#fff" fill="none"/><rect x="2" y="2" width="15" height="6" rx="1" fill="#fff"/><rect x="20" y="3" width="1.5" height="4" rx="0.75" fill="#fff"/></svg>
            </div>
          </div>
          {/* Content */}
          <div className="absolute inset-0 pt-10">
            {title && (
              <div className="px-5 pb-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                {title}
              </div>
            )}
            <div className="h-full w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
