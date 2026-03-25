/**
 * @file Main desktop navigation bar for the authenticated client layout.
 * @filename BaseLayoutDesktopClientNavigation.tsx
 */

import {FC} from 'react';
import NavLink from "@/common/components/navigation/NavLink.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useAuthLogoutSubmitMutation from "@/domains/auth/hooks/useAuthLogoutSubmitMutation.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import BaseLayoutClientProfileNavigationDropdown
    from "@/common/layout/client/navigation/desktop-client-navigation/BaseLayoutClientProfileNavigationDropdown.tsx";
import BaseLayoutClientBrowseNavigationDropdown
    from "@/common/layout/client/navigation/desktop-client-navigation/BaseLayoutClientBrowseNavigationDropdown.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import BaseLayoutDesktopThemeDropdown
    from "@/common/layout/common-layout/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/domains/auth/context/AuthContext.ts";

/**
 * Renders the primary horizontal navigation suite for desktop users.
 * * * **Composition:** Includes home navigation, conditional admin access, browse categories, profile management, and theme selection.
 * * **Authorization:** Consumes {@link AuthContext} to conditionally render the Admin dashboard link based on the user's role.
 * * **Authentication:** Integrates {@link useAuthLogoutSubmitMutation} to handle session termination and cleanup.
 * * **Accessibility:** Provides a screen-reader-only {@link SectionHeader} for landmark navigation.
 */
const BaseLayoutDesktopClientNavigation: FC = () => {
    const navigate = useLoggedNavigate();

    /** Accesses current authentication state to determine role-based link visibility. */
    const {isAdmin} = useRequiredContext({context: AuthContext});

    /** Handles cleanup and navigation after a successful logout mutation. */
    const onLogout = () => navigate({to: "/", component: BaseLayoutDesktopClientNavigation.name});

    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center space-x-2 font-spaceGrotesk">
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

            <NavLink to="/">Home</NavLink>

            {/* Role-based admin entry point */}
            {
                isAdmin &&
                <NavLink to="/admin/dashboard">Admin</NavLink>
            }

            {/* Catalog search and category dropdown */}
            <BaseLayoutClientBrowseNavigationDropdown/>

            {/* User account and history dropdown */}
            <BaseLayoutClientProfileNavigationDropdown/>

            {/* Application appearance settings */}
            <BaseLayoutDesktopThemeDropdown/>

            {/* Session termination trigger */}
            <Button
                variant="link"
                size="sm"
                className={HoverLinkCSS}
                onClick={() => logout()}
            >
                Log Out
            </Button>
        </section>
    );
};

export default BaseLayoutDesktopClientNavigation;