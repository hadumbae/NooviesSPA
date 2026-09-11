/**
 * @fileoverview Page component that handles the user logout process.
 */

import {ReactElement, useEffect} from 'react';
import {useAuthLogoutUser} from "@/domains/auth/_feat/user-logout/useAuthLogoutUser.ts";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {PageLoader} from "@/views/common/_comp/page";

/**
 * Triggers the logout mutation on mount and redirects to the homepage upon completion.
 */
export function AuthLogoutPage(): ReactElement {
    const navigate = useLoggedNavigate();

    const onLogout = () => {
        navigate({
            to: "/",
            component: AuthLogoutPage.name,
            message: "Navigating to homepage after logging out.",
        });
    };

    const {mutate: logout} = useAuthLogoutUser({onSubmitSuccess: onLogout});

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <PageLoader/>
    );
}
