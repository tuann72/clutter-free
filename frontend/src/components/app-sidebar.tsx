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
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ClutterFree</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
