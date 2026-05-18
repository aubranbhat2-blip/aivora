"use client";
import HistoryBox from "../components/HistoryBox";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Mic,
  Volume2,
} from "lucide-react";

export default function NotesPage() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTopic(transcript);
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      setListening(false);
      alert("Voice recognition failed: " + event.error);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }

  function speakNotes() {
    if (!notes) return;

    const utterance = new SpeechSynthesisUtterance(notes);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function generateNotes() {
    if (!topic.trim()) return;

    setLoading(true);
    setNotes("");

    try {
      const response = await fetch("http://127.0.0.1:8000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: topic,
        }),
      });

      const data = await response.json();
      setNotes(data.reply);
      const userEmail = localStorage.getItem("aivora_user");

if (userEmail) {
  const currentTasks =
    Number(localStorage.getItem("aivora_tasks") || "12") + 1;

  const currentStreak =
    Number(localStorage.getItem("aivora_streak") || "7") + 1;

  const currentGoal = "Notes Learning";

  localStorage.setItem("aivora_tasks", String(currentTasks));
  localStorage.setItem("aivora_streak", String(currentStreak));
  localStorage.setItem("aivora_goal", currentGoal);
  localStorage.setItem("mission_notes", "true");

  await fetch("http://127.0.0.1:8000/save-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `${userEmail}|${currentGoal}|${currentTasks}|${currentStreak}`,
    }),
  });
  await fetch("http://127.0.0.1:8000/save-history", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: `${userEmail}|||FEATURE_NAME|||USER_INPUT|||${data.reply}`,
  }),
});
}
      localStorage.setItem("mission_notes", "true");
      const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12");
const currentStreak = Number(localStorage.getItem("aivora_streak") || "7");

localStorage.setItem("aivora_tasks", String(currentTasks + 1));
localStorage.setItem("aivora_streak", String(currentStreak + 1));
localStorage.setItem("aivora_goal", "Notes Learning");
    } catch (error) {
      setNotes("Backend connection failed. Make sure FastAPI backend is running.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#14b8a670,transparent_30%),radial-gradient(circle_at_bottom_right,#2563eb70,transparent_30%)]" />
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
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-600/30">
              <BookOpen className="h-8 w-8 text-white" />
            </div>

            <div>
              <h1 className="text-5xl font-black">AIVORA Notes Generator</h1>
              <p className="text-gray-400 mt-2">
                Generate notes for any subject, topic, exam, chapter, or concept.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <label className="text-gray-300">
                Enter Topic / Chapter / Subject
              </label>

              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Example: Machine Learning, Photosynthesis, Indian Polity, Python Loops, Economics Demand..."
                className="mt-3 w-full h-52 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
              />

              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  onClick={startListening}
                  disabled={listening}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-cyan-500/20 hover:text-cyan-300 transition disabled:opacity-60"
                >
                  <Mic size={18} />
                  {listening ? "Listening..." : "Speak"}
                </button>

                <button
                  onClick={speakNotes}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-purple-500/20 hover:text-purple-300 transition"
                >
                  <Volume2 size={18} />
                  Read
                </button>

                <button
                  onClick={() => setTopic("Machine Learning basics")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10"
                >
                  ML Notes
                </button>

                <button
                  onClick={() => setTopic("Python loops with examples")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10"
                >
                  Python Notes
                </button>
              </div>

              <button
                onClick={generateNotes}
                disabled={loading || !topic.trim()}
                className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition disabled:opacity-60"
              >
                <Sparkles size={18} />
                {loading ? "Generating..." : "Generate Notes"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-[500px] overflow-y-auto">
              <BookOpen className="h-10 w-10 text-cyan-300 mb-4" />
              <h3 className="text-2xl font-black mb-5">AIVORA Study Notes</h3>

              <pre className="whitespace-pre-wrap text-gray-300">
                {loading
                  ? "AIVORA is generating your study notes..."
                  : notes || "Your AI-generated notes will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </section>
      <HistoryBox feature="Notes" />
    </main>
  );
}