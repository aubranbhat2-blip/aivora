"use client";
import HistoryBox from "../components/HistoryBox";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Code2,
  Database,
  Bot,
  Rocket,
  Sparkles,
  Mic,
  Volume2,
} from "lucide-react";

export default function LearningPage() {
  const [topic, setTopic] = useState("");
  const [learningPlan, setLearningPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const courses = [
    {
      icon: Code2,
      title: "Python Fundamentals",
      desc: "Learn variables, loops, functions, and problem solving.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      desc: "Understand supervised and unsupervised learning.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Bot,
      title: "Deep Learning",
      desc: "Learn neural networks and AI models.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Database,
      title: "Data Science",
      desc: "Analyze data using Pandas and visualization tools.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Rocket,
      title: "AI Projects",
      desc: "Build real-world AI/ML projects for portfolio.",
      color: "from-cyan-500 to-indigo-500",
    },
    {
      icon: Sparkles,
      title: "Prompt Engineering",
      desc: "Learn how to use ChatGPT and AI tools effectively.",
      color: "from-pink-500 to-rose-500",
    },
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

  function speakLearningPlan() {
    if (!learningPlan) return;

    const utterance = new SpeechSynthesisUtterance(learningPlan);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function generateLearningPlan() {
    if (!topic.trim()) return;

    setLoading(true);
    setLearningPlan("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: topic,
        }),
      });

      const data = await response.json();
      setLearningPlan(data.reply);
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

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `${userEmail}|${currentGoal}|${currentTasks}|${currentStreak}`,
    }),
  });
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-history", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: `${userEmail}|||FEATURE_NAME|||USER_INPUT|||${data.reply}`,
  }),
});
}
      localStorage.setItem("mission_learning", "true");
      const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12");
const currentStreak = Number(localStorage.getItem("aivora_streak") || "7");

localStorage.setItem("aivora_tasks", String(currentTasks + 1));
localStorage.setItem("aivora_streak", String(currentStreak + 1));
    } catch (error) {
      setLearningPlan("Backend connection failed. Make sure FastAPI backend is running.");
    }

    setLoading(false);
  }

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
          <div className="mb-10">
            <h1 className="text-5xl font-black">
              AIVORA Learning Hub 🚀
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Learn any subject, skill, course, or concept with AURIX AI-powered guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => {
              const Icon = course.icon;

              return (
                <div
                  key={course.title}
                  className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 hover:-translate-y-2 transition duration-300"
                >
                  <div
                    className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h2 className="text-2xl font-black">
                    {course.title}
                  </h2>

                  <p className="text-gray-400 mt-3">
                    {course.desc}
                  </p>

                  <button
                    onClick={() => setTopic(course.title)}
                    className={`mt-6 bg-gradient-to-r ${course.color} px-5 py-3 rounded-xl font-black hover:scale-105 transition`}
                  >
                    Select Course
                  </button>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <h2 className="text-3xl font-black mb-4">
                Ask AIVORA Learning Coach
              </h2>

              <p className="text-gray-400 mb-5">
                Tell what you want to learn. AIVORA will create a learning plan.
              </p>

              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Example: I want to learn Python from zero OR explain machine learning for beginners..."
                className="w-full h-44 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
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
                  onClick={speakLearningPlan}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-purple-500/20 hover:text-purple-300 transition"
                >
                  <Volume2 size={18} />
                  Read
                </button>

                <button
                  onClick={() => setTopic("Teach me Python from zero with daily plan.")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10"
                >
                  Python Plan
                </button>

                <button
                  onClick={() => setTopic("Teach me Machine Learning from beginner level.")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 hover:bg-white/10"
                >
                  ML Plan
                </button>
              </div>

              <button
                onClick={generateLearningPlan}
                disabled={loading || !topic.trim()}
                className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition disabled:opacity-60"
              >
                <Sparkles size={18} />
                {loading ? "Generating..." : "Generate Learning Plan"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-[500px] overflow-y-auto">
              <Brain className="h-10 w-10 text-cyan-300 mb-4" />
              <h3 className="text-2xl font-black mb-5">
                AIVORA Learning Plan
              </h3>

              <pre className="whitespace-pre-wrap text-gray-300">
                {loading
                  ? "AIVORA is creating your learning plan..."
                  : learningPlan || "Your AI-generated learning plan will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </section>
      <HistoryBox feature="Learning" />
    </main>
  );
}