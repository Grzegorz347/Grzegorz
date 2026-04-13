"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

type BR = { id: string; from: string; to: string; when: string; status: string; amount: number; employee: string };

export default function Requests() {
  const [requests, setRequests] = useState<BR[]>([]);
  const load = () => fetch("/api/business/requests").then((r) => r.json()).then((d) => setRequests(d.requests));
  useEffect(() => { load(); }, []);
  async function act(id: string, status: "approved" | "rejected") {
    await fetch("/api/business/requests", { method: "PATCH", body: JSON.stringify({ id, status }) });
    load();
  }
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Zgłoszenia</h1>
      <div className="card divide-y divide-white/5">
        {requests.map((r) => (
          <div key={r.id} className="p-4 flex items-center gap-4">
            <span className="h-11 w-11 rounded-full bg-lumo-gradient grid place-items-center font-bold">{r.employee[0]}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium">{r.employee}</div>
              <div className="text-xs text-white/60">{r.from} → {r.to} · {new Date(r.when).toLocaleString("pl-PL")}</div>
            </div>
            <div className="text-sm font-semibold">{r.amount.toFixed(2)} zł</div>
            {r.status === "pending" ? (
              <div className="flex gap-2">
                <button onClick={() => act(r.id, "rejected")} className="btn-outline !py-1.5 !px-3 text-xs">Odrzuć</button>
                <button onClick={() => act(r.id, "approved")} className="btn-primary !py-1.5 !px-3 text-xs">Zatwierdź</button>
              </div>
            ) : (
              <span className={`chip !text-[10px] ${r.status === "approved" ? "text-lumo-cyan" : "text-lumo-pink"}`}>{r.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
