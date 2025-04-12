"use client";

import { useEffect, useState } from "react";

const fonts = [
  { label: "Sans (Inter)", value: "font-sans" },
  { label: "Mono (Roboto Mono)", value: "font-mono" },
  { label: "Serif (Georgia)", value: "font-serif" },
  { label: "Custom (Poppins)", value: "font-custom" },
];

export default function FontSelector() {
  const [selectedFont, setSelectedFont] = useState("font-mono");

  useEffect(() => {
    const saved = localStorage.getItem("preferredFont");
    if (saved) {
      setSelectedFont(saved);
      document.body.classList.add(saved);
    }
  }, []);

  const handleChange = (value: string) => {
    fonts.forEach(f => document.body.classList.remove(f.value));
    document.body.classList.add(value);
    localStorage.setItem("preferredFont", value);
    setSelectedFont(value);
  };

  return (
    <div className="text-sm text-black dark:text-white px-3 mt-4">
      <label className="block mb-1 font-medium">Font</label>
      <select
        value={selectedFont}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>
    </div>
  );
}
