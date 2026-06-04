/**
 * @fileoverview Page component that handles the user logout process.
 */

import {ReactElement, useEffect} from 'react';
import {useAuthLogoutSubmitMutation} from "@/domains/auth/_feat/auth-logout/useAuthLogoutSubmitMutation.ts";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";
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

    const {mutate: logout} = useAuthLogoutSubmitMutation({onSubmitSuccess: onLogout});

    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <PageLoader/>
    );
}
