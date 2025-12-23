/**
 * Authentication context provider.
 *
 * Manages authenticated user state, logout signaling, and periodic
 * validation of persisted authentication data.
 *
 * Responsibilities:
 * - Hydrates the authenticated user on initial load
 * - Validates persisted user data against runtime schemas
 * - Invalidates auth state when persistence disappears
 *
 * @remarks
 * - Uses `hasAuthToken` cookie as a lightweight auth presence indicator
 * - Persists user data in `localStorage` under `authUser`
 * - Performs periodic auth consistency checks every 30 seconds
 */
import {ReactNode, useEffect, useState} from "react";
import {AuthContext, AuthUserContextValue} from "@/pages/auth/context/AuthContext.ts";
import Cookies from "js-cookie";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import {UserSchema} from "@/pages/users/schemas/user/User.schema.ts";
import isAdminUser from "@/pages/auth/utility/isAdminUser.ts";

/**
 * Props for {@link AuthProvider}.
 */
type ProviderProps = {
    /**
     * Descendant components requiring authentication context.
     */
    children: ReactNode;
};

/**
 * Authentication context provider component.
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
     * Authenticated user state.
     *
     * @remarks
     * - Hydrated from persisted storage on initial load
     * - Returns `null` if auth persistence is missing or invalid
     * - Validated using {@link UserSchema}
     */
    const [user, setUser] = useState<User | null>(() => {
        const hasToken = Cookies.get("hasAuthToken");
        const authUser = localStorage.getItem("authUser");

        if (!hasToken || !authUser) {
            return null;
        }

        try {
            return UserSchema.parse(JSON.parse(authUser));
        } catch {
            return null;
        }
    });

    // --- AUTH CONSISTENCY CHECK ---

    /**
     * Periodically validates authentication persistence.
     *
     * @remarks
     * - Runs every 30 seconds
     * - Clears in-memory auth state if persistence disappears
     * - Prevents stale authenticated sessions
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

    // --- DERIVED STATE ---

    /**
     * Indicates whether the authenticated user has admin privileges.
     */
    const isAdmin = isAdminUser(user);

    /**
     * Context value exposed to consumers.
     */
    const contextValue: AuthUserContextValue = {
        user,
        setUser,
        logout,
        setLogout,
        isAdmin,
    };

    // --- RENDER ---

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
