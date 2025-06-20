import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FolderOpen, Home, Newspaper, User2 } from "lucide-react";

const items = [
    {
        title: "Home",
        url: "/admin",
        icon: Home
    },
    {
        title: "Categories",
        url: "/admin/categories",
        icon: FolderOpen
    },
    {
        title: "Posts",
        url: "/admin/posts",
        icon: Newspaper
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: User2
    }
];

export default function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Blog</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}