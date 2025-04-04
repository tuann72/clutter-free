import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Layout({children} : {children: React.ReactNode}){
    return(
        <SidebarProvider>
            <AppSidebar />                
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    )
}