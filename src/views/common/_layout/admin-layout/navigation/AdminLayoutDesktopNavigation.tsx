/**
 * @fileoverview Desktop navigation layout for the admin section of the application.
 */

import {ReactElement} from 'react';
import {SROnly} from "@/views/common/_comp";
import {Button} from "@/views/common/_comp/ui/button.tsx";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {useAuthLogoutSubmitMutation} from "@/domains/auth/_feat/auth-logout/useAuthLogoutSubmitMutation.ts";
import {
    BaseLayoutDesktopThemeDropdown
} from "@/views/common/_layout/common/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";
import {
    AdminLayoutDashboardNavigationDropdown
} from "@/views/common/_layout/admin-layout/navigation/AdminLayoutDashboardNavigationDropdown.tsx";
import {
    AdminLayoutSetupNavigationDropdown
} from "@/views/common/_layout/admin-layout/navigation/AdminLayoutSetupNavigationDropdown.tsx";
import {
    AdminLayoutShowingNavigationDropdown
} from "@/views/common/_layout/admin-layout/navigation/AdminLayoutShowingNavigationDropdown.tsx";
import {
    AdminLayoutAccountNavigationDropdown
} from "@/views/common/_layout/admin-layout/navigation/AdminLayoutAccountNavigationDropdown.tsx";

/** Desktop navigation bar for the admin layout containing dropdowns for dashboard, setup, and showings. */
export function AdminLayoutDesktopNavigation(): ReactElement {
    const navigate = useLoggedNavigate();

    const onLogout = () => navigate({to: "/", component: AdminLayoutDesktopNavigation.name});
    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center space-x-0 font-spaceGrotesk">
            <SROnly text="Desktop Navigation"/>

            <AdminLayoutDashboardNavigationDropdown/>
            <AdminLayoutSetupNavigationDropdown/>
            <AdminLayoutShowingNavigationDropdown/>
            <AdminLayoutAccountNavigationDropdown/>

            <BaseLayoutDesktopThemeDropdown/>

            <Button
                variant="link"
                size="sm"
                className="text-neutral-400 hover:text-black dark:hover:text-white"
                onClick={() => logout()}
            >
                Log Out
            </Button>
        </section>
    );
}