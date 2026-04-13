import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  const activity = [
    { id: "a1", who: "Adam", title: "Adam · VW Passat", note: "Drive Ride", points: 347, avatar: "A" },
    { id: "a2", who: "Kevin", title: "Kevin · Chinuuyi Ride", note: "Minute Ride", points: 322, avatar: "K" },
    { id: "a3", who: "Emily", title: "Emily · Priority", note: "Upgrade XL", points: 214, avatar: "E" },
    { id: "a4", who: "Lena", title: "Lena · Night Owl", note: "Weekend 2×", points: 180, avatar: "L" },
  ];
  const redeem = [
    { id: "r1", title: "5 zł zniżki", cost: 500 },
    { id: "r2", title: "Upgrade do Standard", cost: 1200 },
    { id: "r3", title: "Darmowy przejazd Economy (do 25 zł)", cost: 2500 },
    { id: "r4", title: "Miesiąc RidePass Silver", cost: 7500 },
  ];
  return NextResponse.json({ points: db.user.rewardsPoints, balancePLN: 47.85, activity, redeem });
}
