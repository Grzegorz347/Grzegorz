import { NextRequest, NextResponse } from "next/server";
import { estimateFare } from "@/server/db";

export async function GET(req: NextRequest) {
  const distance = parseFloat(req.nextUrl.searchParams.get("km") || "6.2");
  const surge = parseFloat(req.nextUrl.searchParams.get("surge") || "1");
  const tiers = (["economy", "standard", "xl"] as const).map((tier) => {
    const f = estimateFare(distance, tier, surge);
    return {
      id: tier,
      name: tier === "xl" ? "XL" : tier[0].toUpperCase() + tier.slice(1),
      ...f,
      badge: tier === "standard" ? "Rekomendowany" : undefined,
    };
  });
  return NextResponse.json({ distance, surge, tiers });
}
