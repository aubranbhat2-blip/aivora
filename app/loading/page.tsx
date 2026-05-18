export default function Loading() {
  return (
    <main className="min-h-screen bg-[#020617] flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb70,transparent_30%),radial-gradient(circle_at_bottom_right,#9333ea70,transparent_30%)]" />

      <div className="relative z-10 text-center">
        <div className="relative mx-auto h-28 w-28">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20" />

          <div className="absolute inset-0 rounded-full border-t-4 border-cyan-400 animate-spin" />

          <div className="absolute inset-4 rounded-full border border-purple-400/40 animate-pulse" />
        </div>

        <h1 className="mt-8 text-5xl font-black text-white">
          AUBRIX.AI
        </h1>

        <p className="mt-3 text-cyan-300 text-lg">
          Loading AIVORA...
        </p>
      </div>
    </main>
  );
}