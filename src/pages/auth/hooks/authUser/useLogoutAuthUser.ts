import {useContext} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";

/**
 * React hook that provides a function to log out the authenticated user.
 *
 * When invoked, the returned function:
 * - Removes the persisted `authUser` from `localStorage`.
 * - Removes the `redirectPath` from `sessionStorage`.
 * - Updates the {@link AuthContext} by:
 *   - Setting the current user to `null`.
 *   - Marking the user as logged out (`setLogout(true)`).
 *
 * This hook does not perform any API calls. It only clears client-side
 * authentication state and storage.
 *
 * @returns A function that logs out the user when called.
 *
 * @example
 * ```tsx
 * const logoutUser = useLogoutAuthUser();
 *
 * // Trigger logout
 * logoutUser();
 * ```
 */
export default function useLogoutAuthUser() {
    const authContext = useContext(AuthContext);

    return () => {
        localStorage.removeItem("authUser");
        sessionStorage.removeItem("redirectPath");

        if (authContext) {
            authContext.setUser(null);
            authContext.setLogout(true);
        }
    }
}
