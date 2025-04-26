import type React from "react";
import { NextAuthProvider } from "@/components/providers/session-provider";
import { SonnerProvider } from "@/components/providers/sonner-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-screen overflow-x-hidden" suppressHydrationWarning>
        <NextAuthProvider>
          <QueryProvider>
            <SidebarProvider>
              <AppSidebar variant="inset" />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          </QueryProvider>
        </NextAuthProvider>
        <SonnerProvider />
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
};


