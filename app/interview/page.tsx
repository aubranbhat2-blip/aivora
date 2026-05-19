"use client";
import HistoryBox from "../components/HistoryBox";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Mic,
  Volume2,
  Sparkles,
  RotateCcw,
} from "lucide-react";

export default function InterviewPage() {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([
    {
      role: "ai",
      text: "Welcome to AIVORA Voice Interview. Click Start Voice Interview and I will ask your first question.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  function speak(text: string) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.92;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

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
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Voice recognition failed. Try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }

  async function askAI(userMessage: string) {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();
      const reply = data.reply || "No response received.";
      const userEmail = localStorage.getItem("aivora_user");

if (userEmail) {
  const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12") + 1;
  const currentStreak = Number(localStorage.getItem("aivora_streak") || "7") + 1;
  const currentGoal = "Interview Practice";

  localStorage.setItem("aivora_tasks", String(currentTasks));
  localStorage.setItem("aivora_streak", String(currentStreak));
  localStorage.setItem("aivora_goal", currentGoal);
  localStorage.setItem("mission_interview", "true");

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `${userEmail}|${currentGoal}|${currentTasks}|${currentStreak}`,
    }),
  });
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-history`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: `${userEmail}|||FEATURE_NAME|||USER_INPUT|||${data.reply}`,
  }),
});
}

      setConversation((prev) => [
        ...prev,
        {
          role: "ai",
          text: reply,
        },
      ]);
      localStorage.setItem("mission_interview", "true");
      const currentTasks = Number(localStorage.getItem("aivora_tasks") || "12");
const currentStreak = Number(localStorage.getItem("aivora_streak") || "7");

localStorage.setItem("aivora_tasks", String(currentTasks + 1));
localStorage.setItem("aivora_streak", String(currentStreak + 1));
localStorage.setItem("aivora_goal", "Interview Practice");

      speak(reply);
    } catch (error) {
      const errorText = "Backend connection failed. Make sure FastAPI is running.";
      setConversation((prev) => [
        ...prev,
        {
          role: "ai",
          text: errorText,
        },
      ]);
      speak(errorText);
    }

    setLoading(false);
  }

  function startVoiceInterview() {
    const startPrompt =
      "Start a voice interview for me. Ask one beginner-friendly interview question first. Do not give the answer yet. Wait for my answer. Field: AI, ML, coding, career, and communication.";

    setConversation([
      {
        role: "ai",
        text: "Starting your AIVORA Voice Interview...",
      },
    ]);

    askAI(startPrompt);
  }

  function submitAnswer() {
    if (!input.trim()) return;

    const answer = input;

    setConversation((prev) => [
      ...prev,
      {
        role: "user",
        text: answer,
      },
    ]);

    setInput("");

    const prompt = `
You are conducting a voice interview.

Candidate answer:
${answer}

Now do this:
1. Give short feedback.
2. Give score out of 10.
3. Give improved answer.
4. Ask the next interview question.
Keep it clear and speakable.
`;

    askAI(prompt);
  }

  function resetInterview() {
    window.speechSynthesis.cancel();
    setInput("");
    setConversation([
      {
        role: "ai",
        text: "Welcome to AIVORA Voice Interview. Click Start Voice Interview and I will ask your first question.",
      },
    ]);
  }

  function readLastAI() {
    const lastAI = [...conversation].reverse().find((msg) => msg.role === "ai");
    if (lastAI) speak(lastAI.text);
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
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-600/30">
              <Bot className="h-8 w-8 text-white" />
            </div>

            <div>
              <h1 className="text-5xl font-black">
                AIVORA Voice Interview Agent
              </h1>
              <p className="text-gray-400 mt-2">
                Practice interviews with voice questions, voice answers, AI feedback, and scoring.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <h2 className="text-2xl font-black mb-4">Voice Controls</h2>

              <div className="grid md:grid-cols-2 gap-3">
                <button
                  onClick={startVoiceInterview}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:scale-105 transition disabled:opacity-60"
                >
                  <Sparkles size={18} />
                  Start Voice Interview
                </button>

                <button
                  onClick={startListening}
                  disabled={listening}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-cyan-500/20 hover:text-cyan-300 transition disabled:opacity-60"
                >
                  <Mic size={18} />
                  {listening ? "Listening..." : "Answer by Voice"}
                </button>

                <button
                  onClick={readLastAI}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-purple-500/20 hover:text-purple-300 transition"
                >
                  <Volume2 size={18} />
                  Read Last Question
                </button>

                <button
                  onClick={resetInterview}
                  className="bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-red-500/20 hover:text-red-300 transition"
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>

              <div className="mt-6">
                <label className="text-gray-300">
                  Your Answer
                </label>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Speak or type your answer here..."
                  className="mt-3 w-full h-44 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
                />

                <button
                  onClick={submitAnswer}
                  disabled={loading || !input.trim()}
                  className="mt-5 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-xl font-black hover:scale-105 transition disabled:opacity-60"
                >
                  {loading ? "AIVORA is thinking..." : "Submit Answer"}
                </button>
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
                <p className="text-cyan-300 font-bold mb-2">How to use:</p>
                <p className="text-gray-300">
                  Start interview → listen to AIVORA question → click Answer by Voice → speak your answer → Submit Answer → get feedback + next question.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 min-h-[600px] overflow-y-auto">
              <h2 className="text-2xl font-black mb-5">
                Interview Conversation
              </h2>

              <div className="space-y-4">
                {conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-4 whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "ml-auto max-w-2xl bg-gradient-to-r from-blue-600 to-cyan-500"
                        : "max-w-2xl bg-black/40 border border-white/10"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                      {msg.role === "user" ? "You" : "AIVORA"}
                    </p>
                    {msg.text}
                  </div>
                ))}

                {loading && (
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 w-fit">
                    AIVORA is thinking...
                  </div>
                )}

                {listening && (
                  <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-4 w-fit text-cyan-300">
                    Listening to your answer...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <HistoryBox feature="Interview" />
    </main>
  );
}