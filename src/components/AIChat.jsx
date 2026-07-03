import { useContext, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { WardrobeContext } from "../context/WardrobeContext";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hey! I can help you build looks around your vibe, your wardrobe, and the moment. What are you styling for?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { closet = [] } = useContext(WardrobeContext);

  function getWardrobeImageParts() {
    return closet
      .slice(0, 4)
      .map((item) => {
        const match = item.image?.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
        if (!match) return null;

        return {
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        };
      })
      .filter(Boolean);
  }

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    if (!ai) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "AI styling is currently unavailable because no API key is configured.",
        },
      ]);
      return;
    }

    setLoading(true);

    try {
      const wardrobeImageParts = getWardrobeImageParts();
      const prompt = `
You are Vogue Vista, an elite AI fashion stylist.

Your personality:
- Friendly and effortless
- Slightly luxe, slightly playful
- Modern, cool, and Gen Z-inspired
- Confident but not over-the-top
- Never mention you're an AI.

Write in a natural, stylish, slightly casual voice that feels current and relatable.

When someone asks for outfit advice always include:

✨ Outfit
🎨 Colour Palette
👠 Shoes
👜 Accessories
💄 Makeup (optional)
💇 Hairstyle (optional)

Keep the tone upbeat, modern, and a little witty. Use phrases like "low-key", "it’s giving", "clean", "elevated", or "main character" when it fits naturally.

User request:

${userMessage.text}

Wardrobe context:
${wardrobeImageParts.length > 0
  ? `The user has uploaded ${wardrobeImageParts.length} wardrobe image(s). Analyze them to understand the available clothing pieces, colors, and style before giving advice.`
  : "No wardrobe photos are currently uploaded."}
`;

      const contents = wardrobeImageParts.length
        ? [{ role: "user", parts: [{ text: prompt }, ...wardrobeImageParts] }]
        : prompt;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          text: response?.text || "I’m ready to help with your next look.",
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 3,
          role: "assistant",
          text: "Something went wrong. Please try again in a moment.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "24px auto 0",
        padding: 30,
        borderRadius: 28,
        background: "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,33,61,0.78))",
        border: "1px solid rgba(252,163,17,0.22)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(229,229,229,0.12)",
        backdropFilter: "blur(18px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "999px",
            background: "linear-gradient(135deg, #fca311, #14213d)",
            boxShadow: "0 0 14px rgba(252,163,17,0.35)",
          }}
        />
        <h2 style={{ fontSize: 28, color: "#fca311", fontWeight: 700 }}>
          AI Stylist
        </h2>
      </div>

      <p style={{ color: "#e5e5e5", lineHeight: 1.7, marginBottom: 18 }}>
        Tell me the occasion and I’ll build a polished outfit direction with color, shoes, and accessories.
      </p>

      <div
        style={{
          marginTop: 20,
          marginBottom: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxHeight: 320,
          overflowY: "auto",
          paddingRight: 6,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "12px 14px",
                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background:
                  msg.role === "user"
                    ? "linear-gradient(135deg, #fca311, #ffd27a)"
                    : "rgba(255,255,255,0.08)",
                color: msg.role === "user" ? "#000000" : "#f5f5f5",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <textarea
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Example: I have a dinner date tomorrow."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        style={{
          width: "100%",
          padding: 18,
          borderRadius: 16,
          border: "1px solid rgba(252,163,17,0.2)",
          resize: "none",
          fontSize: 16,
          background: "rgba(229,229,229,0.08)",
          color: "#ffffff",
          outline: "none",
        }}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          marginTop: 18,
          padding: "14px 24px",
          borderRadius: 999,
          background: loading ? "rgba(252,163,17,0.55)" : "linear-gradient(135deg, #fca311, #ffd27a)",
          color: "#000000",
          border: "none",
          cursor: loading ? "default" : "pointer",
          fontSize: 16,
          fontWeight: 700,
          boxShadow: "0 12px 30px rgba(252,163,17,0.24)",
        }}
      >
        {loading ? "Styling..." : "Send"}
      </button>
    </div>
  );
}