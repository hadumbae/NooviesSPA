/**
 * @fileoverview Hook for managing the client-side logout process and clearing authentication state.
 */

import {AuthContext} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";

/**
 * Returns a function to clear local storage and update the AuthContext for logout.
 */
export function useLogoutAuthUser() {
    const authContext = useRequiredContext({context: AuthContext});

    return () => {
        localStorage.removeItem("authUser");
        sessionStorage.removeItem("redirectPath");

        if (authContext) {
            authContext.setUser(null);
            authContext.setLogout(true);
        }
    }
}
