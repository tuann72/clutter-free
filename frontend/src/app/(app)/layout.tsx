import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({children} : {children: React.ReactNode}){
    return(
        <SidebarProvider>
            <AppSidebar />                
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    )
}