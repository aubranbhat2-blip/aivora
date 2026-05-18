import Link from "next/link";
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Trophy,
  Rocket,
  Code2,
  Sparkles,
} from "lucide-react";

export default function CommunityPage() {
  const cards = [
    {
      icon: MessageCircle,
      title: "Ask Doubts",
      text: "Students can ask AI, coding, career, and project questions.",
    },
    {
      icon: Code2,
      title: "Share Projects",
      text: "Show your AI projects, websites, dashboards, and apps.",
    },
    {
      icon: Rocket,
      title: "Find Teammates",
      text: "Connect with learners and build projects together.",
    },
    {
      icon: Trophy,
      title: "Weekly Challenges",
      text: "Participate in AI challenges and improve every week.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#facc1570,transparent_30%),radial-gradient(circle_at_bottom_right,#2563eb70,transparent_30%)]" />

      <section className="relative z-10 p-6 max-w-6xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-cyan-300 mb-6">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <Users />
            </div>

            <div>
              <h1 className="text-4xl font-black">Kashmiri AI Community</h1>
              <p className="text-gray-400">
                A learning movement for Kashmiri youth powered by AUBRIX.AI.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/10 transition"
                >
                  <Icon className="h-12 w-12 text-cyan-300 mb-5" />
                  <h2 className="text-2xl font-black">{item.title}</h2>
                  <p className="text-gray-400 mt-3">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6">
            <Sparkles className="h-10 w-10 text-cyan-300 mb-4" />
            <h2 className="text-3xl font-black">Coming Soon</h2>
            <p className="text-gray-300 mt-3">
              Real community posts, student profiles, project sharing,
              discussions, leaderboards, and weekly AI challenges.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}