import type React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (

        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>

    );
}

export const metadata = {
    generator: "v0.dev",
};


