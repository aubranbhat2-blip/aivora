"use client";
import HistoryBox from "../components/HistoryBox";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  FileText,
  Sparkles,
  Mic,
  Volume2,
} from "lucide-react";

export default function ResumePage() {
  
  const [input, setInput] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Please use Chrome browser for voice assistant.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  }

  function speakResume() {
    if (!resume) return;

    const utterance = new SpeechSynthesisUtterance(resume);

    utterance.lang = "en-IN";
    utterance.rate = 0.95;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function generateResume() {
    if (!input.trim()) return;

    setLoading(true);
    setResume("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();

      setResume(data.reply);
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
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-history`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: `${userEmail}|||FEATURE_NAME|||USER_INPUT|||${data.reply}`,
  }),
});
}
      localStorage.setItem("mission_resume", "true");
      const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12");
const currentStreak = Number(localStorage.getItem("aivora_streak") || "7");

localStorage.setItem("aivora_tasks", String(currentTasks + 1));
localStorage.setItem("aivora_streak", String(currentStreak + 1));

    } catch (error) {
      setResume("Backend connection failed.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />

      <section className="relative z-10 p-6 max-w-7xl mx-auto">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-cyan-300 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8">

          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>

            <div>
              <h1 className="text-5xl font-black">
                AIVORA Resume Builder
              </h1>

              <p className="text-gray-400 mt-2">
                Create professional AI-generated resumes instantly.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">

              <label className="text-gray-300">
                Tell about yourself
              </label>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Example: I am a BCA student skilled in Python, web development, and AI..."
                className="mt-3 w-full h-52 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
              />

              <div className="flex gap-3 mt-5">

                <button
                  onClick={startListening}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
                >
                  <Mic size={18} />
                  Speak
                </button>

                <button
                  onClick={speakResume}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-purple-500/20 hover:text-purple-300 transition"
                >
                  <Volume2 size={18} />
                  Read
                </button>

              </div>

              <button
                onClick={generateResume}
                disabled={loading}
                className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition disabled:opacity-60"
              >
                <Sparkles size={18} />
                {loading ? "Generating..." : "Generate Resume"}
              </button>

            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-200">
                {loading
                  ? "AIVORA is generating your professional resume..."
                  : resume || "Your AI-generated resume will appear here..."}
              </pre>
            </div>

          </div>

        </div>

      </section>
      <HistoryBox feature="Resume" />
    </main>
  );
}