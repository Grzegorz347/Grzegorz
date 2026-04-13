import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({
    balance: db.user.walletBalance,
    currency: "PLN",
    transactions: db.transactions.slice().reverse(),
  });
}

export async function POST(req: NextRequest) {
  const { amount, kind = "topup", label = "Doładowanie" } = await req.json();
  db.user.walletBalance = Math.round((db.user.walletBalance + amount) * 100) / 100;
  const tx = {
    id: `t_${Date.now()}`,
    kind,
    amount,
    label,
    at: new Date().toISOString(),
  };
  db.transactions.push(tx);
  return NextResponse.json({ balance: db.user.walletBalance, tx });
}
