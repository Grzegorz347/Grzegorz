import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  return NextResponse.json({ places: db.savedPlaces });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const place = {
    id: `sp_${Math.random().toString(36).slice(2, 8)}`,
    label: body.label,
    address: body.address,
    icon: body.icon ?? "pin",
    lat: body.lat ?? 52.23,
    lng: body.lng ?? 21.01,
  };
  db.savedPlaces.push(place);
  return NextResponse.json({ place });
}
