"use client";

import { Mic, Volume2 } from "lucide-react";

type VoiceControlsProps = {
  onText: (text: string) => void;
  textToSpeak?: string;
};

export default function VoiceControls({ onText, textToSpeak }: VoiceControlsProps) {
  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onText(transcript);
    };

    recognition.start();
  }

  function speakText() {
    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="flex gap-3 mt-4">
      <button
        onClick={startListening}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-cyan-500/20 hover:text-cyan-300 transition"
      >
        <Mic size={18} />
        Speak
      </button>

      <button
        onClick={speakText}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-purple-500/20 hover:text-purple-300 transition"
      >
        <Volume2 size={18} />
        Read Answer
      </button>
    </div>
  );
}