/**
 * @file Main sidebar navigation component for the client-facing application.
 * @filename ClientSidebar.tsx
 */

import {FC} from 'react';
import {Sidebar, SidebarContent, SidebarHeader} from "@/common/components/ui/sidebar/sidebar.tsx";
import ClientProfileSidebarGroup
    from "@/views/common/_layout/base-layout/sidebar/client-side-bar/ClientProfileSidebarGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import AuthSidebarGroup from "@/views/common/_layout/admin-layout/sidebar/admin-side-bar-groups/AdminAuthSidebarGroup.tsx";
import {
    ClientBrowseSidebarGroup
} from "@/views/common/_layout/base-layout/sidebar/client-side-bar/ClientBrowseSidebarGroup.tsx";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {AuthContext} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";
import AdminLinksSidebarGroup from "@/views/common/_layout/common/navigation/side-bar-group/AdminLinksSidebarGroup.tsx";
import {LayoutThemeSidebarGroup} from "@/views/common/_layout/common/sidebar/LayoutThemeSidebarGroup.tsx";

/**
 * Orchestrates the sidebar content for client users, with conditional administrative shortcuts.
 */
const ClientSidebar: FC = () => {
    const {isAdmin} = useRequiredContext({context: AuthContext});

    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center">
                <h1 className="text-3xl font-playwriteRoCursive">Noovies</h1>
            </SidebarHeader>

            <SidebarContent className="font-spaceGrotesk">
                {
                    isAdmin && <>
                        <Separator/>
                        <AdminLinksSidebarGroup/>
                    </>
                }

                <Separator/>
                <ClientBrowseSidebarGroup/>

                <Separator/>
                <ClientProfileSidebarGroup/>

                <Separator/>
                <LayoutThemeSidebarGroup/>

                <Separator/>
                <AuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
};

export default ClientSidebar;