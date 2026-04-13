import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const i = db.savedPlaces.findIndex((p) => p.id === params.id);
  if (i === -1) return NextResponse.json({ error: "not found" }, { status: 404 });
  db.savedPlaces.splice(i, 1);
  return NextResponse.json({ ok: true });
}
