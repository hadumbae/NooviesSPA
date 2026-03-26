/**
 * @file Desktop-specific navigation bar for the administrative layout.
 * @filename AdminLayoutDesktopNavigation.tsx
 */

import {FC} from 'react';
import AdminLayoutSetupNavigationDropdown
    from "@/common/layout/admin-layout/navigation/AdminLayoutSetupNavigationDropdown.tsx";
import AdminLayoutShowingNavigationDropdown
    from "@/common/layout/admin-layout/navigation/AdminLayoutShowingNavigationDropdown.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useAuthLogoutSubmitMutation from "@/domains/auth/hooks/useAuthLogoutSubmitMutation.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import BaseLayoutDesktopThemeDropdown
    from "@/common/layout/common-layout/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";
import AdminLayoutDashboardNavigationDropdown
    from "@/common/layout/admin-layout/navigation/AdminLayoutDashboardNavigationDropdown.tsx";

/**
 * Orchestrates the horizontal navigation suite for administrative users on desktop.
 */
const AdminLayoutDesktopNavigation: FC = () => {
    const navigate = useLoggedNavigate();

    const onLogout = () => navigate({to: "/", component: AdminLayoutDesktopNavigation.name});
    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center space-x-0 font-spaceGrotesk">
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

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