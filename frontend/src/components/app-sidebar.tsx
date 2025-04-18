'use client';

import { Inbox, ListTodo, Info, Settings2, LogOut, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
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

// Menu items
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
    url: "/sign-in",
    icon: LogOut,
    isLogout: true,
  },
];

export function AppSidebar() {
  // signs user our
  const { signOut } = useClerk();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // handles logout
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    // waits for signout to finish
    await signOut();
    // change page to sign in
    router.push("/sign-in");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* sidebar top label */}
          <SidebarGroupLabel>ClutterFree</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* loop through the list of items
              smarter way of adding multiple items */}
              {items.map((item) => (
                // for each item create a tab navigation for it
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={item.isLogout ? handleLogout : undefined}
                  >
                    {item.isLogout ? (
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                    ) : (
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Dark mode toggle button */}
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
