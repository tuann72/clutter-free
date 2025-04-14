'use client';

import { Inbox, ListTodo, Info, Settings2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
