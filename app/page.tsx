import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb80,transparent_30%),radial-gradient(circle_at_bottom_right,#a855f780,transparent_30%)]" />
      

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-black mb-4">
          AIVORA
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          AI Mentor Platform by AUBRIX.AI
        </p>

        <Link
          href="/dashboard"
          className="inline-block rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-xl font-bold shadow-2xl hover:scale-105 transition"
        >
          Explore AIVORA
        </Link>

        <p className="text-sm text-gray-400 mt-3">
          without logging in
        </p>

      </div>
    </main>
  );
}