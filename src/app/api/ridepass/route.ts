import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({
    ridePass: db.user.ridePass,
    tiers: [
      { id: "Silver", price: 29, locks: 20, perks: ["Blokada ceny", "Priorytet w deszczu", "5% cashback"] },
      { id: "Gold", price: 59, locks: 60, perks: ["Blokada ceny", "Priorytet zawsze", "10% cashback", "Darmowe upgrade'y"] },
      { id: "Platinum", price: 129, locks: 200, perks: ["Blokada ceny VIP", "Dedykowany support", "15% cashback", "Upgrade XL", "SOS Concierge"] },
    ],
  });
}

export async function POST(req: NextRequest) {
  const { tier } = await req.json();
  db.user.ridePass = {
    tier,
    priceLocksRemaining: tier === "Gold" ? 60 : tier === "Platinum" ? 200 : 20,
    priceLocksTotal: tier === "Gold" ? 60 : tier === "Platinum" ? 200 : 20,
    renewsAt: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10),
  };
  return NextResponse.json({ ridePass: db.user.ridePass });
}
