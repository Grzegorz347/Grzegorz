import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({ requests: db.requests });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const r = db.requests.find((r) => r.id === id);
  if (!r) return NextResponse.json({ error: "not found" }, { status: 404 });
  r.status = status;
  return NextResponse.json({ request: r });
}
