import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {Moon } from "lucide-react";

export default function Preferences() {
  return (
    <div className="h-screen w-screen flex flex-col bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-md font-medium text-gray-700">Welcome back John!</span>
          <Avatar className="w-8 h-8 bg-gray-400 text-black">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-gray-400 text-black">JS</AvatarFallback>
        </Avatar>
        </div>
        <nav className="flex space-x-6 text-sm text-gray-800">
          <a href="#" className="hover:underline">New Task</a>
          <a href="#" className="hover:underline">Task Views</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="font-semibold">Preferences</a>
          <a href="#" className="hover:underline">Logout</a>
          <Moon className="w-6 h-6 text-black stroke-[2]" />
        </nav>
      </div>
      <div className="flex w-full h-screen items-center justify-start px-16 space-x-16">
  <div className="w-1/4">
    <div className="flex flex-col space-y-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center border-b border-gray-300 py-2 text-black-500 text-sm"
        >
          Accessibility Feature {i + 1}
          <Switch  />
        </div>
  ))}
</div>
</div>
<div className="w-1/6"></div>
        <div className="w-[400px] h-[500px] bg-gray-300 rounded-lg flex items-center justify-center text-lg text-black-700 ml-16">
          Feature Preview
        </div>
      </div>
      </div>
  );
}
