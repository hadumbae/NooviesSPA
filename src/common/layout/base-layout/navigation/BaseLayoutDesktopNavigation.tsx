import {FC} from 'react';
import BaseLayoutDesktopAdminNavigation
    from "@/common/layout/base-layout/navigation/desktop-admin-navigation/BaseLayoutDesktopAdminNavigation.tsx";
import BaseLayoutDesktopGuestNavigation
    from "@/common/layout/base-layout/navigation/desktop-guest-navigation/BaseLayoutDesktopGuestNavigation.tsx";
import Cookies from "js-cookie";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import BaseLayoutDesktopClientNavigation
    from "@/common/layout/base-layout/navigation/desktop-client-navigation/BaseLayoutDesktopClientNavigation.tsx";

/**
 * **BaseLayoutDesktopNavigation**
 *
 * Determines which desktop navigation component to render
 * based on the current authentication and authorization state.
 *
 * ### Behavior
 * 1. Checks for a valid authentication token via cookies (`hasAuthToken`).
 * 2. Retrieves the current user from {@link AuthContext} using `useRequiredContext`.
 * 3. Conditionally renders:
 *    - `BaseLayoutDesktopAdminNavigation` if the user is authenticated and an admin.
 *    - `BaseLayoutDesktopUserNavigation` if the user is authenticated but not an admin.
 *    - `BaseLayoutDesktopGuestNavigation` if the user is not authenticated.
 *
 * ### Notes
 * - This component does not handle mobile navigation.
 * - Assumes `hasAuthToken` cookie presence is sufficient for authentication check,
 *   but also requires a valid `user` object from context.
 *
 * @returns {JSX.Element} The appropriate desktop navigation component
 */
const BaseLayoutDesktopNavigation: FC = () => {
    /** Checks for authentication token in cookies */
    const isAuthenticated = Cookies.get("hasAuthToken");

    /** Retrieves current user from AuthContext (required) */
    const {user} = useRequiredContext({context: AuthContext});

    if (isAuthenticated && user) {
        const {isAdmin} = user;

        return (
            isAdmin
                ? <BaseLayoutDesktopAdminNavigation/>
                : <BaseLayoutDesktopClientNavigation/>
        );
    }

    /** Guest navigation for unauthenticated users */
    return (
        <BaseLayoutDesktopGuestNavigation/>
    );
};

export default BaseLayoutDesktopNavigation;
