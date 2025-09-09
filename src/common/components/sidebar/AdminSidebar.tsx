import {FC} from 'react';

import {
    Sidebar,
    SidebarContent, SidebarHeader,
} from "@/common/components/ui/sidebar"

import AdminTheatreSidebarGroup from "@/common/components/sidebar/admin/AdminTheatreSidebarGroup.tsx";
import AdminMovieSidebarGroup from "@/common/components/sidebar/admin/AdminMovieSidebarGroup.tsx";
import AdminAuthSidebarGroup from "@/common/components/sidebar/auth/AuthSidebarGroup.tsx";
import AdminSetupSidebarGroup from "@/common/components/sidebar/admin/AdminSetupSidebarGroup.tsx";

const AdminSidebar: FC = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                Noovies
            </SidebarHeader>

            <SidebarContent>
                <AdminAuthSidebarGroup />
                <AdminSetupSidebarGroup />
                <AdminMovieSidebarGroup />
                <AdminTheatreSidebarGroup />
            </SidebarContent>

        </Sidebar>
    );
};

export default AdminSidebar;
