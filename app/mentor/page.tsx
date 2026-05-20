"use client";


import { useState } from "react";
import Link from "next/link";
import { Brain, Send, Sparkles, ArrowLeft, Mic, Volume2 } from "lucide-react";


export default function MentorPage() {
  
  const [personality, setPersonality] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Assalamualaikum! I am your AIVORA mentor by AURIX AI 🚀",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  }

  function speakLastAnswer() {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.text) return;

    const utterance = new SpeechSynthesisUtterance(lastMessage.text);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Backend connection failed.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      {personality && (
  <div className="mb-6 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-5 whitespace-pre-wrap text-cyan-100">
    {personality}
  </div>
)}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />

      <section className="relative z-10 p-6 max-w-6xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-cyan-300 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-2xl overflow-hidden">
          <div className="border-b border-white/10 p-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
              <Brain />
            </div>

            <div>
              <h1 className="text-3xl font-black">AIVORA Chat</h1>
              <p className="text-gray-400">Powered by OpenRouter AI + AURIX AI</p>
            </div>
          </div>

          <div className="h-[65vh] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-2xl rounded-2xl p-4 whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "ml-auto bg-gradient-to-r from-blue-600 to-cyan-500"
                    : "bg-black/40 border border-white/10"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 w-fit">
                AI is thinking...
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask AIVORA..."
              className="flex-1 rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <button
              onClick={startListening}
              className="bg-white/10 border border-white/10 px-5 rounded-xl font-black flex items-center gap-2 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
            >
              <Mic size={18} />
              Speak
            </button>

            <button
              onClick={speakLastAnswer}
              className="bg-white/10 border border-white/10 px-5 rounded-xl font-black flex items-center gap-2 hover:bg-purple-500/20 hover:text-purple-300 transition"
            >
              <Volume2 size={18} />
              Read
            </button>

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 rounded-xl font-black flex items-center gap-2"
            >
              <Send size={18} />
              Send
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            "How do I start AI?",
            "Create my career roadmap",
            "How to earn with AI?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10"
            >
              <Sparkles className="text-cyan-300 mb-2" />
              {q}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}