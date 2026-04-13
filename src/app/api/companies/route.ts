import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({ companies: db.companies });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const c = {
    id: `co_${Math.random().toString(36).slice(2, 8)}`,
    name: body.name,
    nip: body.nip ?? "",
    members: 1,
    monthSpendPLN: 0,
    createdAt: new Date().toISOString(),
  };
  db.companies.push(c);
  return NextResponse.json({ company: c });
}
