import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        margin: "24px auto 0",
        maxWidth: "1200px",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "999px",
        background: "linear-gradient(135deg, rgba(0,0,0,0.96), rgba(20,33,61,0.75))",
        backdropFilter: "blur(16px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(229,229,229,0.14)",
        color: "#e5e5e5",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #fca311, #14213d)",
            boxShadow: "0 0 14px rgba(252,163,17,0.4)",
          }}
        />
        <h1 style={{ fontSize: "0.95rem", letterSpacing: "0.35em", fontWeight: 700 }}>
          VOGUE VISTA
        </h1>
      </div>

      <div style={{ display: "flex", gap: "18px", fontSize: "0.95rem", color: "rgba(247,243,232,0.8)" }}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/wardrobe")}>Wardrobe</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/ai-stylist")}>AI Stylist</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/profile")}>Profile</span>
      </div>
    </div>
  );
}
