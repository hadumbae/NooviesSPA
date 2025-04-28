import {FC} from 'react';

import {
    Sidebar,
    SidebarContent, SidebarHeader,
} from "@/common/components/ui/sidebar"

import AdminTheatreSidebarGroup from "@/common/components/sidebar/admin/AdminTheatreSidebarGroup.tsx";
import AdminMovieSidebarGroup from "@/common/components/sidebar/admin/AdminMovieSidebarGroup.tsx";
import AdminAuthSidebarGroup from "@/common/components/sidebar/auth/AuthSidebarGroup.tsx";

const AdminSidebar: FC = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                Noovies
            </SidebarHeader>

            <SidebarContent>
                <AdminAuthSidebarGroup />
                <AdminMovieSidebarGroup />
                <AdminTheatreSidebarGroup />
            </SidebarContent>

        </Sidebar>
    );
};

export default AdminSidebar;
