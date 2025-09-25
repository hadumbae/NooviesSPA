import {useContext} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";

/**
 * Custom React hook for updating the authenticated user state.
 *
 * This hook provides a function to:
 * 1. Store the authenticated user in `localStorage`.
 * 2. Update the global authentication context.
 * 3. Optionally handle redirect paths stored in `sessionStorage`.
 *
 * @returns A function that accepts an `authUser` object and updates both localStorage and the AuthContext.
 *
 * @example
 * ```ts
 * const setAuthUser = useSetAuthUser();
 * setAuthUser({ authUser: currentUser });
 * ```
 */
export default function useSetAuthUser() {
    const authContext = useContext(AuthContext);

    /**
     * Updates the authenticated user.
     *
     * @param params.authUser - The authenticated user details to store and set in context.
     */
    return ({authUser}: {authUser: AuthUserDetails}) => {
        // Save authenticated user in localStorage
        localStorage.setItem("authUser", JSON.stringify(authUser));

        // Update the global AuthContext if available
        if (authContext) {
            authContext.setUser(authUser);
            authContext.setLogout(false);
        }
    }
}
