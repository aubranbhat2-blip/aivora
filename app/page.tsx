import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb80,transparent_30%),radial-gradient(circle_at_bottom_right,#a855f780,transparent_30%)]" />

      <div className="relative z-10 text-center">

        <h1 className="text-6xl font-black mb-4">
          AIVORA
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          AI Mentor Platform by AUBRIX.AI
        </p>

        <div className="relative inline-flex flex-col items-center">

          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-[2rem] border border-cyan-300/40 bg-gradient-to-r from-cyan-400/90 via-blue-500/90 to-indigo-600/90 px-10 py-5 text-2xl font-black text-white shadow-[0_0_50px_rgba(34,211,238,0.55)] transition duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(59,130,246,0.9)]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 blur-xl transition group-hover:opacity-30" />

            <span className="relative">✦</span>

            <span className="relative">
              Explore AIVORA
            </span>

            <span className="relative text-cyan-100 transition group-hover:translate-x-1">
              ›
            </span>
          </Link>

          <p className="mt-4 text-sm tracking-wide text-gray-400">
            without logging in
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">

          <div className="rounded-3xl bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              🤖 AI Mentor
            </h2>

            <p className="text-gray-400">
              Personal AI learning mentor.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              💻 Coding Mentor
            </h2>

            <p className="text-gray-400">
              Improve coding and development skills.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              📄 Resume Builder
            </h2>

            <p className="text-gray-400">
              Create modern AI resumes.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              🗺️ Roadmap Generator
            </h2>

            <p className="text-gray-400">
              Get personalized learning roadmaps.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}