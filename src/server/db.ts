// Lightweight in-memory "database" for the Lumo demo backend.

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  walletBalance: number;
  rewardsPoints: number;
  language: "pl" | "en" | "de" | "es" | "fr";
  ridePass?: {
    tier: "Silver" | "Gold" | "Platinum";
    priceLocksRemaining: number;
    priceLocksTotal: number;
    renewsAt: string;
  };
  twoFactor: { enabled: boolean; method?: "sms" | "totp" };
  passkeys: { id: string; label: string; createdAt: string; lastUsed?: string }[];
  communicationPrefs: { sms: boolean; email: boolean; push: boolean; marketing: boolean };
  pickupCodeEnabled: boolean;
  trustedContacts: { id: string; name: string; phone: string }[];
};

export type PaymentMethod = {
  id: string;
  kind: "card" | "blik" | "applepay" | "googlepay" | "cash" | "voucher";
  label: string;
  last4?: string;
  brand?: "Visa" | "Mastercard" | "Amex";
  expiry?: string;
  default?: boolean;
  sharedWith?: string[];
};

export type SavedPlace = {
  id: string;
  label: string;
  address: string;
  icon: "home" | "work" | "star" | "pin";
  lat: number;
  lng: number;
};

export type Ride = {
  id: string;
  userId: string;
  tier: "economy" | "standard" | "xl";
  status: "requested" | "matched" | "arriving" | "on_trip" | "completed" | "cancelled" | "scheduled";
  pickup: { label: string; lat: number; lng: number };
  dropoff: { label: string; lat: number; lng: number };
  stops?: { label: string; lat: number; lng: number }[];
  price: number;
  currency: "PLN" | "USD" | "EUR";
  distanceKm: number;
  durationMin: number;
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string;
  rating?: number;
  tip?: number;
  rider?: { name: string; phone: string };
  paymentMethodId?: string;
  driver?: { id: string; name: string; car: string; plate: string; rating: number };
};

export type Transaction = {
  id: string;
  kind: "topup" | "ride" | "reward" | "refund" | "voucher";
  amount: number;
  label: string;
  at: string;
};

export type Promotion = {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  color: string;
  expiresAt: string;
  isNew?: boolean;
};

export type Voucher = {
  id: string;
  code: string;
  amount: number;
  remaining: number;
  expiresAt: string;
  companyId?: string;
};

export type Company = {
  id: string;
  name: string;
  members: number;
  nip: string;
  monthSpendPLN: number;
  createdAt: string;
};

export type BusinessRequest = {
  id: string;
  from: string;
  to: string;
  when: string;
  status: "pending" | "approved" | "rejected";
  amount: number;
  employee: string;
};

const user: User = {
  id: "u_greg",
  name: "Greg",
  email: "greg@lumo.ride",
  phone: "+48 600 100 200",
  walletBalance: 189,
  rewardsPoints: 6882,
  language: "pl",
  ridePass: {
    tier: "Silver",
    priceLocksRemaining: 12,
    priceLocksTotal: 20,
    renewsAt: "2026-05-04",
  },
  twoFactor: { enabled: true, method: "sms" },
  passkeys: [
    { id: "pk1", label: "iPhone 15 Pro · Face ID", createdAt: "2025-11-03", lastUsed: "2026-04-12" },
  ],
  communicationPrefs: { sms: true, email: true, push: true, marketing: false },
  pickupCodeEnabled: true,
  trustedContacts: [
    { id: "tc1", name: "Ania", phone: "+48 600 222 333" },
    { id: "tc2", name: "Mama", phone: "+48 500 111 222" },
  ],
};

const paymentMethods: PaymentMethod[] = [
  { id: "pm_card1", kind: "card", label: "Visa •• 4411", last4: "4411", brand: "Visa", expiry: "07/28", default: true },
  { id: "pm_card2", kind: "card", label: "Mastercard •• 8120", last4: "8120", brand: "Mastercard", expiry: "01/27" },
  { id: "pm_blik", kind: "blik", label: "BLIK" },
  { id: "pm_apay", kind: "applepay", label: "Apple Pay" },
  { id: "pm_cash", kind: "cash", label: "Gotówka" },
];

const savedPlaces: SavedPlace[] = [
  { id: "sp_home", label: "Dom", address: "ul. Wiślana 12, Warszawa", icon: "home", lat: 52.24, lng: 21.02 },
  { id: "sp_work", label: "Biuro", address: "Plac Europejski 2, Warszawa", icon: "work", lat: 52.23, lng: 20.98 },
  { id: "sp_mom", label: "Mama", address: "ul. Kwiatowa 8, Konstancin", icon: "star", lat: 52.09, lng: 21.12 },
];

