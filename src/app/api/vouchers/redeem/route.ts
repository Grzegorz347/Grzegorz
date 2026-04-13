import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const code = String(body.code ?? "").toUpperCase().trim();
  if (!code) return NextResponse.json({ error: "Brak kodu" }, { status: 400 });
  const v = db.vouchers.find((x) => x.code === code);
  if (!v) {
    // Accept LUMO-* codes as demo success
    if (code.startsWith("LUMO")) {
      db.user.walletBalance += 25;
      db.transactions.unshift({
        id: `t_${Math.random().toString(36).slice(2, 8)}`,
        kind: "voucher",
        amount: 25,
        label: `Voucher ${code}`,
        at: new Date().toISOString(),
      });
      return NextResponse.json({ ok: true, amount: 25, wallet: db.user.walletBalance });
    }
    return NextResponse.json({ error: "Kod nieprawidłowy" }, { status: 404 });
  }
  if (v.remaining <= 0) return NextResponse.json({ error: "Voucher wykorzystany" }, { status: 410 });
  const add = v.remaining;
  v.remaining = 0;
  db.user.walletBalance += add;
  db.transactions.unshift({
    id: `t_${Math.random().toString(36).slice(2, 8)}`,
    kind: "voucher",
    amount: add,
    label: `Voucher ${code}`,
    at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true, amount: add, wallet: db.user.walletBalance });
}
