import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./components/AdminSidebar";
import { ReactNode } from "react";
import './global.css';
import Header from "./components/Header";

export default function Layout({ children }: Readonly<{children: ReactNode}>) {
    return (
        <html>
            <body>
                <SidebarProvider>
                    <AdminSidebar />

                    <div className="flex-1">
                        <Header />

                        <main>
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}