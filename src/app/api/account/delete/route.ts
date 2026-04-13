import { NextResponse } from "next/server";

export async function POST() {
  // Demo: we don't actually delete — just confirm scheduled deletion.
  return NextResponse.json({
    ok: true,
    scheduledAt: new Date().toISOString(),
    completesAt: new Date(Date.now() + 30 * 864e5).toISOString(),
    caseId: `DEL-${Math.floor(Math.random() * 100000).toString().padStart(5, "0")}`,
  });
}
