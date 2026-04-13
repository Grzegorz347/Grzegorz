import * as React from "react";

type IP = React.SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 20): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const Icon = {
  Home: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5z"/></svg>
  ),
  Car: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M3 13l2-5a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 5"/><path d="M3 13h18v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"/><circle cx="7.5" cy="16.5" r="1"/><circle cx="16.5" cy="16.5" r="1"/></svg>
  ),
  Msg: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M4 5h16v11H8l-4 4V5z"/></svg>
  ),
  User: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
  ),
  Search: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
  ),
  Mic: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
  ),
  Pin: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
  ),
  Building: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M4 21h16M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M14 21V9h4a1 1 0 0 1 1 1v11"/><path d="M9 8h2M9 12h2M9 16h2M16 13h1M16 17h1"/></svg>
  ),
  HomeSolid: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5z"/><path d="M9 15h6v6H9z"/></svg>
  ),
  Bell: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2h-15L6 16z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>
  ),
  Shield: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Wallet: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18"/><circle cx="16" cy="14.5" r="1.2"/></svg>
  ),
  Star: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 5.9L12 17.3 6.7 20l1-5.9L3.4 9.9 9.4 9 12 3.5z"/></svg>
  ),
  Clock: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
  ),
  Arrow: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  ),
  Plus: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M12 5v14M5 12h14"/></svg>
  ),
  Tag: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="8" cy="8" r="1.5"/></svg>
  ),
  Info: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 8v0M11 12h1v5h1"/></svg>
  ),
  Help: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7V14M12 17h.01"/></svg>
  ),
  Logout: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="M10 17 5 12l5-5M5 12h11"/></svg>
  ),
  Briefcase: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>
  ),
  SOS: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M12 3a9 9 0 1 0 9 9M12 3v9l6 3"/></svg>
  ),
  Lock: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>
  ),
  Check: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="m5 12 4 4 10-10"/></svg>
  ),
  Menu: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  ),
  Filter: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M3 5h18l-7 9v5l-4 2v-7L3 5z"/></svg>
  ),
  Sparkle: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>
  ),
  Cash: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Leaf: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M5 20C5 9 14 5 20 4c0 9-5 16-15 16"/><path d="M5 20c3-5 7-8 12-10"/></svg>
  ),
  Flash: ({ size, ...p }: IP) => (
    <svg {...base(size)} {...p}><path d="M13 3 4 14h7l-1 7 9-11h-7l1-7z"/></svg>
  ),
};
