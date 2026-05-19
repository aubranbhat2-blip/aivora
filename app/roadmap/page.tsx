"use client";
import HistoryBox from "../components/HistoryBox";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Map, Sparkles } from "lucide-react";

export default function RoadmapPage() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const careerOptions = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Data Analyst",
    "Software Engineer",
    "Web Developer",
    "App Developer",
    "Cybersecurity Expert",
    "Cloud Engineer",
    "DevOps Engineer",
    "UI/UX Designer",
    "Graphic Designer",
    "Video Editor",
    "Content Creator",
    "YouTuber",
    "Digital Marketer",
    "Freelancer",
    "Startup Founder",
    "Business Owner",
    "Doctor",
    "NEET Preparation",
    "Nurse",
    "Pharmacist",
    "UPSC",
    "IAS",
    "IPS",
    "Government Exams",
    "Teacher",
    "Professor",
    "Lawyer",
    "CA",
    "Commerce",
    "Banking",
    "Finance",
    "Stock Market",
    "Trading",
    "Civil Engineer",
    "Mechanical Engineer",
    "Electrical Engineer",
    "Architecture",
    "Hotel Management",
    "Tourism",
    "English Speaking",
    "Public Speaking",
    "Communication Skills",
    "Python",
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "History",
    "Political Science",
    "Psychology",
  ];

  async function generateRoadmap() {
    if (!goal.trim()) return;

    setLoading(true);
    setRoadmap("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: goal,
        }),
      });

      const data = await response.json();

      setRoadmap(data.reply);

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
    message: `${userEmail}|||Roadmap|||${goal}|||${data.reply}`,
  }),
});
}
      localStorage.setItem("mission_roadmap", "true");
      const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12");
const currentStreak = Number(localStorage.getItem("aivora_streak") || "7");

localStorage.setItem("aivora_tasks", String(currentTasks + 1));
localStorage.setItem("aivora_streak", String(currentStreak + 1));
localStorage.setItem("aivora_goal", goal);

    } catch (error) {
      setRoadmap("Backend connection failed. Make sure backend is running.");
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
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
              <Map />
            </div>

            <div>
              <h1 className="text-4xl font-black">
                Universal Roadmap Generator
              </h1>

              <p className="text-gray-400">
                Generate roadmaps for any career, stream, subject, exam, or skill.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">

              <label className="text-gray-300">
                Your Goal
              </label>

              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Example: Doctor, UPSC, Web Developer, Commerce, Physics, Business..."
                className="mt-3 w-full h-40 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
              />

              <div className="mt-5">
                <p className="text-gray-400 mb-3">
                  Popular career/subject options:
                </p>

                <div className="flex flex-wrap gap-3 max-h-72 overflow-y-auto pr-2">
                  {careerOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setGoal(option)}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateRoadmap}
                disabled={loading}
                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition disabled:opacity-60"
              >
                <Sparkles size={18} />
                {loading ? "Generating..." : "Generate Roadmap"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-200">
                {loading
                  ? "AUBRIX.AI is generating your personalized roadmap..."
                  : roadmap || "Your personalized roadmap will appear here..."}
              </pre>
            </div>

          </div>
        </div>
      </section>
      <HistoryBox feature="Roadmap" />
    </main>
  );
}