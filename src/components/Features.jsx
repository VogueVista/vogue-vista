export default function Features() {
  const items = [
    {
      title: "Personalized Styling",
      desc: "AI learns your taste, body type, and vibe.",
    },
    {
      title: "Digital Closet",
      desc: "Upload your wardrobe and mix outfits instantly.",
    },
    {
      title: "Pinterest Aesthetic",
      desc: "Get curated looks inspired by fashion trends.",
    },
    {
      title: "Instant Outfit Generator",
      desc: "Get styled in seconds for any occasion.",
    },
  ];

  return (
    <div style={{ padding: "24px 8px 8px" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "#fca311", letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "0.8rem" }}>
          Signature features
        </p>
        <h2 style={{ fontSize: 34, marginTop: 8, fontWeight: 700 }}>
          Fashion intelligence, with a cinematic finish.
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: 22,
              borderRadius: 22,
              background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
              border: "1px solid rgba(252,163,17,0.18)",
              boxShadow: "inset 0 1px 0 rgba(229,229,229,0.14), 0 20px 45px rgba(0,0,0,0.25)",
              color: "#fff",
              backdropFilter: "blur(16px)",
            }}
          >
            <h3 style={{ color: "#fca311", marginBottom: 8 }}>{item.title}</h3>
            <p style={{ opacity: 0.82, lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}