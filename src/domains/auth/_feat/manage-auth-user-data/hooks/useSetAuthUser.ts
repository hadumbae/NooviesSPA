/**
 * @fileoverview Hook for persisting and synchronizing authenticated user data.
 */

import {User} from "@/domains/users/_schema/user/UserSchema";
import {useAuthContext} from "@/domains/auth/_feat/manage-auth-user-data/hooks/useAuthContext.ts";


/**
 * Returns a function to update the authenticated user in local storage and AuthContext.
 */
export function useSetAuthUser() {
    const authContext = useAuthContext();

    return (authUser: User) => {
        localStorage.setItem("authUser", JSON.stringify(authUser));

        if (authContext) {
            authContext.setUser(authUser);
            authContext.setLogout(false);
        }
    };
}
