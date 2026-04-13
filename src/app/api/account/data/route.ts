import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function POST() {
  return NextResponse.json({
    requestedAt: new Date().toISOString(),
    estimatedReady: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    sizeBytes: 1.2 * 1024 * 1024,
    caseId: `DATA-${Math.floor(Math.random() * 100000).toString().padStart(5, "0")}`,
    payload: { user: db.user, rides: db.rides, transactions: db.transactions },
  });
}
