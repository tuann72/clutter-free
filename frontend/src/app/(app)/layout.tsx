import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import KeyboardShortcutHandler from "@/components/keyboard-shortcut-handler";
import FontScaleGlobal from "@/components/FontSizeGlobal";
import FontTypeHandler from "@/components/FontTypeHandler";

export default function Layout({children} : {children: React.ReactNode}){
    return(
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
            <AppSidebar />                
            <SidebarTrigger />
            <KeyboardShortcutHandler />
            <FontTypeHandler />
            {children}
        </SidebarProvider>
        </ThemeProvider>
    )
}