import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const r = db.rides.find((x) => x.id === params.id);
  if (!r) return NextResponse.json({ error: "not found" }, { status: 404 });
  const body = await req.json();
  r.rating = body.rating;
  if (typeof body.tip === "number") r.tip = body.tip;
  return NextResponse.json({ ride: r });
}
