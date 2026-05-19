"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import {
  Flame,
  Brain,
  Map,
  FileText,
  Mic,
  Briefcase,
  Users,
  Sparkles,
  Rocket,
  Trophy,
  Code2,
  BookOpen,
  GraduationCap,
  Languages,
  Bot,
  CalendarCheck,
  LineChart,
  Globe2,
  Zap,
  Star,
  ArrowRight,
  User,
  LayoutDashboard,
  Database,
  Newspaper,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState("AIVORA User");
  


  useEffect(() => {
    const loggedUser = localStorage.getItem("aivora_user");

    if (!loggedUser) {
      router.push("/login");
      return;
    }

    setUser(loggedUser);
  }, [router]);

  const nav = [
    { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
    { name: "AI Mentor", link: "/mentor", icon: Brain },
    { name: "Roadmap", link: "/roadmap", icon: Map },
    { name: "Resume", link: "/resume", icon: FileText },
    { name: "Interview", link: "/interview", icon: Bot },
    { name: "Coding", link: "/coding", icon: Code2 },
    { name: "Freelancing", link: "/freelancing", icon: Briefcase },
    { name: "Community", link: "/community", icon: Users },
    { name: "Notes", link: "/notes", icon: BookOpen },
    { name: "Learning", link: "/learning", icon: Database },
    { name: "AI News", link: "/news", icon: Newspaper },
    { name: "Profile", link: "/profile", icon: User },
  ];

  const features = [
    {
  icon: Sparkles,
  title: "AI Insights",
  text: "View your AI level, most-used feature, progress analytics, and smart recommendations.",
  link: "/insights",
},
{
  icon: Flame,
  title: "Daily Missions",
  text: "Complete daily learning missions, build streaks, earn XP, and stay consistent.",
  link: "/missions",
},
    {
      icon: Brain,
      title: "Real AI Mentor Chat",
      text: "Ask about AI, coding, careers, freelancing, projects, and learning paths.",
      link: "/mentor",
    },
    {
      icon: Mic,
      title: "Voice AI Mentor",
      text: "Talk naturally with your AI mentor using voice support.",
      link: "/mentor",
    },
    {
      icon: Map,
      title: "Universal Roadmap Generator",
      text: "Generate personalized roadmaps for any career, subject, exam, or skill.",
      link: "/roadmap",
    },
    {
      icon: FileText,
      title: "AI Resume Builder",
      text: "Create resumes, LinkedIn bios, portfolio summaries, and project descriptions.",
      link: "/resume",
    },
    {
      icon: Bot,
      title: "Voice Interview Agent",
      text: "Practice interviews with voice questions, feedback, and scoring.",
      link: "/interview",
    },
    {
      icon: Code2,
      title: "AI Coding Mentor",
      text: "Paste code, fix errors, understand bugs, and learn concepts faster.",
      link: "/coding",
    },
    {
      icon: Briefcase,
      title: "Freelancing Mentor",
      text: "Learn Fiverr, Upwork, LinkedIn, client communication, and pricing.",
      link: "/freelancing",
    },
    {
      icon: BookOpen,
      title: "AI Notes Generator",
      text: "Generate notes, summaries, revision points, and study material.",
      link: "/notes",
    },
    {
      icon: Database,
      title: "Learning Hub",
      text: "Learn Python, AI, ML, Data Science, and real-world projects.",
      link: "/learning",
    },
    {
      icon: Newspaper,
      title: "AI Daily News",
      text: "Latest AI updates, tools, jobs, and innovations worldwide.",
      link: "/news",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      text: "Top learners ranked by streaks, projects, and progress.",
      link: "/profile",
    },
    {
      icon: Languages,
      title: "Local-Friendly Learning",
      text: "Learn complex topics in simple beginner-friendly language.",
      link: "/notes",
    },
  ];

  const steps = [
    { name: "Create Profile", link: "/profile" },
    { name: "Choose Career Goal", link: "/roadmap" },
    { name: "Generate Roadmap", link: "/roadmap" },
    { name: "Learn With AI", link: "/mentor" },
    { name: "Build Projects", link: "/coding" },
    { name: "Prepare Resume", link: "/resume" },
    { name: "Practice Interview", link: "/interview" },
    { name: "Apply For Jobs", link: "/freelancing" },
  ];

  function logout() {
    localStorage.removeItem("aivora_user");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#2563eb80,transparent_28%),radial-gradient(circle_at_80%_20%,#a855f780,transparent_30%),radial-gradient(circle_at_50%_100%,#06b6d480,transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

      <motion.div
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-32 left-16 h-80 w-80 rounded-full bg-blue-600/30 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute bottom-20 right-16 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl"
      />

      <nav className="relative z-20 px-8 py-6">
  <div className="flex items-start gap-6">
    <div className="shrink-0">
      <h1 className="text-3xl font-black tracking-tight">AIVORA</h1>
      <p className="text-cyan-300 text-sm">by AURIX AI</p>
    </div>

    <div className="flex-1 overflow-x-auto pb-2">
      <div className="flex gap-3 min-w-max">
        {nav.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.link}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              <Icon size={17} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>    
  </div>
</nav>
      <section className="relative z-10 grid lg:grid-cols-2 gap-12 items-center px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-cyan-200 mb-6 backdrop-blur">
            <Sparkles size={18} />
            AIVORA Learning Dashboard
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            Welcome Back,{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Future Leader
            </span>
          </h2>

          <p className="text-gray-300 text-xl mt-6 max-w-2xl">
            Continue learning, building skills, generating roadmaps, improving
            your resume, practicing interviews, and growing with AIVORA.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/mentor"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 rounded-xl font-bold hover:scale-105 transition shadow-xl shadow-blue-600/30"
            >
              Start AI Mentor
            </Link>

            <Link
              href="/roadmap"
              className="border border-white/20 px-7 py-3 rounded-xl hover:bg-white/10 backdrop-blur flex items-center gap-2"
            >
              Generate Roadmap <ArrowRight size={18} />
            </Link>

            <button
              onClick={logout}
              className="xl:hidden border border-red-400/20 bg-red-500/10 px-7 py-3 rounded-xl text-red-300 hover:bg-red-500/20"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
            {[
              ["24/7", "AI Guidance"],
              ["12+", "Smart Tools"],
              ["Live", "User System"],
            ].map((item) => (
              <div
                key={item[0]}
                className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur-xl"
              >
                <p className="text-3xl font-black text-cyan-300">{item[0]}</p>
                <p className="text-gray-400 text-sm">{item[1]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-purple-600/40 blur-2xl" />

          <div className="relative rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-400 text-sm">AURIX AI SYSTEM</p>
                <h3 className="text-2xl font-black">AIVORA Dashboard</h3>
              </div>

              <div className="rounded-2xl bg-blue-500/20 p-3">
                <Brain className="text-cyan-300 h-10 w-10" />
              </div>
            </div>

            <Link
              href="/profile"
              className="block rounded-3xl bg-black/40 border border-white/10 p-5 mb-4 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="text-cyan-300" />
                <div>
                  <p className="text-cyan-300">Student Account</p>
                  <h4 className="text-xl font-bold truncate">{user}</h4>
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { icon: Rocket, value: "12", label: "Tasks", link: "/profile" },
                { icon: Trophy, value: "7", label: "Streak", link: "/profile" },
                { icon: Zap, value: "98%", label: "Focus", link: "/profile" },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    href={item.link}
                    key={item.label}
                    className="rounded-2xl bg-blue-600/20 border border-blue-400/20 p-4 hover:bg-blue-600/30 transition"
                  >
                    <Icon className="text-cyan-300 mb-3" />
                    <p className="text-3xl font-black">{item.value}</p>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/mentor"
              className="block rounded-3xl bg-black/40 border border-white/10 p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <Globe2 className="text-cyan-300" />
                <p className="text-gray-300 font-semibold">AIVORA Says</p>
              </div>
              <p className="text-gray-200">
                “Start small, stay consistent, build real projects, and show
                your progress every week.”
              </p>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black">
            Powerful Features For Future Learners
          </h2>
          <p className="text-gray-400 mt-4">
            Everything is connected to your feature pages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link href={item.link} key={index}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl h-full"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600/30 to-cyan-400/20 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                    <Icon className="h-8 w-8 text-cyan-300" />
                  </div>

                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-gray-400 mt-3">{item.text}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 px-8 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h2 className="text-4xl font-black mb-8">Student Learning Journey</h2>

          <div className="grid md:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <Link href={step.link} key={step.name}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl bg-black/40 border border-white/10 p-5 h-full"
                >
                  <div className="h-10 w-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mb-4">
                    {index + 1}
                  </div>
                  <p className="font-bold">{step.name}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-8 py-16 grid md:grid-cols-3 gap-6">
        {[
          {
            icon: BookOpen,
            title: "AI Notes Generator",
            text: "Generate notes, summaries, revision points, and study material.",
            link: "/notes",
          },
          {
            icon: CalendarCheck,
            title: "AI Study Planner",
            text: "Create daily schedules based on your goals and free time.",
            link: "/roadmap",
          },
          {
            icon: LineChart,
            title: "Progress Analytics",
            text: "Track learning growth, completed tasks, streaks, and skill level.",
            link: "/profile",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <Link
              href={item.link}
              key={item.title}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl hover:-translate-y-2 transition"
            >
              <Icon className="h-11 w-11 text-cyan-300 mb-5" />
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className="text-gray-400 mt-3">{item.text}</p>
            </Link>
          );
        })}
      </section>

      <section className="relative z-10 px-8 py-20 text-center">
        <div className="rounded-[2rem] border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl p-10">
          <Star className="mx-auto h-12 w-12 text-cyan-300 mb-5" />
          <h2 className="text-4xl md:text-5xl font-black">
            Continue Building Your Future
          </h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            AIVORA is your AI-powered learning, career, and productivity platform.
          </p>

          <Link
            href="/mentor"
            className="inline-block mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-xl font-black hover:scale-105 transition shadow-xl shadow-blue-600/30"
          >
            Open AI Mentor
            <div className="mt-10 border-t border-white/10 pt-6 text-gray-300">
  <h3 className="text-2xl font-black text-cyan-300">About AIVORA</h3>

  <p className="mt-3 max-w-2xl mx-auto text-gray-400">
    AIVORA is an AI-powered learning, career, and productivity platform built to help
    students and future innovators grow with Artificial Intelligence.
  </p>

  <div className="mt-5 space-y-1">
    <p className="font-bold"> Founder — Aubran Bhat</p>
    <p> aubranbhat2@gmail.com</p>
    <p> J&amp;K, India</p>
  </div>
</div>
          </Link>
        </div>
      </section>
    </main>
  );
}