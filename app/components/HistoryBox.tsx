"use client";

import { useEffect, useState } from "react";

export default function HistoryBox({ feature }: { feature: string }) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const email = localStorage.getItem("aivora_user");
    if (!email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `${email}|||${feature}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.history || []);
      });
  }, [feature]);

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6">
      <h2 className="text-3xl font-black mb-5">Previous {feature} History</h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No history yet.</p>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-cyan-300 font-bold mb-2">
                Input: {item.input}
              </p>

              <pre className="whitespace-pre-wrap text-gray-300 text-sm">
                {item.output}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}