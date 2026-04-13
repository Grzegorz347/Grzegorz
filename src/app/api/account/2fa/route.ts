import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  db.user.twoFactor = {
    enabled: !!body.enabled,
    method: body.method ?? "totp",
  };
  return NextResponse.json({ twoFactor: db.user.twoFactor });
}
