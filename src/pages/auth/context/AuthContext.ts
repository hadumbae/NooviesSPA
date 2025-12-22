/**
 * Authentication context types and instance.
 *
 * Defines the shared authentication state shape and the React context
 * used to expose it throughout the application.
 */
import {createContext, Dispatch, SetStateAction} from "react";
import {User} from "@/pages/users/schemas/user/User.types.ts";

/**
 * Value exposed by {@link AuthContext}.
 *
 * @remarks
 * - `user === null` indicates no authenticated session
 * - `logout` is a derived signal, not the source of truth
 */
export type AuthUserContextValue = {
    /**
     * Currently authenticated user.
     */
    user: User | null;

    /**
     * Updates the authenticated user state.
     */
    setUser: Dispatch<SetStateAction<User | null>>;

    /**
     * Indicates that a logout has occurred or is required.
     */
    logout: boolean;

    /**
     * Updates the logout flag.
     */
    setLogout: Dispatch<SetStateAction<boolean>>;
};

/**
 * React context for authentication state.
 *
 * @remarks
 * - Defaults to `undefined`
 * - Must be consumed within {@link AuthProvider}
 *
 * @example
 * ```ts
 * const auth = useContext(AuthContext);
 * if (!auth) {
 *   throw new Error("AuthContext must be used within AuthProvider");
 * }
 *
 * console.log(auth.user);
 * ```
 */
export const AuthContext =
    createContext<AuthUserContextValue | undefined>(undefined);
