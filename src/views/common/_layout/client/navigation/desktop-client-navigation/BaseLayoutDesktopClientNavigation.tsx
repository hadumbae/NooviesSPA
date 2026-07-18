/**
 * @fileoverview Main desktop navigation bar for the authenticated client layout.
 */

import {ReactElement} from 'react';
import {LayoutNavLink} from "@/views/common/_comp/layout/LayoutNavLink.tsx";
import {Button} from "@/common/components/ui";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {
    BaseLayoutClientProfileNavigationDropdown
} from "@/views/common/_layout/client/navigation/desktop-client-navigation/BaseLayoutClientProfileNavigationDropdown.tsx";
import {
    BaseLayoutClientBrowseNavigationDropdown
} from "@/views/common/_layout/client/navigation/desktop-client-navigation/BaseLayoutClientBrowseNavigationDropdown.tsx";
import {
    BaseLayoutDesktopThemeDropdown
} from "@/views/common/_layout/common/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
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
            <LayoutNavLink to="/">Home</LayoutNavLink>

            {isAdmin && <LayoutNavLink to="/admin/dashboard">Admin</LayoutNavLink>}

            <BaseLayoutClientBrowseNavigationDropdown/>
            <BaseLayoutClientProfileNavigationDropdown/>
            <BaseLayoutDesktopThemeDropdown/>

            <Button variant="link" size="sm" className="hover-button" onClick={() => logout()}>
                Log Out
            </Button>
        </section>
    );
}