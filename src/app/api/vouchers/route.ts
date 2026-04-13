import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({ vouchers: db.vouchers });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const voucher = {
    id: `v_${Math.random().toString(36).slice(2, 8)}`,
    code: body.code ?? `LUMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    amount: body.amount ?? 25,
    remaining: body.amount ?? 25,
    expiresAt: body.expiresAt ?? "2026-12-31",
    companyId: body.companyId,
  };
  db.vouchers.push(voucher);
  return NextResponse.json({ voucher });
}
