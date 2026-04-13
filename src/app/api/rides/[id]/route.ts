import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const ride = db.rides.find((r) => r.id === params.id);
  if (!ride) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ride });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const ride = db.rides.find((r) => r.id === params.id);
  if (!ride) return NextResponse.json({ error: "not found" }, { status: 404 });
  const body = await req.json();
  if (body.status) ride.status = body.status;
  if (body.status === "completed") ride.completedAt = new Date().toISOString();
  return NextResponse.json({ ride });
}
