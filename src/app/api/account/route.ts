import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  const checkup = {
    score: 86,
    items: [
      { id: "2fa", label: "Dwuskładnikowe uwierzytelnianie", status: db.user.twoFactor.enabled ? "ok" : "warn" },
      { id: "passkey", label: "Passkey skonfigurowany", status: db.user.passkeys.length ? "ok" : "warn" },
      { id: "pickupcode", label: "Pickup code włączony", status: db.user.pickupCodeEnabled ? "ok" : "warn" },
      { id: "trusted", label: `${db.user.trustedContacts.length} Trusted Contact(s)`, status: db.user.trustedContacts.length >= 2 ? "ok" : "warn" },
      { id: "phone", label: "Telefon zweryfikowany", status: "ok" },
      { id: "email", label: "E-mail zweryfikowany", status: "ok" },
    ],
  };
  return NextResponse.json({ user: db.user, checkup });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  if (body.name) db.user.name = body.name;
  if (body.email) db.user.email = body.email;
  if (body.phone) db.user.phone = body.phone;
  if (body.language) db.user.language = body.language;
  if (body.communicationPrefs) db.user.communicationPrefs = { ...db.user.communicationPrefs, ...body.communicationPrefs };
  if (typeof body.pickupCodeEnabled === "boolean") db.user.pickupCodeEnabled = body.pickupCodeEnabled;
  return NextResponse.json({ user: db.user });
}
