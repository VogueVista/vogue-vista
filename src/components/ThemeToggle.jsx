import { useState } from "react";

export default function ThemeToggle() {

  const [dark, setDark] = useState(true);

  return (

    <button
      onClick={() => setDark(!dark)}
      className="w-16 h-9 rounded-full bg-white/20 border border-white/20 flex items-center px-1 transition"
    >

      <div
        className={`h-7 w-7 rounded-full bg-[#D4AF37] transition-transform duration-300 ${
          dark ? "translate-x-7" : ""
        }`}
      />

    </button>

  );
}