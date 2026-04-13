import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

/** Demo-only: any valid-looking email / phone logs you in as Greg. */
export async function POST(req: NextRequest) {
  const { identifier } = await req.json();
  if (!identifier || typeof identifier !== "string" || identifier.length < 3) {
    return NextResponse.json({ error: "Nieprawidłowy identyfikator" }, { status: 400 });
  }
  return NextResponse.json({
    ok: true,
    user: db.user,
    token: `demo.${Buffer.from(identifier).toString("base64url")}`,
  });
}
