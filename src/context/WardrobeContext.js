import { createContext, useEffect, useState, createElement } from "react";

export const WardrobeContext = createContext();

export const WardrobeProvider = ({ children }) => {
  const [closet, setCloset] = useState([]);

  useEffect(() => {
    try {
      const savedCloset = localStorage.getItem("closet");
      if (!savedCloset) return;

      const parsed = JSON.parse(savedCloset);
      if (Array.isArray(parsed)) {
        setCloset(parsed);
      } else {
        localStorage.removeItem("closet");
      }
    } catch {
      localStorage.removeItem("closet");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("closet", JSON.stringify(closet));
    } catch {
      // Ignore storage failures
    }
  }, [closet]);

  return createElement(
    WardrobeContext.Provider,
    { value: { closet, setCloset } },
    children
  );
};