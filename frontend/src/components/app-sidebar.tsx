"use client";

import { Inbox, ListTodo, Info, Settings2, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";



import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "New Task",
    url: "/newtask",
    icon: Inbox,
  },
  {
    title: "Task View",
    url: "/taskview",
    icon: ListTodo,
  },
  {
    title: "Help",
    url: "/help",
    icon: Info,
  },
  {
    title: "Preferences",
    url: "/preferences",
    icon: Settings2,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const { theme, setTheme } = useTheme(); 
  return (
    <>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ClutterFree</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <div className="mt-6 px-3">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-white">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-gray-800" />
                    <span className="text-sm text-black">Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </>
  );
}
