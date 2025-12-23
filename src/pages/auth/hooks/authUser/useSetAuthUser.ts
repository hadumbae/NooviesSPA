/**
 * Authentication user setter hook.
 *
 * Persists the authenticated user and synchronizes global auth state.
 */
import {useContext} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import {User} from "@/pages/users/schemas/user/User.types.ts";

/**
 * Provides a function for setting the authenticated user.
 *
 * @remarks
 * - Persists the user in `localStorage` under `authUser`
 * - Resets the logout signal on successful set
 * - No-op for context updates if used outside {@link AuthProvider}
 *
 * @returns Function that accepts a {@link User} and updates auth state
 *
 * @example
 * ```ts
 * const setAuthUser = useSetAuthUser();
 * setAuthUser(user);
 * ```
 */
export default function useSetAuthUser() {
    const authContext = useContext(AuthContext);

    return (authUser: User) => {
        localStorage.setItem("authUser", JSON.stringify(authUser));

        if (authContext) {
            authContext.setUser(authUser);
            authContext.setLogout(false);
        }
    };
}
