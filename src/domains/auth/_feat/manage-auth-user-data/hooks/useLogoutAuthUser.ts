/**
 * @fileoverview Hook for managing the client-side logout process and clearing authentication state.
 */

import {useAuthContext} from "@/domains/auth/_feat/manage-auth-user-data/hooks/useAuthContext.ts";

/**
 * Returns a function to clear local storage and update the AuthContext for logout.
 */
export function useLogoutAuthUser() {
    const authContext = useAuthContext();

    return () => {
        localStorage.removeItem("authUser");
        sessionStorage.removeItem("redirectPath");

        if (authContext) {
            authContext.setUser(null);
            authContext.setLogout(true);
        }
    }
}
