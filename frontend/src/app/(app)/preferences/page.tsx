import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {Moon } from "lucide-react";

export default function Preferences() {
  return (
    <div className="w-screen flex justify-center items-center overflow-hidden">
      <div className="flex flex-col gap-3">
        {/* List of accessibility feature toggles for user preferences */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex gap-5 border-b border-gray-300 py-2 text-black-500 text-sm"
          >
            Accessibility Feature {i + 1}
            <Switch  />
          </div>
        ))}
      </div>
      {/* Mini window showing effects of preferences */}
      <div className="w-[400px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center text-lg text-black-700 ml-16">
        Feature Preview
      </div>
    </div>
  );
}
