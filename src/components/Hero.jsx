import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero({ onStartStyling }) {
  const navigate = useNavigate();

  return (
    <section className="flex flex-1 items-center">
      <div className="max-w-2xl">
        <div className="mb-6 inline-flex items-center rounded-full border border-[#fca311]/30 bg-[#fca311]/10 px-5 py-2 text-sm uppercase tracking-[0.35em] text-[#ffe4b3] backdrop-blur-md">
          AI styling, filtered for you
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          <span className="block bg-gradient-to-r from-[#ffe4b3] via-[#fca311] to-[#14213d] bg-clip-text text-transparent">
            Your wardrobe.
          </span>
          <span className="mt-2 block bg-gradient-to-r from-[#e5e5e5] via-[#14213d] to-[#000000] bg-clip-text text-transparent">
            Reimagined in a dreamlike glow.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg leading-8 text-neutral-300"
        >
          Vogue Vista blends artificial intelligence with your wardrobe, body type,
          color palette, and personal style to craft luxurious looks in seconds.
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-5">
          <button
            onClick={() => {
              if (onStartStyling) {
                onStartStyling();
              } else {
                navigate("/ai-stylist");
              }
            }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#fca311] via-[#ffd27a] to-[#9b5a00] px-9 py-4 font-semibold text-black shadow-[0_0_35px_rgba(252,163,17,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(252,163,17,0.35)] active:scale-95"
          >
            <span className="relative z-10">Start Styling →</span>
            <div className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          <button className="group rounded-full border border-white/15 bg-white/5 px-9 py-4 text-white backdrop-blur-md transition-all duration-300 hover:border-[#fca311] hover:bg-white/10 hover:shadow-[0_0_25px_rgba(252,163,17,0.2)] active:scale-95">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}
