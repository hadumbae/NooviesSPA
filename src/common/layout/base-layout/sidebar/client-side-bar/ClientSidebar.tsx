import {FC} from 'react';
import {Sidebar, SidebarContent, SidebarHeader} from "@/common/components/ui/sidebar.tsx";
import ClientProfileSidebarGroup
    from "@/common/layout/base-layout/sidebar/client-side-bar/ClientProfileSidebarGroup.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import AuthSidebarGroup from "@/common/layout/admin-layout/sidebar/admin-side-bar-groups/AdminAuthSidebarGroup.tsx";
import ClientBrowseSidebarGroup from "@/common/layout/base-layout/sidebar/client-side-bar/ClientBrowseSidebarGroup.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import AdminLinksSidebarGroup from "@/common/layout/common-layout/navigation/side-bar-group/AdminLinksSidebarGroup.tsx";

/**
 * **ClientSidebar**
 *
 * Sidebar component specifically for **authenticated client users**.
 *
 * ### Features
 * - Displays the application title/logo in the header (`Noovies`).
 * - Includes structured sidebar groups for:
 *   - **Profile** (`ClientProfileSidebarGroup`)
 *   - **Movie management** (`ClientMovieSidebarGroup`)
 *   - **Authentication actions** (`AuthSidebarGroup`)
 * - Separators (`Separator`) are used to visually separate groups.
 *
 * ### Notes
 * - Designed to work with the main `Sidebar` layout component.
 * - Intended for client users only (not admin or guest).
 *
 * @returns {JSX.Element} A fully structured client sidebar
 */
const ClientSidebar: FC = () => {
    const {isAdmin} = useRequiredContext({context: AuthContext});

    return (
        <Sidebar>
            <SidebarHeader className="flex justify-center items-center">
                <h1 className="text-3xl font-playwriteRoCursive">Noovies</h1>
            </SidebarHeader>

            <SidebarContent>
                {/* Admin */}

                {
                    isAdmin && <>
                        <Separator/>
                        <AdminLinksSidebarGroup/>
                    </>
                }

                {/* Movie */}

                <Separator/>
                <ClientBrowseSidebarGroup/>

                {/* Profile */}

                <Separator/>
                <ClientProfileSidebarGroup/>

                {/* Auth */}

                <Separator/>
                <AuthSidebarGroup/>
            </SidebarContent>
        </Sidebar>
    );
};

export default ClientSidebar;
