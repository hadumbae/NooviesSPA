import {FC} from 'react';
import Cookies from "js-cookie";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import GuestSidebar from "@/common/layout/base-layout/sidebar/guest-side-bar/GuestSidebar.tsx";
import AdminSidebar from "@/common/layout/base-layout/sidebar/admin-side-bar/AdminSidebar.tsx";
import ClientSidebar from "@/common/layout/base-layout/sidebar/client-side-bar/ClientSidebar.tsx";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

/**
 * **BaseSidebar**
 *
 * Determines and renders the appropriate sidebar based on the current
 * authentication and authorization state.
 *
 * ### Behavior
 * 1. Checks for authentication via the `hasAuthToken` cookie.
 * 2. Retrieves the current user from {@link AuthContext}.
 * 3. Conditionally renders:
 *    - `AdminSidebar` if the user is authenticated and an admin
 *    - `ClientSidebar` if the user is authenticated but not an admin
 *    - `GuestSidebar` if the user is unauthenticated
 *
 * ### Notes
 * - Assumes the presence of the `hasAuthToken` cookie is sufficient to
 *   indicate authentication, but also requires a valid user object from context.
 * - Safe defaults are applied (`isAdmin = false`) if user data is missing.
 *
 * @returns {JSX.Element} The sidebar component appropriate for the current user
 */
const BaseSidebar: FC = () => {
    /** Check for authentication token in cookies */
    const isAuthenticated = Cookies.get("hasAuthToken");

    /** Retrieve auth context */
    const {user} = useRequiredContext({context: AuthContext});


    if (isAuthenticated && user) {
        const {isAdmin = false} = user ?? {};

        console.log("User: ", user);
    console.log("isAuthenticated: ", isAuthenticated);

        return (
            isAdmin
                ? <AdminSidebar/>
                : <ClientSidebar/>
        );
    }

    /** Guest sidebar for unauthenticated users */
    return <GuestSidebar/>;
};

export default BaseSidebar;
