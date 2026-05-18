import Link from "next/link";
import { ArrowLeft, Sparkles, MapPin, Mail, User } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />

      <section className="relative z-10 p-6 max-w-5xl mx-auto">
        <Link href="/profile" className="inline-flex items-center gap-2 text-cyan-300 mb-6">
          <ArrowLeft size={18} />
          Back to Profile
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center mb-6">
            <Sparkles className="h-10 w-10" />
          </div>

          <h1 className="text-5xl font-black">About AIVORA</h1>
          <p className="text-gray-300 mt-4 text-xl">
            AIVORA is an AI-powered learning, career, and productivity platform by AURIX AI.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <User className="text-cyan-300 h-10 w-10 mb-4" />
              <p className="text-gray-400">Founder</p>
              <h2 className="text-3xl font-black">Aubran Bhat</h2>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <Mail className="text-cyan-300 h-10 w-10 mb-4" />
              <p className="text-gray-400">Business Email</p>
              <h2 className="text-xl font-black">aubranbhat2@gmail.com</h2>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <MapPin className="text-cyan-300 h-10 w-10 mb-4" />
              <p className="text-gray-400">Address</p>
              <h2 className="text-3xl font-black">J&K, India</h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}