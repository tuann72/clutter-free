'use client';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useUserInfo } from '@/context/UserContext';
import { ThemeProvider } from "@/components/theme-provider";
import KeyboardShortcutHandler from "@/components/keyboard-shortcut-handler";
import FontScaleGlobal from "@/components/FontSizeGlobal";
import FontTypeHandler from "@/components/FontTypeHandler";

export default function Layout({children} : {children: React.ReactNode}){

    const [toggleTopRightOptions, setToggleTopRightOptions] = useState(false);

    const toggleVisibility = () => {
        setToggleTopRightOptions((state) => !state)
    }

    const userInfo = useUserInfo();

    return(
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
            <AppSidebar />                
            <SidebarTrigger />
            <KeyboardShortcutHandler />
        <FontScaleGlobal />
        <FontTypeHandler />
            <div className="flex absolute top-0 right-0 px-2 gap-2">
                <Button variant='ghost' size='icon' onClick={toggleVisibility}>
                    {toggleTopRightOptions === false && <Eye/>}
                    {toggleTopRightOptions === true && <EyeClosed/>}
                </Button>
                {toggleTopRightOptions === false && (
                    <div>
                        <div className="py-1">
                            Hi {userInfo ? userInfo.firstName : "Guest User"}
                        </div>

                        {/* add buttons here */}
                        <div>
                            
                        </div>
                    </div>
                )}
                
            </div>
            {children}
        </SidebarProvider>
        </ThemeProvider>
    )
}