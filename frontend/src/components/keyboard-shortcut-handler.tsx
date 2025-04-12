"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function KeyboardShortcutHandler() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("shortcutsEnabled");
    if (stored === "true") {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "n") router.push("/newtask");
      else if (key === "t") router.push("/taskview");
      else if (key === "h") router.push("/help");
      else if (key === "p") router.push("/preferences");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, router]);

  return null; // no UI — just logic
}
