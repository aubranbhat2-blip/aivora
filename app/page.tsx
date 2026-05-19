import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb80,transparent_30%),radial-gradient(circle_at_bottom_right,#a855f780,transparent_30%)]" />

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-black mb-4">AIVORA</h1>

        <p className="text-gray-300 text-lg mb-8">
          AI Mentor Platform by AUBRIX.AI
        </p>

        <Link
          href="/dashboard"
          className="inline-block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-xl font-bold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 hover:scale-105 transition"
        >
          Explore AIVORA
        </Link>

        <p className="text-sm text-gray-400 mt-3">
          without logging in
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">

  <div className="rounded-3xl bg-white/5 p-6">
    <h2 className="text-2xl font-bold">🤖 AI Mentor</h2>
    <p className="text-gray-400">Personal AI learning mentor.</p>
  </div>

  <div className="rounded-3xl bg-white/5 p-6">
    <h2 className="text-2xl font-bold">💻 Coding Mentor</h2>
    <p className="text-gray-400">Improve coding and development skills.</p>
  </div>

  <div className="rounded-3xl bg-white/5 p-6">
    <h2 className="text-2xl font-bold">📄 Resume Builder</h2>
    <p className="text-gray-400">Create modern AI resumes.</p>
  </div>

  <div className="rounded-3xl bg-white/5 p-6">
    <h2 className="text-2xl font-bold">🗺️ Roadmap Generator</h2>
    <p className="text-gray-400">Get personalized learning roadmaps.</p>
  </div>

</div>
        </p>
      </div>
    </main>
  );
}