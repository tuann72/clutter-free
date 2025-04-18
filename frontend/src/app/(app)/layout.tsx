'use client';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, Moon, Sun } from "lucide-react";
import { useUserInfo } from '@/context/UserContext';
import { ThemeProvider } from "@/components/theme-provider";
import KeyboardShortcutHandler from "@/components/keyboard-shortcut-handler";
import FontScaleGlobal from "@/components/FontSizeGlobal";
import FontTypeHandler from "@/components/FontTypeHandler";
import { useTheme } from "next-themes";

export default function Layout({children} : {children: React.ReactNode}){

    const [toggleTopRightOptions, setToggleTopRightOptions] = useState(false);

    const toggleVisibility = () => {
        setToggleTopRightOptions((state) => !state)
    }

    const { theme, setTheme } = useTheme();

    const userInfo = useUserInfo();

    return(
        <div className="text-wrapper">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <KeyboardShortcutHandler />
        <FontScaleGlobal />
        <FontTypeHandler />
        <SidebarProvider>
            <AppSidebar />                
        <SidebarTrigger />
            <div className="flex flex-row absolute top-0 right-0 px-2 gap-2 py-2">
                <Button variant='ghost' size='icon' onClick={toggleVisibility}>
                    {toggleTopRightOptions === false && <Eye/>}
                    {toggleTopRightOptions === true && <EyeClosed/>}
                </Button>
                {toggleTopRightOptions === false && (
                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-fit">
                            Hi {userInfo ? userInfo.firstName : "Guest User"}
                        </div>
                            {/* Dark mode toggle button */}
                                <Button
                                    variant='ghost'
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="flex items-center justify-center rounded-md bg-transparent hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-600 transition"
                                    aria-label="Toggle Dark Mode"
                                >
                                    {theme === "dark" ? (
                                    <>
                                        <Moon className="w-5 h-5" />
                                    </>
                                    ) : (
                                    <>
                                        <Sun className="w-5 h-5" />
                                    </>
                                    )}
                                </Button>
                             <div>  
                        </div>
                    </div>
                )}
                
            </div>
            {children}
        </SidebarProvider>
        </ThemeProvider>
        </div>
    )
}