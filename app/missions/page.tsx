"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flame, Trophy, CheckCircle, Circle } from "lucide-react";
 export default function MissionsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchMissions = () => {
      const email = localStorage.getItem("aivora_user");

      if (email) {
        fetch("http://127.0.0.1:8000/daily-missions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: email,
          }),
        })
          .then((res) => res.json())
          .then((result) => setData(result));
      }
    };

    fetchMissions();

    const interval = setInterval(fetchMissions, 5000);

    return () => clearInterval(interval);
  }, []);
  if (!data) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading Daily Missions...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f9731670,transparent_30%),radial-gradient(circle_at_bottom_right,#2563eb70,transparent_30%)]" />

      <section className="relative z-10 max-w-6xl mx-auto p-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-cyan-300 mb-8">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1 className="text-6xl font-black">Daily Missions 🔥</h1>
        <p className="text-gray-400 mt-4 text-lg">
          Complete daily AIVORA missions, build consistency, and grow your AI journey.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Flame className="text-orange-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Current Streak</p>
            <h2 className="text-5xl font-black">{data.streak} Days</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Trophy className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Total Tasks</p>
            <h2 className="text-5xl font-black">{data.tasks}</h2>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          {data.missions.map((mission: any, index: number) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {mission.completed ? (
                  <CheckCircle className="text-green-300 h-8 w-8" />
                ) : (
                  <Circle className="text-gray-400 h-8 w-8" />
                )}

                <div>
                  <h2 className="text-2xl font-black">{mission.title}</h2>
                  <p className="text-gray-400">{mission.reward}</p>
                </div>
              </div>

              <span className={mission.completed ? "text-green-300" : "text-gray-400"}>
                {mission.completed ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}