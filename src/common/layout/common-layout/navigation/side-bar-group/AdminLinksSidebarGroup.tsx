import { FC } from 'react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/common/components/ui/sidebar.tsx";
import { Link } from "react-router-dom";
import { TableOfContents } from "lucide-react";

/**
 * Admin links sidebar group.
 *
 * @remarks
 * - Provides primary admin navigation links
 * - Intended for use within {@link AdminSidebar}
 */
const AdminLinksSidebarGroup: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/admin/dashboard">
                                <TableOfContents />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminLinksSidebarGroup;
