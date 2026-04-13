import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumo — Ride beyond the ordinary",
  description:
    "Lumo Ride — the next-generation ride-hailing experience. Commute Mode, RidePass, Rewards Wallet, safety-first design. Better than Uber or Bolt.",
  themeColor: "#050507",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink-950 text-white antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-lumo-radial" />
        {children}
      </body>
    </html>
  );
}
