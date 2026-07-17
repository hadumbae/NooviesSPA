/**
 * @file Desktop-specific navigation bar for the administrative layout.
 * @filename AdminLayoutDesktopNavigation.tsx
 */

import {FC} from 'react';
import AdminLayoutSetupNavigationDropdown
    from "@/views/common/_layout/admin-layout/navigation/AdminLayoutSetupNavigationDropdown.tsx";
import AdminLayoutShowingNavigationDropdown
    from "@/views/common/_layout/admin-layout/navigation/AdminLayoutShowingNavigationDropdown.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {useAuthLogoutSubmitMutation} from "@/domains/auth/_feat/auth-logout/useAuthLogoutSubmitMutation.ts";
import {
    BaseLayoutDesktopThemeDropdown
} from "@/views/common/_layout/common/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";
import AdminLayoutDashboardNavigationDropdown
    from "@/views/common/_layout/admin-layout/navigation/AdminLayoutDashboardNavigationDropdown.tsx";
import {SROnly} from "@/views/common/_comp";

/**
 * Orchestrates the horizontal navigation suite for administrative users on desktop.
 */
const AdminLayoutDesktopNavigation: FC = () => {
    const navigate = useLoggedNavigate();

    const onLogout = () => navigate({to: "/", component: AdminLayoutDesktopNavigation.name});
    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center space-x-0 font-spaceGrotesk">
            <SROnly text="Desktop Navigation"/>

            {/** Category-based navigation dropdowns */}
            <AdminLayoutDashboardNavigationDropdown/>
            <AdminLayoutSetupNavigationDropdown/>
            <AdminLayoutShowingNavigationDropdown/>

            {/** Global UI and Auth controls */}
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
};

export default AdminLayoutDesktopNavigation;