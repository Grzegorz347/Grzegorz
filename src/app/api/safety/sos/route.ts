import { NextResponse } from "next/server";

export async function POST() {
  // In a real app we'd dispatch to emergency services + share live location.
  return NextResponse.json({
    ok: true,
    message: "SOS wywołany. Dyspozytor Lumo dołącza do połączenia.",
    dispatchedAt: new Date().toISOString(),
    caseId: `SOS-${Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0")}`,
  });
}
