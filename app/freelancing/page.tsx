"use client";
import HistoryBox from "../components/HistoryBox";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  DollarSign,
  Globe,
  Sparkles,
  Mic,
  Volume2,
} from "lucide-react";

export default function FreelancingPage() {
  const [input, setInput] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const steps = [
    "Learn one skill: AI chatbots, websites, automation, or resume design.",
    "Build 3 portfolio projects and upload them on GitHub/LinkedIn.",
    "Create Fiverr, Upwork, and LinkedIn profiles.",
    "Offer beginner services at affordable pricing.",
    "Message local businesses and show your demo work.",
    "Improve your profile every week with new projects.",
  ];

  const services = [
    "AI Chatbot Development",
    "Website Landing Pages",
    "Resume & LinkedIn Optimization",
    "Data Entry Automation",
    "AI Content Creation",
    "Business Automation Tools",
  ];

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
      setInput(transcript);
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

  function speakPlan() {
    if (!plan) return;

    const utterance = new SpeechSynthesisUtterance(plan);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function generatePlan() {
    if (!input.trim()) return;

    setLoading(true);
    setPlan("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/freelancing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();
      setPlan(data.reply);
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
      localStorage.setItem("mission_freelancing", "true");
      const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12");
const currentStreak = Number(localStorage.getItem("aivora_streak") || "7");

localStorage.setItem("aivora_tasks", String(currentTasks + 1));
localStorage.setItem("aivora_streak", String(currentStreak + 1));
    } catch (error) {
      setPlan("Backend connection failed. Make sure FastAPI backend is running.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ec489970,transparent_30%),radial-gradient(circle_at_bottom_right,#2563eb70,transparent_30%)]" />
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
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-600/30">
              <Briefcase className="h-8 w-8 text-white" />
            </div>

            <div>
              <h1 className="text-2xl md:text-5xl break-words font-black">AIVORA Freelancing Mentor</h1>
              <p className="text-gray-400 mt-2">
                Learn freelancing, client communication, pricing, and earning with AI skills.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-black/30 p-6">
              <h2 className="text-3xl font-black mb-6">Step-by-Step Plan</h2>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <CheckCircle className="text-cyan-300 shrink-0" />
                    <p>
                      <b>Step {index + 1}:</b> {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
              <DollarSign className="h-12 w-12 text-green-300 mb-4" />
              <h2 className="text-3xl font-black">Starter Services</h2>

              <div className="mt-5 space-y-3">
                {services.map((service) => (
                  <div
                    key={service}
                    className="rounded-xl bg-white/5 border border-white/10 p-3"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <Globe className="h-10 w-10 text-cyan-300 mb-4" />
              <h3 className="text-2xl font-black">Ask AIVORA Freelancing AI</h3>
              <p className="text-gray-400 mt-3">
                Tell your skill, goal, platform, or problem. AIVORA will generate a freelancing plan.
              </p>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Example: I know basic web development. How can I get my first freelancing client?"
                className="mt-5 w-full h-44 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
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
                  onClick={speakPlan}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-purple-500/20 hover:text-purple-300 transition"
                >
                  <Volume2 size={18} />
                  Read
                </button>

                <button
                  onClick={() => setInput("I know basic AI tools. Suggest freelancing services and pricing.")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10"
                >
                  AI Services
                </button>

                <button
                  onClick={() => setInput("Write a professional client message for offering website development service.")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10"
                >
                  Client Message
                </button>
              </div>

              <button
                onClick={generatePlan}
                disabled={loading || !input.trim()}
                className="mt-6 bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition disabled:opacity-60"
              >
                <Sparkles size={18} />
                {loading ? "Generating..." : "Generate Freelancing Plan"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-[500px] overflow-y-auto">
              <Sparkles className="h-10 w-10 text-pink-300 mb-4" />
              <h3 className="text-2xl font-black mb-5">AIVORA Freelancing Plan</h3>

              <pre className="whitespace-pre-wrap text-gray-300">
                {loading
                  ? "AIVORA is generating your freelancing plan..."
                  : plan || "Your AI freelancing strategy will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </section>
      <HistoryBox feature="Freelancing" />
    </main>
  );
}