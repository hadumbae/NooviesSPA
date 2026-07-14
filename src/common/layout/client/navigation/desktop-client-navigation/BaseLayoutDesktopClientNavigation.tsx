/**
 * @fileoverview Main desktop navigation bar for the authenticated client layout.
 */

import {ReactElement} from 'react';
import NavLink from "@/common/components/navigation/NavLink.tsx";
import {Button} from "@/common/components/ui";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import {
    BaseLayoutClientProfileNavigationDropdown
} from "@/common/layout/client/navigation/desktop-client-navigation/BaseLayoutClientProfileNavigationDropdown.tsx";
import {
    BaseLayoutClientBrowseNavigationDropdown
} from "@/common/layout/client/navigation/desktop-client-navigation/BaseLayoutClientBrowseNavigationDropdown.tsx";
import {
    BaseLayoutDesktopThemeDropdown
} from "@/common/layout/common-layout/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext, useAuthLogoutSubmitMutation} from "@/domains/auth";
import {SROnly} from "@/views/common/_comp";

/**
 * Renders the primary horizontal navigation suite for desktop users.
 * Requires AuthContext to determine role-based link visibility.
 */
export function BaseLayoutDesktopClientNavigation(): ReactElement {
    const navigate = useLoggedNavigate();
    const {isAdmin} = useRequiredContext({context: AuthContext});

    const onLogout = () => navigate({to: "/", component: BaseLayoutDesktopClientNavigation.name});
    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center space-x-2 font-spaceGrotesk">
            <SROnly text="Desktop Navigation"/>
            <NavLink to="/">Home</NavLink>

            {isAdmin && <NavLink to="/admin/dashboard">Admin</NavLink>}

            <BaseLayoutClientBrowseNavigationDropdown/>
            <BaseLayoutClientProfileNavigationDropdown/>
            <BaseLayoutDesktopThemeDropdown/>

            <Button variant="link" size="sm" className="hover-button" onClick={() => logout()}>
                Log Out
            </Button>
        </section>
    );
}