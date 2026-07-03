import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WardrobeProvider } from "./context/WardrobeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WardrobeProvider>
      <App />
    </WardrobeProvider>
  </StrictMode>
);