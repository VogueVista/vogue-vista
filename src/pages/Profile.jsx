import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS_KEY = "voguevista-users";
const SESSION_KEY = "voguevista-session";

function encodeSync(data) {
  const json = JSON.stringify(data);
  return btoa(String.fromCharCode(...new TextEncoder().encode(json)));
}

function decodeSync(code) {
  const json = new TextDecoder().decode(
    Uint8Array.from(atob(code), (char) => char.charCodeAt(0))
  );
  return JSON.parse(json);
}

export default function Profile() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState("Sign in to keep your wardrobe and style plan synced.");
  const [syncCode, setSyncCode] = useState("");
  const [importCode, setImportCode] = useState("");

  useEffect(() => {
    try {
      const savedUsers = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      const activeSession = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");

      if (activeSession) {
        const match = savedUsers.find(
          (user) =>
            user.email.toLowerCase() === activeSession.email.toLowerCase() &&
            user.password === activeSession.password
        );

        if (match) {
          setCurrentUser(match);
          setMessage(`Welcome back, ${match.name || match.email}.`);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function persistSession(user) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ email: user.email, password: user.password })
    );
    setCurrentUser(user);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = form.email.trim().toLowerCase();
    const trimmedPassword = form.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setMessage("Please enter both your email and password.");
      return;
    }

    if (mode === "login") {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      const match = users.find(
        (user) => user.email.toLowerCase() === trimmedEmail && user.password === trimmedPassword
      );

      if (!match) {
        setMessage("No account matched those details. Try signing up first.");
        return;
      }

      persistSession(match);
      setMessage(`Signed in as ${match.name || match.email}.`);
      return;
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const exists = users.some((user) => user.email.toLowerCase() === trimmedEmail);

    if (exists) {
      setMessage("That email already exists. Please log in instead.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name.trim() || trimmedEmail.split("@")[0],
      email: trimmedEmail,
      password: trimmedPassword,
    };

    const nextUsers = [newUser, ...users];
    saveUsers(nextUsers);
    persistSession(newUser);
    setMessage("Account created. Your login is saved locally.");
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
    setForm({ name: "", email: "", password: "" });
    setMessage("You’ve been signed out.");
  }

  function handleCopySync() {
    if (!currentUser) return;
    const code = encodeSync(currentUser);
    setSyncCode(code);
    navigator.clipboard.writeText(code);
    setMessage("Sync code copied. Paste it on another device to restore this account.");
  }

  function handleImportSync(event) {
    event.preventDefault();
    if (!importCode.trim()) {
      setMessage("Paste a sync code first.");
      return;
    }

    try {
      const importedUser = decodeSync(importCode.trim());
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      const nextUsers = users.some((user) => user.email.toLowerCase() === importedUser.email.toLowerCase())
        ? users.map((user) => (user.email.toLowerCase() === importedUser.email.toLowerCase() ? importedUser : user))
        : [importedUser, ...users];

      saveUsers(nextUsers);
      persistSession(importedUser);
      setMessage("Account restored from sync code.");
      setImportCode("");
    } catch {
      setMessage("That sync code didn’t work. Please try again.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px 20px 60px",
        background: "linear-gradient(135deg, #000000 0%, #0b0b0b 45%, #000000 100%)",
        color: "#f5f5f5",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          borderRadius: 32,
          border: "1px solid rgba(252,163,17,0.2)",
          background: "linear-gradient(135deg, rgba(0,0,0,0.94), rgba(20,33,61,0.72))",
          boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "28px 28px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "rgba(252,163,17,0.12)",
              border: "1px solid rgba(252,163,17,0.3)",
              color: "#fca311",
              borderRadius: 999,
              padding: "8px 14px",
              cursor: "pointer",
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            ← Home
          </button>
          <h1 style={{ fontSize: 34, margin: "6px 0 8px", color: "#fca311" }}>Profile & Account</h1>
          <p style={{ color: "#d6d6d6", maxWidth: 700, lineHeight: 1.7 }}>{message}</p>
        </div>

        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", padding: 28 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: 22, border: "1px solid rgba(255,255,255,0.08)" }}>
            {!currentUser ? (
              <>
                <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                  <button
                    onClick={() => setMode("login")}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 999,
                      border: mode === "login" ? "none" : "1px solid rgba(255,255,255,0.12)",
                      background: mode === "login" ? "linear-gradient(135deg, #fca311, #ffd27a)" : "transparent",
                      color: mode === "login" ? "#000" : "#f5f5f5",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 999,
                      border: mode === "signup" ? "none" : "1px solid rgba(255,255,255,0.12)",
                      background: mode === "signup" ? "linear-gradient(135deg, #fca311, #ffd27a)" : "transparent",
                      color: mode === "signup" ? "#000" : "#f5f5f5",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Sign up
                  </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
                  {mode === "signup" && (
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Display name"
                      style={inputStyle}
                    />
                  )}
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    style={inputStyle}
                  />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Password"
                    style={inputStyle}
                  />
                  <button type="submit" style={primaryButtonStyle}>
                    {mode === "login" ? "Log in" : "Create account"}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ padding: 16, borderRadius: 18, background: "rgba(252,163,17,0.12)", border: "1px solid rgba(252,163,17,0.22)" }}>
                  <p style={{ margin: 0, color: "#fca311", fontWeight: 700 }}>Signed in</p>
                  <h2 style={{ margin: "6px 0", fontSize: 24 }}>{currentUser.name}</h2>
                  <p style={{ margin: 0, color: "#d6d6d6" }}>{currentUser.email}</p>
                </div>
                <button onClick={handleLogout} style={secondaryButtonStyle}>
                  Log out
                </button>
              </div>
            )}
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 24, padding: 22, border: "1px solid rgba(255,255,255,0.08)" }}>
            <h3 style={{ marginTop: 0, color: "#fca311" }}>Sync across devices</h3>
            <p style={{ color: "#d6d6d6", lineHeight: 1.7 }}>
              Your account is saved locally in this browser. Copy the sync code below to restore it on another device or platform.
            </p>

            <button onClick={handleCopySync} disabled={!currentUser} style={{ ...primaryButtonStyle, opacity: currentUser ? 1 : 0.6 }}>
              Copy sync code
            </button>

            <form onSubmit={handleImportSync} style={{ display: "grid", gap: 12, marginTop: 16 }}>
              <textarea
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                placeholder="Paste a sync code here"
                rows={4}
                style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
              />
              <button type="submit" style={secondaryButtonStyle}>
                Restore from sync code
              </button>
            </form>

            {syncCode && (
              <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "#e5e5e5", wordBreak: "break-all" }}>
                {syncCode}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "#ffffff",
  fontSize: 15,
  outline: "none",
};

const primaryButtonStyle = {
  padding: "12px 16px",
  borderRadius: 999,
  border: "none",
  background: "linear-gradient(135deg, #fca311, #ffd27a)",
  color: "#000000",
  fontWeight: 700,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "12px 16px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "transparent",
  color: "#f5f5f5",
  fontWeight: 700,
  cursor: "pointer",
};