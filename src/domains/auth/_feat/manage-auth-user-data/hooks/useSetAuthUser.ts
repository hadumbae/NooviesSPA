/**
 * @fileoverview Hook for persisting and synchronizing authenticated user data.
 */

import {AuthContext} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";
import {User} from "@/domains/users/schemas/user/User.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

/**
 * Returns a function to update the authenticated user in local storage and AuthContext.
 */
export function useSetAuthUser() {
    const authContext = useRequiredContext({context: AuthContext});

    return (authUser: User) => {
        localStorage.setItem("authUser", JSON.stringify(authUser));

        if (authContext) {
            authContext.setUser(authUser);
            authContext.setLogout(false);
        }
    };
}
