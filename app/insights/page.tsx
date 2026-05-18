"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Brain, Flame, Target, Sparkles } from "lucide-react";

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchInsights = () => {
  const email = localStorage.getItem("aivora_user");

  if (email) {
    fetch("http://127.0.0.1:8000/dashboard-insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }
};

fetchInsights();

const interval = setInterval(fetchInsights, 5000);

return () => clearInterval(interval);
    const email = localStorage.getItem("aivora_user");

    if (email) {
      fetch("http://127.0.0.1:8000/dashboard-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: email,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    }
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading AI Insights...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#06b6d470,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />

      <section className="relative z-10 max-w-7xl mx-auto p-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-cyan-300 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-10">
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            AI Insights
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Personalized AI-powered learning analytics for your AIVORA journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Brain className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">AI Level</p>
            <h2 className="text-3xl font-black mt-2">{data.ai_level}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Target className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Most Used Feature</p>
            <h2 className="text-3xl font-black mt-2">
              {data.most_used_feature}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Flame className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Current Streak</p>
            <h2 className="text-3xl font-black mt-2">
              {data.streak} Days
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Sparkles className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Tasks Completed</p>
            <h2 className="text-3xl font-black mt-2">{data.tasks}</h2>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-cyan-400/20 bg-cyan-500/20 backdrop-blur-xl p-6 md:p-8 max-w-full overflow-hidden">
          <h2 className="text-2xl md:text-4xl break-wordsfont-black mb-5">
            Personalized Recommendation
          </h2>

          <p className="text-xl text-cyan-100 leading-relaxed">
            {data.recommendation}
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-gray-400">Current Focus</p>
            <h2 className="text-4xl font-black mt-3">{data.goal}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-gray-400">Total AI History Entries</p>
            <h2 className="text-4xl font-black mt-3">
              {data.history_count}
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
}