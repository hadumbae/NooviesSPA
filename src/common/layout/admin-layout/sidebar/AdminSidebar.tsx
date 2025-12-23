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

/**
 * **AdminSidebar**
 *
 * Sidebar component specifically for **authenticated admin users**.
 *
 * ### Features
 * - Displays the application title/logo (`Noovies`) in the header.
 * - Includes structured sidebar groups for:
 *   - **Setup management** (`AdminSetupSidebarGroup`)
 *   - **Movie management** (`AdminMovieSidebarGroup`)
 *   - **Authentication actions** (`AdminAuthSidebarGroup`)
 *
 * ### Notes
 * - Designed to work with the main `Sidebar` layout component.
 * - Intended for admin users only; should not be used for guests or clients.
 *
 * @returns {JSX.Element} A fully structured admin sidebar
 */
const AdminSidebar: FC = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                NOOVIES Admin
            </SidebarHeader>

            <SidebarContent>
                <AdminSetupSidebarGroup/>
                <AdminMovieSidebarGroup/>
                <AdminAuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
};

export default AdminSidebar;
