"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Preferences() {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    const stored = localStorage.getItem("shortcutsEnabled");
    if (stored === "true") {
      setShortcutsEnabled(true);
    }

    const savedScale = localStorage.getItem("fontScale");
    if (savedScale) {
      const parsed = parseFloat(savedScale);
      setFontScale(parsed);
      document.documentElement.style.setProperty("--font-scale", parsed.toString());
    }

    const savedFontType = localStorage.getItem("fontType") || "font-mono"; 
    document.body.classList.remove("font-sans", "font-mono", "font-serif", "font-poppins");
    document.body.classList.add(savedFontType);
  }, []);

  const handleToggle = (value: boolean) => {
    setShortcutsEnabled(value);
    localStorage.setItem("shortcutsEnabled", value.toString());
    window.location.reload()
  };

  const increaseFont = () => {
    setFontScale((prev) => {
      const newScale = Math.min(prev + 0.1, 1.2);
      localStorage.setItem("fontScale", newScale.toString());
      document.documentElement.style.setProperty("--font-scale", newScale.toString());
      return newScale;
    });
  };

  const decreaseFont = () => {
    setFontScale((prev) => {
      const newScale = Math.max(prev - 0.1, 0.8);
      localStorage.setItem("fontScale", newScale.toString());
      document.documentElement.style.setProperty("--font-scale", newScale.toString());
      return newScale;
    });
  };

  function FontTypeDropdown() {
    const [fontType, setFontType] = useState("font-mono");

    useEffect(() => {
      const savedFontType = localStorage.getItem("fontType") || "font-mono";
      setFontType(savedFontType);
    }, []);

    const applyFontType = (newType: string) => {
      document.body.classList.remove("font-sans", "font-mono", "font-serif", "font-poppins");
      document.body.classList.add(newType);
    };

    const handleFontTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newType = e.target.value;
      setFontType(newType);
      localStorage.setItem("fontType", newType);
      applyFontType(newType);
    };

    return (
      <div className="flex gap-5 border-b border-gray-300 py-2 text-black-500 text-sm">
        <span>Font Type:</span>
        <select
          value={fontType}
          onChange={handleFontTypeChange}
          className="border border-gray-300 p-1 rounded"
        >
          <option value="font-sans">Sans (Inter)</option>
          <option value="font-mono">Mono (Roboto Mono)</option>
          <option value="font-serif">Serif (Georgia)</option>
          <option value="font-poppins">Poppins</option>
        </select>
      </div>
    );
  }

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="flex flex-col gap-3 w-[400px]">
        {/* New feature toggles for user preferences */}
        <div className="flex flex-col gap-5 border-b border-gray-300 py-2 text-black-500 text-sm">
          <div className="flex gap-2">
          <span>Toggle Keyboard Shortcuts to Navigate</span>
          <Switch checked={shortcutsEnabled} onCheckedChange={handleToggle} />
          </div>
          <div className="flex flex-col gap-1">
            <span>Press the corresponding keys to navigate to that page.</span>
            <span>n : New Task</span>
            <span>t : Task View</span>
            <span>h : Help</span>
            <span>p : Preferences</span>
          </div>
        </div>
        

        <div className="flex gap-5 border-b border-gray-300 py-2 text-sm items-center">
          <span>Font Size: {fontScale.toFixed(1)}x</span>
          <Button className="px-3 py-1 w-7 h-7" onClick={decreaseFont}>
            -
          </Button>
          <Button className="px-3 py-1 w-7 h-7" onClick={increaseFont}>
            +
          </Button>
        </div>

        <FontTypeDropdown />
      </div>
    </div>
  );
}
