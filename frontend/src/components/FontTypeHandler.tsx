
"use client";
import { useEffect } from "react";

export default function FontTypeHandler() {
  useEffect(() => {
    const savedFontType = localStorage.getItem("fontType") || "font-mono";

    const body = document.body;
    body.classList.remove("font-sans", "font-mono", "font-serif", "font-poppins");
    body.classList.add(savedFontType);
  }, []);

  return null;
}
