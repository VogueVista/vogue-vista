import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AiStylist from "./pages/AiStylist";
import Wardrobe from "./pages/Wardrobe";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-stylist" element={<AiStylist />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}