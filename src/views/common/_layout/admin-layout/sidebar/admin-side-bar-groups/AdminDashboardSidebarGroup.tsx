import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/common/components/ui/sidebar/sidebar.tsx";
import {Link} from "react-router-dom";
import {TableOfContents} from "lucide-react";

/**
 * Admin dashboard sidebar group.
 *
 * @remarks
 * - Provides navigation entry for the admin dashboard
 * - Intended for use within {@link AdminSidebar}
 */
const AdminDashboardSidebarGroup = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

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

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/">
                                <TableOfContents />
                                <span>Client Pages</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default AdminDashboardSidebarGroup;
