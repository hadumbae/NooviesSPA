import {FC, PropsWithChildren, useEffect, useState} from 'react';
import {AuthContext, AuthUserContextValue} from "@/pages/auth/context/AuthContext.ts";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import Cookies from "js-cookie";

/**
 * **AuthProvider**
 *
 * React context provider that manages authentication state for the application.
 * It wraps child components and supplies the `AuthContext` containing:
 * - The current authenticated user
 * - Setters for updating user and logout state
 * - Logout flag
 *
 * ### Behavior
 * 1. Initializes `user` and `logout` state via `useState`, attempting to load
 *    user details from localStorage and validate them using `AuthUserDetailsSchema`.
 * 2. Periodically checks every 30 seconds whether the auth token or user details
 *    are missing/invalid; if so, sets `user` to `null` and `logout` to `true`.
 * 3. Provides context value to children components via `AuthContext.Provider`.
 *
 * ### Notes
 * - The interval-based check ensures that user state stays consistent if cookies
 *   or localStorage are removed externally.
 * - This component should wrap the root of your application (or at least the
 *   part of the app that requires authentication context).
 * - `console.log` currently logs the context value for debugging purposes.
 *
 * @param children - React children to be wrapped by this provider
 * @returns {JSX.Element} `AuthContext.Provider` wrapping its children
 */
const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    // ⚡ State ⚡

    const [logout, setLogout] = useState<boolean>(false);
    const [user, setUser] = useState<AuthUserDetails | null>(() => {
        const hasToken = Cookies.get("hasAuthToken");
        const authUser = localStorage.getItem("authUser");

        if (!hasToken || !authUser) {
            return null;
        }

        try {
            const userDetails = JSON.parse(authUser);
            return AuthUserDetailsSchema.parse(userDetails);
        } catch (error) {
            return null;
        }
    });

    // ⚡ Periodic Auth Check ⚡

    useEffect(() => {
        const interval = setInterval(() => {
            const hasToken = Cookies.get("hasAuthToken");
            const authUser = localStorage.getItem("authUser");

            if ((user !== null) && (!hasToken || !authUser)) {
                setUser(null);
                setLogout(true);
            }
        }, 1000 * 30); // every 30 seconds

        return () => clearInterval(interval);
    }, [user]);

    // ⚡ Context Value ⚡

    const contextValue: AuthUserContextValue = {
        user,
        setUser,
        logout,
        setLogout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
