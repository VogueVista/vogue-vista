import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -16, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{
        rotateY: 18,
        rotateX: -10,
        scale: 1.05,
        transition: { duration: 0.35 },
      }}
      style={{ transformStyle: "preserve-3d", perspective: "2000px" }}
      className="relative flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[420px] w-[420px] rounded-full bg-[#14213d]/30 blur-[100px]"
      />

<div className="absolute h-[300px] w-[300px] rounded-full bg-[#14213d]/20 blur-[80px]" />

      <motion.div
        whileHover={{
          boxShadow: "0 60px 120px rgba(0,0,0,0.55), 0 0 80px rgba(20,33,61,0.24)",
        }}
        className="relative h-[675px] w-[330px] rounded-[52px] bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-[4px]"
      >
        <div className="absolute inset-0 rounded-[52px] border border-white/10" />

        <div className="absolute left-0 top-32 h-14 w-[3px] rounded-r-full bg-neutral-400" />
        <div className="absolute left-0 top-48 h-20 w-[3px] rounded-r-full bg-neutral-400" />
        <div className="absolute right-0 top-40 h-24 w-[3px] rounded-l-full bg-neutral-400" />

        <div className="relative h-full w-full overflow-hidden rounded-[48px] bg-[linear-gradient(135deg,#000000_0%,#121212_45%,#0a0a0a_100%)]">
          <div className="absolute left-1/2 top-4 z-50 h-8 w-32 -translate-x-1/2 rounded-full border border-white/5 bg-black shadow-xl" />

          <img src="/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(20,33,61,0.32),_transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#14213d]/20 via-transparent to-[#fca311]/12" />

          <motion.div
            animate={{ x: [-250, 350] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 -left-40 h-full w-40 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-xl"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute left-5 right-5 top-20 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-xl"
          >
            <p className="text-xs text-white/70">✨ AI Recommendation Ready</p>
            <p className="mt-1 text-sm font-medium text-white">Elegant Black & Gold Evening Look</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-12 left-5 right-5"
          >
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <h3 className="font-semibold text-white">AI Stylist</h3>
              <p className="mt-2 text-sm text-white/70">Outfit generated based on your wardrobe.</p>
              <button className="mt-5 w-full rounded-xl bg-[#fca311] py-3 font-semibold text-black transition hover:brightness-110">
                View Outfit
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-8 right-6 h-4 w-4 rounded-full bg-[#fca311] blur-sm"
      />

      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-12 -left-8 h-3 w-3 rounded-full bg-white blur-sm"
      />

      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-52 -right-10 h-5 w-5 rounded-full bg-[#FFD700] blur-md"
      />
    </motion.div>
  );
}