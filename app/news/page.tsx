"use client";
import HistoryBox from "../components/HistoryBox";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Newspaper,
  Sparkles,
  Brain,
  Rocket,
  Bot,
} from "lucide-react";

export default function NewsPage() {
  const [topic, setTopic] = useState("Give me today's AI news for students");
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateNews() {
    setLoading(true);
    setNews("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: topic,
        }),
      });

      const data = await response.json();
      setNews(data.reply);
      const userEmail = localStorage.getItem("aivora_user");

if (userEmail) {
  const currentTasks =
    Number(localStorage.getItem("aivora_tasks") || "12") + 1;

  const currentStreak =
    Number(localStorage.getItem("aivora_streak") || "7") + 1;

  const currentGoal = "AIVORA Learning";

  localStorage.setItem("aivora_tasks", String(currentTasks));
  localStorage.setItem("aivora_streak", String(currentStreak));
  localStorage.setItem("aivora_goal", currentGoal);

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `${userEmail}|${currentGoal}|${currentTasks}|${currentStreak}`,
    }),
  });
}
      localStorage.setItem("mission_news", "true");
      const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12");
const currentStreak = Number(localStorage.getItem("aivora_streak") || "7");

localStorage.setItem("aivora_tasks", String(currentTasks + 1));
localStorage.setItem("aivora_streak", String(currentStreak + 1));
    } catch (error) {
      setNews("Backend connection failed. Make sure FastAPI backend is running.");
    }

    setLoading(false);
  }

  const cards = [
    {
      title: "AI Tools",
      desc: "Discover new tools for students, creators, and developers.",
      icon: Brain,
    },
    {
      title: "AI Careers",
      desc: "Stay updated with AI jobs, skills, and opportunities.",
      icon: Rocket,
    },
    {
      title: "AI Learning",
      desc: "Get daily learning direction for your AI journey.",
      icon: Bot,
    },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

      <section className="relative z-10 p-6 max-w-7xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-cyan-300 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Newspaper className="h-8 w-8 text-white" />
            </div>

            <div>
              <h1 className="text-5xl font-black">AI Daily News</h1>
              <p className="text-gray-400 mt-2 text-lg">
                AI updates, tools, career trends, and learning insights by AUBRIX.AI.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {cards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 hover:-translate-y-2 transition duration-300"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h2 className="text-2xl font-black">{item.title}</h2>
                  <p className="text-gray-400 mt-3">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <label className="text-gray-300">Ask for AI news briefing</label>

              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-3 w-full h-40 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
              />

              <button
                onClick={generateNews}
                disabled={loading}
                className="mt-5 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition disabled:opacity-60"
              >
                <Sparkles size={18} />
                {loading ? "Generating..." : "Generate AI News"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-[400px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-200">
                {loading
                  ? "AUBRIX.AI is preparing your AI news briefing..."
                  : news || "Your AI news briefing will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </section>
      <HistoryBox feature="News" />
    </main>
  );
}