import { useRef, useState } from "react";
import AIChat from "../components/AIChat";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PhoneMockup from "../components/PhoneMockup";
import Features from "../components/Features";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef(null);

  function handleStartStyling() {
    setShowChat(true);
    requestAnimationFrame(() => {
      chatRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[-12%] h-72 w-72 rounded-full bg-[#14213d]/20 blur-[120px]" />
        <div className="absolute right-[-5%] top-0 h-80 w-80 rounded-full bg-[#fca311]/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#e5e5e5]/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="px-6 pt-20 sm:px-8 lg:px-20 lg:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Hero onStartStyling={handleStartStyling} />

            <div className="flex justify-center">
              <PhoneMockup />
            </div>
          </div>
        </section>

        <section className="mt-28 px-6 pb-20 sm:px-8 lg:px-20">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-6 lg:p-8">
            <Features />
            {showChat && (
              <div ref={chatRef} className="mt-8">
                <AIChat />
              </div>
            )}
          </div>
        </section>

        <footer className="pb-16 text-center text-sm text-gray-400/80">
          © 2026 Vogue Vista
        </footer>
      </div>
    </div>
  );
}