/**
 * @file Specialized sidebar navigation component for the administrative dashboard.
 * @filename AdminSidebar.tsx
 */

import {FC} from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/common/components/ui/sidebar.tsx";
import AdminAuthSidebarGroup
    from "@/common/layout/admin-layout/sidebar/admin-side-bar-groups/AdminAuthSidebarGroup.tsx";
import AdminSetupSidebarGroup
    from "@/common/layout/admin-layout/sidebar/admin-side-bar-groups/AdminSetupSidebarGroup.tsx";
import AdminMovieSidebarGroup
    from "@/common/layout/admin-layout/sidebar/admin-side-bar-groups/AdminMovieSidebarGroup.tsx";
import AdminDashboardSidebarGroup
    from "@/common/layout/admin-layout/sidebar/admin-side-bar-groups/AdminDashboardSidebarGroup.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {LayoutThemeSidebarGroup} from "@/common/layout/common-layout/sidebar/LayoutThemeSidebarGroup.tsx";
import {cn} from "@/common/lib/utils.ts";

/**
 * Orchestrates the administrative navigation menu, providing quick access to management modules.
 * @returns A structured vertical navigation menu optimized for admin workflows.
 */
const AdminSidebar: FC = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <LoggedLink
                    to="/admin/dashboard"
                    className={cn(
                        "flex items-end justify-center space-x-2",
                        "tracking-tight px-4 py-2",
                    )}
                >
                    <span className="font-playwriteRoCursive text-3xl">Noovies</span>
                    <span className="text-gray-400 italic">Admin</span>
                </LoggedLink>
            </SidebarHeader>

            <SidebarContent className="font-spaceGrotesk">
                <AdminDashboardSidebarGroup />

                <AdminSetupSidebarGroup/>

                <AdminMovieSidebarGroup/>

                <LayoutThemeSidebarGroup/>

                <AdminAuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
};

export default AdminSidebar;