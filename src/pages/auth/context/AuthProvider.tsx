import {FC, PropsWithChildren, useEffect, useState} from 'react';
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import Cookies from "js-cookie";

/**
 * `AuthProvider` is a React context provider component that manages the authentication state of the application.
 * It reads the user's authentication status from cookies and `localStorage`, validates the user data,
 * and provides the authenticated user information to the component tree via the `AuthContext`.
 *
 * This provider ensures that the authentication state is available to all child components that consume the
 * `AuthContext`, enabling them to access the current user's details and authentication status.
 *
 * @remarks
 * - The `AuthProvider` uses the `useEffect` hook to read from `localStorage` and validate the user data
 *   when the component mounts.
 * - The `AuthUserDetailsSchema` is used to validate the user data parsed from `localStorage`.
 * - If the user is not authenticated or the user data is invalid, the `user` state will be set to `null`.
 * - This provider should be placed at a high level in the component tree to ensure that the authentication
 *   state is accessible throughout the application.
 */
const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [user, setUser] = useState<AuthUserDetails | null>(null);
    const [logout, setLogout] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        const hasToken = Cookies.get("hasAuthToken");
        const authUser = localStorage.getItem("authUser");

        if (!hasToken || !authUser) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const userDetails = JSON.parse(authUser);
            const validatedUser = AuthUserDetailsSchema.parse(userDetails);
            setUser(validatedUser);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const contextValue = isLoading ? null : {user, setUser, logout, setLogout};

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
