import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const m = db.paymentMethods.find((p) => p.id === params.id);
  if (!m) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ method: m });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const m = db.paymentMethods.find((p) => p.id === params.id);
  if (!m) return NextResponse.json({ error: "not found" }, { status: 404 });
  const body = await req.json();
  if (body.default === true) db.paymentMethods.forEach((p) => (p.default = p.id === m.id));
  if (body.sharedWith) m.sharedWith = body.sharedWith;
  return NextResponse.json({ method: m });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const i = db.paymentMethods.findIndex((p) => p.id === params.id);
  if (i === -1) return NextResponse.json({ error: "not found" }, { status: 404 });
  db.paymentMethods.splice(i, 1);
  return NextResponse.json({ ok: true });
}
