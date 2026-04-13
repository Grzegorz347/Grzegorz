import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const r = db.rides.find((x) => x.id === params.id);
  if (!r) return NextResponse.json({ error: "not found" }, { status: 404 });
  const base = Math.round((r.price * 0.82) * 100) / 100;
  const vat = Math.round((r.price * 0.18) * 100) / 100;
  return NextResponse.json({
    receipt: {
      id: `rc_${r.id.slice(2)}`,
      rideId: r.id,
      issuedAt: r.completedAt ?? r.createdAt,
      items: [
        { label: "Przejazd", amount: base },
        { label: "VAT 23%", amount: vat },
        { label: "Napiwek", amount: r.tip ?? 0 },
      ],
      total: base + vat + (r.tip ?? 0),
      currency: r.currency,
    },
  });
}

export async function POST(_: NextRequest, { params }: { params: { id: string } }) {
  const r = db.rides.find((x) => x.id === params.id);
  if (!r) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ sent: true, to: db.user.email, at: new Date().toISOString() });
}
