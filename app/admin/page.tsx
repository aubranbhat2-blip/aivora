"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Activity,
  Database,
  History,
  Shield,
} from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
  const userEmail = localStorage.getItem("aivora_user");

  const adminEmails = [
    "Demo@gmail.com",
    "aanifmalik3@gmail.com",
  ];

  if (!userEmail || !adminEmails.includes(userEmail)) {
    window.location.href = "/dashboard";
    return;
  }

  fetch("http://127.0.0.1:8000/admin-stats")
    .then((res) => res.json())
    .then((data) => setStats(data));
}, []);

  if (!stats) {
    return (
      <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading admin dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />

      <section className="relative z-10 p-6 max-w-7xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-cyan-300 mb-6">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-red-500 to-purple-600 flex items-center justify-center">
            <Shield className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-5xl font-black">AIVORA Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Users, progress, AI history, and platform analytics.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Users className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Total Users</p>
            <h2 className="text-5xl font-black">{stats.users_count}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <Activity className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">Progress Records</p>
            <h2 className="text-5xl font-black">{stats.progress_count}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <History className="text-cyan-300 h-10 w-10 mb-4" />
            <p className="text-gray-400">AI History Entries</p>
            <h2 className="text-5xl font-black">{stats.history_count}</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-3xl font-black mb-5">Users</h2>

            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {stats.users.map((user: any) => (
                <div key={user.id} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-cyan-300 font-bold">{user.email}</p>
                  <p className="text-gray-500 text-sm">Joined: {user.created_at}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <h2 className="text-3xl font-black mb-5">User Progress</h2>

            <div className="space-y-3 max-h-[420px] overflow-y-auto">
              {stats.progress.map((item: any) => (
                <div key={item.id} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-cyan-300 font-bold">{item.email}</p>
                  <p className="text-gray-300">Last Activity: {item.goal}</p>
                  <p className="text-gray-400">Tasks: {item.tasks} | Streak: {item.streak}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="flex items-center gap-3 mb-5">
            <Database className="text-cyan-300" />
            <h2 className="text-3xl font-black">Recent AI History</h2>
          </div>

          <div className="space-y-4 max-h-[520px] overflow-y-auto">
            {stats.history
              .slice()
              .reverse()
              .map((item: any) => (
                <div key={item.id} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <div className="flex flex-wrap justify-between gap-3 mb-3">
                    <p className="text-cyan-300 font-bold">{item.feature}</p>
                    <p className="text-gray-500 text-sm">{item.email}</p>
                  </div>

                  <p className="text-gray-300 mb-2">
                    <b>Input:</b> {item.input}
                  </p>

                  <pre className="whitespace-pre-wrap text-gray-400 text-sm line-clamp-6">
                    {item.output}
                  </pre>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}