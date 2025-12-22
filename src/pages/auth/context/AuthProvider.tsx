/**
 * Authentication context provider.
 *
 * Manages the authenticated user state, logout signaling, and periodic
 * validation of auth persistence via cookies and localStorage.
 *
 * Responsibilities:
 * - Hydrate the authenticated user on initial load
 * - Validate persisted auth state against runtime schemas
 * - Automatically invalidate auth state when tokens disappear
 *
 * @remarks
 * - Relies on `hasAuthToken` cookie as a lightweight auth presence check
 * - Persists user data in `localStorage` under `authUser`
 * - Performs periodic auth consistency checks every 30 seconds
 */
import {ReactNode, useEffect, useState} from 'react';
import {AuthContext, AuthUserContextValue} from "@/pages/auth/context/AuthContext.ts";
import Cookies from "js-cookie";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import {UserSchema} from "@/pages/users/schemas/user/User.schema.ts";

/**
 * Props for {@link AuthProvider}.
 */
type ProviderProps = {
    /**
     * Child components that require access to authentication context.
     */
    children: ReactNode;
};

/**
 * Provides authentication state and actions to descendant components.
 *
 * @component
 * @param props - {@link ProviderProps}
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
const AuthProvider = ({children}: ProviderProps) => {
    // --- STATE ---

    /**
     * Indicates that a forced logout has occurred due to auth invalidation.
     */
    const [logout, setLogout] = useState<boolean>(false);

    /**
     * Currently authenticated user, hydrated from persisted storage.
     *
     * @remarks
     * - Returns `null` if no auth token or stored user exists
     * - Validates stored user data using {@link UserSchema}
     */
    const [user, setUser] = useState<User | null>(() => {
        const hasToken = Cookies.get("hasAuthToken");
        const authUser = localStorage.getItem("authUser");

        if (!hasToken || !authUser) {
            return null;
        }

        try {
            const userDetails = JSON.parse(authUser);
            return UserSchema.parse(userDetails);
        } catch {
            return null;
        }
    });

    // --- AUTH CHECK ---

    /**
     * Periodically validates authentication persistence.
     *
     * @remarks
     * - Runs every 30 seconds
     * - Logs the user out if persisted auth data disappears
     * - Prevents stale in-memory auth state
     */
    useEffect(() => {
        const interval = setInterval(() => {
            const hasToken = Cookies.get("hasAuthToken");
            const authUser = localStorage.getItem("authUser");

            if (user !== null && (!hasToken || !authUser)) {
                setUser(null);
                setLogout(true);
            }
        }, 1000 * 30);

        return () => clearInterval(interval);
    }, [user]);

    // --- CONTEXT VALUES ---

    /**
     * Context value exposed to consumers.
     */
    const contextValue: AuthUserContextValue = {
        user,
        setUser,
        logout,
        setLogout,
    };

    // --- RENDER ---

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
