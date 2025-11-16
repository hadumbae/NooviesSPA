import {createContext, Dispatch, SetStateAction} from "react";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";

/**
 * **AuthUserContextValue**
 *
 * Represents the value stored in `AuthContext`.
 *
 * @property user - The currently authenticated user details.
 *   `null` if no user is authenticated.
 * @property setUser - React state setter for updating the authenticated user.
 * @property logout - Flag indicating whether the user is logged out.
 * @property setLogout - React state setter to update the logout flag.
 */
export type AuthUserContextValue = {
    user: AuthUserDetails | null;
    setUser: Dispatch<SetStateAction<AuthUserDetails | null>>;
    logout: boolean;
    setLogout: Dispatch<SetStateAction<boolean>>;
}

/**
 * **AuthContext**
 *
 * React context providing authentication state and actions.
 *
 * Used to share:
 * - The currently authenticated user
 * - A setter to update the user
 * - Logout status
 * - A setter to update logout status
 *
 * Consumers should handle the case where the context is `undefined`.
 *
 * @example
 * ```ts
 * const auth = useContext(AuthContext);
 * if (!auth) throw new Error("AuthContext must be used within a provider");
 *
 * // Access user
 * console.log(auth.user);
 *
 * // Log out
 * auth.setLogout(true);
 * ```
 */
export const AuthContext = createContext<AuthUserContextValue | undefined>(undefined);
