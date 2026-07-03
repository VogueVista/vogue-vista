import { useState } from "react";

export default function AiStylist() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi ✨ I’m your AI Stylist. Tell me an occasion and I’ll style you."
    }
  ]);

  function getAIResponse(text) {
    const t = text.toLowerCase();

    if (t.includes("party")) {
      return "Go for a black fitted outfit with gold accessories. Add heels or clean sneakers for a modern luxe vibe.";
    }

    if (t.includes("beach")) {
      return "Light linen shirt, shorts, sandals. Keep it airy with whites, beige, or pastel tones.";
    }

    if (t.includes("date")) {
      return "Soft elegant outfit — satin top or dress, minimal jewelry, warm tones like cream or blush.";
    }

    if (t.includes("college")) {
      return "Casual chic: oversized shirt, denim, sneakers. Keep it effortless but styled.";
    }

    return "Try a neutral base outfit with layered textures. Add one statement piece to elevate the look ✨";
  }

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const aiMsg = { role: "ai", text: getAIResponse(input) };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl h-[80vh] bg-white/5 border border-white/10 rounded-2xl flex flex-col overflow-hidden">

        {/* header */}
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-semibold">AI Stylist</h1>
          <p className="text-xs text-gray-400">Your personal fashion assistant</p>
        </div>

        {/* messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl text-sm max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-white/10 text-right"
                  : "bg-yellow-500/10 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}

        </div>

        {/* input */}
        <div className="p-4 flex gap-2 border-t border-white/10">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask: party, beach, date..."
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/10 outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-yellow-500 text-black px-5 rounded-lg font-semibold"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}