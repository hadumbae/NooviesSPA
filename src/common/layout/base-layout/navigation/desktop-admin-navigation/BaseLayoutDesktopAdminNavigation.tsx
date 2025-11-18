import {FC} from 'react';
import NavLink from "@/common/components/navigation/NavLink.tsx";
import BaseLayoutSetupNavigationDropdown
    from "@/common/layout/base-layout/navigation/desktop-admin-navigation/BaseLayoutSetupNavigationDropdown.tsx";
import BaseLayoutMovieNavigationDropdown
    from "@/common/layout/base-layout/navigation/desktop-admin-navigation/BaseLayoutMovieNavigationDropdown.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import BaseLayoutDesktopThemeDropdown
    from "@/common/layout/base-layout/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";

/**
 * **BaseLayoutDesktopAdminNavigation**
 *
 * Desktop navigation component specifically for **admin users**.
 *
 * ### Features
 * - Renders a dashboard link (`NavLink to="/"`)
 * - Includes admin dropdowns for setup and movie sections:
 *   - `BaseLayoutSetupNavigationDropdown`
 *   - `BaseLayoutMovieNavigationDropdown`
 * - Provides a "Log Out" button that triggers the auth logout mutation
 *   and navigates back to `/` on success
 *
 * ### Hooks
 * - `useLoggedNavigate` is used to log navigation actions.
 * - `useAuthLogoutSubmitMutation` handles logout API call and success callback.
 *
 * ### Accessibility
 * - Includes a visually-hidden section header for screen readers.
 *
 * @returns {JSX.Element} The desktop navigation section for admin users
 */
const BaseLayoutDesktopAdminNavigation: FC = () => {
    /** Navigation logger */
    const navigate = useLoggedNavigate();

    /** Callback after successful logout to redirect to home */
    const onLogout = () => navigate({to: "/", component: BaseLayoutDesktopAdminNavigation.name});

    /** Logout mutation hook */
    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center">
            {/** Hidden section header for accessibility */}
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

            {/** Dashboard link */}
            <NavLink to="/">Dashboard</NavLink>

            {/** Admin-specific dropdown menus */}
            <BaseLayoutSetupNavigationDropdown/>
            <BaseLayoutMovieNavigationDropdown/>

            <BaseLayoutDesktopThemeDropdown />

            {/** Log Out button */}
            <Button
                variant="link"
                size="sm"
                className="text-neutral-400 hover:text-black"
                onClick={() => logout()}
            >
                Log Out
            </Button>
        </section>
    );
};

export default BaseLayoutDesktopAdminNavigation;
