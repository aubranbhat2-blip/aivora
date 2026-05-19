"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useProtectedRoute from "@/lib/useProtectedRoute";
import {
  ArrowLeft,
  Brain,
  Flame,
  Rocket,
  Target,
  Trophy,
  BookOpenCheck,
} from "lucide-react";

export default function ProfilePage() {
  useProtectedRoute();
  const [user, setUser] = useState("");
  const [progressData, setProgressData] = useState({
    goal: "AI Engineer",
    tasks: 0,
    streak: 0,
  });

  const [missions, setMissions] = useState([
    { key: "mission_roadmap", title: "Generate your first roadmap", done: false },
    { key: "mission_resume", title: "Create your AI resume", done: false },
    { key: "mission_interview", title: "Practice AI interview", done: false },
    { key: "mission_coding", title: "Use Coding Mentor", done: false },
    { key: "mission_notes", title: "Generate study notes", done: false },
    { key: "mission_news", title: "Read AI Daily News", done: false },
    { key: "mission_learning", title: "Create learning plan", done: false },
    { key: "mission_freelancing", title: "Start freelancing plan", done: false },
  ]);

  useEffect(() => {
    const email = localStorage.getItem("aivora_user");

    if (!email) return;

    setUser(email);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProgressData({
          goal: data.goal || "AI Engineer",
          tasks: data.tasks || 0,
          streak: data.streak || 0,
        });
      });

    setMissions((prev) =>
      prev.map((m) => ({
        ...m,
        done: localStorage.getItem(m.key) === "true",
      }))
    );
  }, []);

  const completed = missions.filter((m) => m.done).length;
  const missionProgress = Math.round((completed / missions.length) * 100);

  function logout() {
    localStorage.removeItem("aivora_user");
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />

      <section className="relative z-10 p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-cyan-300">
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

          <button
            
  onClick={logout}
  className="rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-red-300 hover:bg-red-500/20 transition"
>
  Logout
</button>
        </div>

        <div className="flex items-center gap-5 mb-8">
          <div className="h-24 w-24 rounded-3xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-4xl font-black">
            A
          </div>

          <div>
            <h1 className="text-5xl font-black">AIVORA Profile</h1>
            <p className="text-cyan-300 mt-2 text-lg">
              {user || "AURIX AI Student Dashboard"}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Flame className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Streak</p>
            <h2 className="text-5xl font-black mt-2">{progressData.streak} Days</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Trophy className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Rank</p>
            <h2 className="text-5xl font-black mt-2">
              #{Math.max(1, 100 - progressData.tasks)}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <BookOpenCheck className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Tasks</p>
            <h2 className="text-5xl font-black mt-2">{progressData.tasks} Done</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Target className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Last Activity</p>
            <h2 className="text-3xl font-black mt-2">{progressData.goal}</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-8">
            <Brain className="text-cyan-300 h-12 w-12 mb-5" />
            <h2 className="text-5xl font-black mb-8">Skill Progress</h2>

            {[
              { name: "Learning Activity", value: Math.min(100, progressData.tasks * 4) },
              { name: "Platform Progress", value: missionProgress },
              { name: "Consistency", value: Math.min(100, progressData.streak * 8) },
            ].map((skill) => (
              <div key={skill.name} className="mb-8">
                <div className="flex justify-between mb-3">
                  <span className="text-2xl">{skill.name}</span>
                  <span className="text-cyan-300 text-2xl font-black">{skill.value}%</span>
                </div>

                <div className="h-5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-8">
            <Rocket className="text-purple-300 h-12 w-12 mb-5" />

            <h2 className="text-5xl font-black mb-5">AI Activity Tracker</h2>

            <p className="text-gray-400 text-xl leading-relaxed mb-6">
              Complete missions by using AIVORA features.
            </p>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Mission Progress</span>
                <span className="text-cyan-300 font-black">{missionProgress}%</span>
              </div>
              <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                  style={{ width: `${missionProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-4 max-h-[430px] overflow-y-auto pr-2">
              {missions.map((mission) => (
                <div
                  key={mission.key}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  {mission.done ? "✅" : "⬜"} {mission.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
  <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
    About AIVORA
  </h2>

  <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
    AIVORA is an AI-powered learning and productivity platform designed to help
    students, creators, and future innovators build careers with Artificial Intelligence.
  </p>

  <div className="mt-8 space-y-2 text-gray-300">
    <p className="text-xl font-bold">🚀 Founder — Aubran Bhat</p>
    <p>📧 aubranbhat2@gmail.com</p>
    <p>📍 J&amp;K, India</p>
  </div>
</div>
<Link
  href="/insights"
  className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-6 py-4 text-cyan-300 hover:bg-cyan-500/20 transition"
>
   View AI Insights
</Link>
      </section>
    </main>
  );
}