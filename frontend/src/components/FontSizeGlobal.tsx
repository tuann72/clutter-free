"use client";

import { useEffect, useState } from "react";

export default function FontScaleGlobal() {
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    const storedScale = localStorage.getItem("fontScale");
    if (storedScale) {
      const parsed = parseFloat(storedScale);
      setFontScale(parsed);
      document.documentElement.style.setProperty("--font-scale", parsed.toString());
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "fontScale" && e.newValue) {
        const newVal = parseFloat(e.newValue);
        setFontScale(newVal);
        document.documentElement.style.setProperty("--font-scale", newVal.toString());
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // No UI needed; just logic
  return null;
}
