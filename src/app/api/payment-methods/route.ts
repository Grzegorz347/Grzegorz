import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({ methods: db.paymentMethods });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = `pm_${Math.random().toString(36).slice(2, 8)}`;
  const method = {
    id,
    kind: body.kind ?? "card",
    label: body.label ?? `Nowa karta •• ${body.last4 ?? "0000"}`,
    last4: body.last4,
    brand: body.brand,
    expiry: body.expiry,
    default: false,
  };
  db.paymentMethods.push(method as any);
  return NextResponse.json({ method });
}
