/**
 * @file Main sidebar navigation component for the administrative dashboard.
 * @filename AdminSidebar.tsx
 */

import {FC} from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/views/common/_comp/ui/sidebar/sidebar.tsx";
import AdminAuthSidebarGroup
    from "@/views/common/_layout/admin-layout/sidebar/admin-side-bar-groups/AdminAuthSidebarGroup.tsx";
import AdminSetupSidebarGroup
    from "@/views/common/_layout/admin-layout/sidebar/admin-side-bar-groups/AdminSetupSidebarGroup.tsx";
import AdminMovieSidebarGroup
    from "@/views/common/_layout/admin-layout/sidebar/admin-side-bar-groups/AdminMovieSidebarGroup.tsx";
import AdminDashboardSidebarGroup
    from "@/views/common/_layout/admin-layout/sidebar/admin-side-bar-groups/AdminDashboardSidebarGroup.tsx";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {LayoutThemeSidebarGroup} from "@/views/common/_layout/common/sidebar/LayoutThemeSidebarGroup.tsx";
import {cn} from "@/common/_feat";
import {
    AdminReservationSidebarGroup
} from "@/views/common/_layout/admin-layout/sidebar/admin-side-bar-groups/AdminReservationSidebarGroup.tsx";

/**
 * Orchestrates the administrative vertical navigation menu.
 * @returns A structured sidebar component integrated with the shadcn/ui sidebar provider.
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
                <AdminDashboardSidebarGroup/>
                <AdminSetupSidebarGroup/>
                <AdminMovieSidebarGroup/>
                <AdminReservationSidebarGroup/>

                <LayoutThemeSidebarGroup/>
                <AdminAuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
};

export default AdminSidebar;