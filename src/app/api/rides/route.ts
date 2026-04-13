import { NextRequest, NextResponse } from "next/server";
import { db, estimateFare } from "@/server/db";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const rides = status
    ? db.rides.filter((r) => r.status === status)
    : db.rides;
  return NextResponse.json({ rides });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    tier = "economy",
    distanceKm = 6.2,
    pickup,
    dropoff,
    surge = 1,
  }: {
    tier: "economy" | "standard" | "xl";
    distanceKm?: number;
    pickup: { label: string; lat: number; lng: number };
    dropoff: { label: string; lat: number; lng: number };
    surge?: number;
  } = body;

  const fare = estimateFare(distanceKm, tier, surge);

  const ride = {
    id: `r_${Math.random().toString(36).slice(2, 8)}`,
    userId: db.user.id,
    tier,
    status: "matched" as const,
    pickup,
    dropoff,
    price: fare.price,
    currency: "PLN" as const,
    distanceKm,
    durationMin: Math.round(distanceKm * 2.4),
    createdAt: new Date().toISOString(),
    driver: {
      id: "d_emi",
      name: "Emily Roberton",
      car: "VW Passat",
      plate: "WE 2211P",
      rating: 4.95,
    },
  };
  db.rides.unshift(ride);
  return NextResponse.json({ ride });
}
