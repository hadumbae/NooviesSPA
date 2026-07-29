/**
 * @fileoverview Sidebar group component for the admin dashboard navigation.
 */

import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {TableOfContents} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/views/common/_comp/ui";

/**
 * Sidebar group containing links to the admin dashboard and client pages.
 */
export function AdminDashboardSidebarGroup(): ReactElement {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/dashboard">
                                <TableOfContents/>
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/">
                                <TableOfContents/>
                                <span>Client Pages</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
