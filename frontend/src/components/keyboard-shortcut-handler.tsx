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
      // modified to switch case to ensure ctrl key has to be pressed
      if (e.ctrlKey) {
        switch (key) {
          case "n":
            router.push("/newtask");
            break;
          case "t":
            router.push("/taskview");
            break;
          case "h":
            router.push("/help");
            break;
          case "p":
            router.push("/preferences");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, router]);

  return null; 
}