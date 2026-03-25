/**
 * @file Main sidebar navigation component for the client-facing application.
 * @filename ClientSidebar.tsx
 */

import {FC} from 'react';
import {Sidebar, SidebarContent, SidebarHeader} from "@/common/components/ui/sidebar.tsx";
import ClientProfileSidebarGroup
    from "@/common/layout/base-layout/sidebar/client-side-bar/ClientProfileSidebarGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import AuthSidebarGroup from "@/common/layout/admin-layout/sidebar/admin-side-bar-groups/AdminAuthSidebarGroup.tsx";
import ClientBrowseSidebarGroup from "@/common/layout/base-layout/sidebar/client-side-bar/ClientBrowseSidebarGroup.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/domains/auth/context/AuthContext.ts";
import AdminLinksSidebarGroup from "@/common/layout/common-layout/navigation/side-bar-group/AdminLinksSidebarGroup.tsx";
import {LayoutThemeSidebarGroup} from "@/common/layout/common-layout/sidebar/LayoutThemeSidebarGroup.tsx";

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