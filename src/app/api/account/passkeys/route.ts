import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({ passkeys: db.user.passkeys });
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const pk = {
    id: `pk_${Math.random().toString(36).slice(2, 8)}`,
    label: body.label ?? "Nowy passkey",
    createdAt: new Date().toISOString().slice(0, 10),
  };
  db.user.passkeys.push(pk);
  return NextResponse.json({ passkey: pk });
}