const rides: Ride[] = [
  {
    id: "r_1001",
    userId: "u_greg",
    tier: "economy",
    status: "completed",
    pickup: { label: "Krabi Airport", lat: 8.09, lng: 98.98 },
    dropoff: { label: "Ao Nang Beach", lat: 8.03, lng: 98.82 },
    price: 267,
    currency: "PLN",
    distanceKm: 28.4,
    durationMin: 38,
    createdAt: "2025-12-25T15:42:00Z",
    completedAt: "2025-12-25T16:20:00Z",
    rating: 5,
    tip: 10,
    paymentMethodId: "pm_card1",
    driver: { id: "d_kev", name: "Kevin", car: "VW Passat", plate: "WR 1230K", rating: 4.93 },
  },
  {
    id: "r_1002",
    userId: "u_greg",
    tier: "standard",
    status: "cancelled",
    pickup: { label: "Krabi Airport", lat: 8.09, lng: 98.98 },
    dropoff: { label: "Railay Beach", lat: 8.0, lng: 98.83 },
    price: 0,
    currency: "PLN",
    distanceKm: 32.1,
    durationMin: 44,
    createdAt: "2025-12-25T10:02:00Z",
  },
  {
    id: "r_1003",
    userId: "u_greg",
    tier: "xl",
    status: "completed",
    pickup: { label: "ul. Marszałkowska 1, Warszawa", lat: 52.23, lng: 21.01 },
    dropoff: { label: "Lotnisko Chopina", lat: 52.17, lng: 20.97 },
    price: 74.9,
    currency: "PLN",
    distanceKm: 11.2,
    durationMin: 21,
    createdAt: "2026-04-10T07:20:00Z",
    completedAt: "2026-04-10T07:41:00Z",
    rating: 5,
    tip: 8,
    paymentMethodId: "pm_card1",
    driver: { id: "d_ada", name: "Adam", car: "VW Passat", plate: "WE 9001A", rating: 4.98 },
  },
  {
    id: "r_1004",
    userId: "u_greg",
    tier: "economy",
    status: "scheduled",
    pickup: { label: "Plac Europejski 2", lat: 52.23, lng: 20.98 },
    dropoff: { label: "ul. Wiślana 12", lat: 52.24, lng: 21.02 },
    price: 22.4,
    currency: "PLN",
    distanceKm: 6.2,
    durationMin: 14,
    createdAt: "2026-04-13T14:00:00Z",
    scheduledAt: "2026-04-14T07:45:00Z",
  },
];

const transactions: Transaction[] = [
  { id: "t1", kind: "topup", amount: 100, label: "Doładowanie BLIK", at: "2026-04-01T10:00:00Z" },
  { id: "t2", kind: "ride", amount: -22.4, label: "Przejazd Economy", at: "2026-04-02T08:14:00Z" },
  { id: "t3", kind: "reward", amount: 0, label: "+240 pkt Rewards", at: "2026-04-02T08:15:00Z" },
  { id: "t4", kind: "topup", amount: 200, label: "Doładowanie karta •• 4411", at: "2026-04-07T19:00:00Z" },
  { id: "t5", kind: "ride", amount: -74.9, label: "Przejazd XL · Lotnisko", at: "2026-04-10T07:41:00Z" },
  { id: "t6", kind: "refund", amount: 14.0, label: "Zwrot — RidePass lock", at: "2026-04-11T12:00:00Z" },
];

const promotions: Promotion[] = [
  { id: "p1", title: "−30% na 5 przejazdów", subtitle: "W godzinach szczytu 7:00–9:00", code: "RUSH30", color: "#FF4488", expiresAt: "2026-05-10", isNew: true },
  { id: "p2", title: "Free upgrade: Economy → Standard", subtitle: "Dla posiadaczy RidePass Silver", code: "SILVERUP", color: "#9A5CFF", expiresAt: "2026-06-01" },
  { id: "p3", title: "Zbierz 2× Rewards", subtitle: "Każdy piątek po 20:00", code: "FRIDAY2X", color: "#35C3FF", expiresAt: "2026-12-31" },
];

const vouchers: Voucher[] = [
  { id: "v1", code: "LUMO-WELCOME-25", amount: 25, remaining: 25, expiresAt: "2026-12-31" },
];

const companies: Company[] = [];
const requests: BusinessRequest[] = [
  { id: "br1", from: "Biuro · Plac Europejski", to: "Lotnisko Chopina", when: "2026-04-14T09:00:00Z", status: "pending", amount: 74.9, employee: "Marta K." },
  { id: "br2", from: "Hotel Marriott", to: "Biuro", when: "2026-04-14T14:30:00Z", status: "approved", amount: 38.4, employee: "Filip W." },
];

export const db = {
  user,
  rides,
  transactions,
  promotions,
  paymentMethods,
  savedPlaces,
  vouchers,
  companies,
  requests,
};

export function estimateFare(distanceKm: number, tier: "economy" | "standard" | "xl", surge = 1) {
  const base = { economy: 6, standard: 9, xl: 12 }[tier];
  const perKm = { economy: 2.4, standard: 3.6, xl: 4.8 }[tier];
  const eta = { economy: "5–7 min", standard: "6–8 min", xl: "7–9 min" }[tier];
  const price = Math.round((base + distanceKm * perKm) * surge * 100) / 100;
  const seats = { economy: 3, standard: 4, xl: 6 }[tier];
  return { price, eta, seats };
}
