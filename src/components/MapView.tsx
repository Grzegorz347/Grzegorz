"use client";
import * as React from "react";

/**
 * Stylized animated map. Pure SVG so we don't need map tiles or API keys —
 * but looks rich: subtle grid, streets, pins, driver car moving along a path.
 */
export function MapView({
  className = "",
  pins = 3,
  animateCar = true,
  route = true,
  height = 300,
}: {
  className?: string;
  pins?: number;
  animateCar?: boolean;
  route?: boolean;
  height?: number;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl map-bg ${className}`} style={{ height }}>
      {/* city streets */}
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="road" x1="0" x2="1">
            <stop offset="0" stopColor="#24243a" />
            <stop offset="1" stopColor="#1a1a28" />
          </linearGradient>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0" stopColor="#FF4488" />
            <stop offset="0.5" stopColor="#9A5CFF" />
            <stop offset="1" stopColor="#35C3FF" />
          </linearGradient>
          <filter id="blur"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>
        {/* streets */}
        {[40, 100, 170, 240, 310, 370].map((y, i) => (
          <line key={i} x1="-20" x2="620" y1={y} y2={y + (i % 2 ? 20 : -15)} stroke="url(#road)" strokeWidth={i % 2 ? 14 : 9} opacity="0.7" />
        ))}
        {[60, 150, 240, 340, 450, 540].map((x, i) => (
          <line key={i} x1={x} x2={x - 10} y1="-20" y2="420" stroke="url(#road)" strokeWidth={i % 2 ? 10 : 14} opacity="0.5" />
        ))}
        {/* blocks shimmer */}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={i}
            x={(i * 83) % 560}
            y={(i * 67) % 360}
            width="34"
            height="22"
            rx="4"
            fill="rgba(255,255,255,0.02)"
          />
        ))}
        {/* route */}
        {route && (
          <>
            <path
              d="M 80 320 C 160 310, 190 240, 260 220 S 380 180, 450 120"
              stroke="url(#grad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              filter="url(#blur)"
              opacity="0.9"
            />
            <path
              d="M 80 320 C 160 310, 190 240, 260 220 S 380 180, 450 120"
              stroke="url(#grad)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            {/* start */}
            <circle cx="80" cy="320" r="8" fill="#fff" />
            <circle cx="80" cy="320" r="4" fill="#050507" />
            {/* end pin */}
            <g transform="translate(450,120)">
              <circle r="14" fill="url(#grad)" opacity="0.28" />
              <circle r="7" fill="url(#grad)" />
              <circle r="2.5" fill="#fff" />
            </g>
          </>
        )}
        {/* extra pins */}
        {Array.from({ length: pins }).map((_, i) => {
          const x = 140 + i * 120;
          const y = 80 + ((i * 47) % 200);
          return (
            <g key={i} transform={`translate(${x},${y})`}>
              <circle r="14" className="animate-pingSoft" fill="#35C3FF" opacity="0.25" />
              <circle r="6" fill="#35C3FF" />
              <circle r="2" fill="#fff" />
            </g>
          );
        })}
        {/* driver car */}
        {animateCar && (
          <g>
            <circle r="9" fill="url(#grad)" opacity="0.25">
              <animateMotion dur="7s" repeatCount="indefinite" path="M 80 320 C 160 310, 190 240, 260 220 S 380 180, 450 120" />
            </circle>
            <g>
              <rect x="-10" y="-6" width="20" height="12" rx="3" fill="#fff" />
              <rect x="-8" y="-4" width="16" height="4" rx="1.5" fill="#35C3FF" opacity="0.6" />
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="M 80 320 C 160 310, 190 240, 260 220 S 380 180, 450 120" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
