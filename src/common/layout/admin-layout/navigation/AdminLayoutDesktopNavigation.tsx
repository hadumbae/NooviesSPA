import { FC } from 'react';
import NavLink from "@/common/components/navigation/NavLink.tsx";
import AdminLayoutSetupNavigationDropdown
    from "@/common/layout/admin-layout/navigation/AdminLayoutSetupNavigationDropdown.tsx";
import AdminLayoutMovieNavigationDropdown
    from "@/common/layout/admin-layout/navigation/AdminLayoutMovieNavigationDropdown.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
import useAuthLogoutSubmitMutation from "@/pages/auth/hooks/useAuthLogoutSubmitMutation.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import BaseLayoutDesktopThemeDropdown
    from "@/common/layout/common-layout/navigation/desktop-theme-navigation/BaseLayoutDesktopThemeDropdown.tsx";

/**
 * Admin desktop navigation.
 *
 * @remarks
 * - Provides dashboard navigation and admin dropdowns
 * - Includes theme selection and logout action
 * - Intended for admin desktop layouts only
 */
const AdminLayoutDesktopNavigation: FC = () => {
    const navigate = useLoggedNavigate();

    const onLogout = () =>
        navigate({to: "/", component: AdminLayoutDesktopNavigation.name});

    const {mutate: logout} =
        useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    return (
        <section className="flex items-center space-x-2">
            <SectionHeader srOnly={true}>Desktop Navigation</SectionHeader>

            <NavLink to="/admin/dashboard">Dashboard</NavLink>

            <AdminLayoutSetupNavigationDropdown />
            <AdminLayoutMovieNavigationDropdown />

            <BaseLayoutDesktopThemeDropdown />

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

export default AdminLayoutDesktopNavigation;
