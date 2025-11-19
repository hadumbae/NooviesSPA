import { FC } from 'react';
import NavLink from "@/common/components/navigation/NavLink.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import BaseLayoutClientProfileNavigationDropdown
    from "@/common/layout/base-layout/navigation/desktop-client-navigation/BaseLayoutClientProfileNavigationDropdown.tsx";
import BaseLayoutClientMovieNavigationDropdown
    from "@/common/layout/base-layout/navigation/desktop-client-navigation/BaseLayoutClientMovieNavigationDropdown.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";

/**
 * `BaseLayoutDesktopClientNavigation` renders the main desktop navigation
 * for the client layout.
 *
 * The component includes:
 * - A visually hidden `SectionHeader` for accessibility.
 * - A `NavLink` to the home page.
 * - Dropdown navigation for movies (`BaseLayoutClientMovieNavigationDropdown`) and profile (`BaseLayoutClientProfileNavigationDropdown`).
 * - A logout button that triggers the `useAuthLogoutSubmitMutation` hook and redirects to the home page upon success.
 *
 * ⚡ Features:
 * - Uses `useLoggedNavigate` to navigate programmatically with logging.
 * - Leverages `useAuthLogoutSubmitMutation` for logout functionality.
 * - Styling is applied to links and buttons to indicate interactivity and hover states.
 *
 * @component
 * @example
 * ```tsx
 * <BaseLayoutDesktopClientNavigation />
 * ```
 */
const BaseLayoutDesktopClientNavigation: FC = () => {
    // Navigate with logging
    const navigate = useLoggedNavigate();

    // Logout handler: navigates home on successful logout
    const onLogout = () => navigate({ to: "/", component: BaseLayoutDesktopClientNavigation.name });
    const { mutate: logout } = useAuthLogoutSubmitMutation({ onSubmitSuccess: onLogout });

    return (
        <section className="flex items-center">
            {/* Screen reader only header for accessibility */}
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

            {/* Home link */}
            <NavLink to="/">Home</NavLink>

            {/* Movies dropdown */}
            <BaseLayoutClientMovieNavigationDropdown />

            {/* Profile dropdown */}
            <BaseLayoutClientProfileNavigationDropdown />

            {/* Logout button */}
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
