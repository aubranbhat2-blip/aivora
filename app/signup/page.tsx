"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, UserPlus } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email.trim() || !password.trim()) {
      setStatus("Please enter email and password.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `${email}|${password}`,
        }),
      });

      const data = await response.json();

      if (data.reply.includes("successful")) {
        setStatus("Signup successful! Redirecting...");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setStatus(data.reply || "Signup failed.");
      }
    } catch (error) {
      setStatus("Backend connection failed.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb80,transparent_30%),radial-gradient(circle_at_bottom_right,#a855f780,transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg shadow-purple-600/30">
            <UserPlus className="h-11 w-11" />
          </div>

          <h1 className="text-4xl font-black">Create Account</h1>
          <p className="text-cyan-300 mt-1">Join AIVORA by AURIX AI</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
          />

          {status && (
            <p className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-gray-300">
              {status}
            </p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3 font-black hover:scale-105 transition shadow-xl shadow-purple-600/30 disabled:opacity-60"
          >
            <Sparkles size={18} />
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-300">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}