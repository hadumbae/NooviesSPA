/**
 * @fileoverview Authentication context provider that manages user state and periodic validation of persisted credentials.
 */

import {ReactElement, ReactNode, useEffect, useState} from "react";
import {AuthContext, AuthUserContextValue} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";
import Cookies from "js-cookie";
import {User} from "@/domains/users/schemas/user/User.types.ts";
import {UserSchema} from "@/domains/users/schemas/user/User.schema.ts";
import {isAdminUser} from "@/domains/auth/_feat/manage-auth-user-data/utils";

/** Props for the AuthProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Component that manages and distributes authentication state via React Context. */
export function AuthProvider(
    {children}: ProviderProps
): ReactElement {

    const [logout, setLogout] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(() => {
        const hasToken = Cookies.get("hasAuthToken");
        const authUser = localStorage.getItem("authUser");
        if (!hasToken || !authUser) return null;

        try {
            return UserSchema.parse(JSON.parse(authUser));
        } catch {
            return null;
        }
    });

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


    const isAdmin = isAdminUser(user);
    const contextValue: AuthUserContextValue = {
        user,
        setUser,
        logout,
        setLogout,
        isAdmin,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
