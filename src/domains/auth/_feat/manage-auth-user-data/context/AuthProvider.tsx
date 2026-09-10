/**
 * @fileoverview Authentication context provider that manages user state and periodic validation of persisted credentials.
 */

import Cookies from "js-cookie";
import {ReactElement, ReactNode, useEffect, useState} from "react";
import {User, UserSchema} from "@/domains/users/_schema/user/UserSchema";
import {getAuthExpireBy} from "@/domains/auth/_feat/manage-auth-user-data/storage";
import {AuthContext, AuthUserContextValue} from "@/domains/auth/_feat/manage-auth-user-data/context/AuthContext.ts";

/** Props for the AuthProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Component that manages and distributes authentication state via React Context. */
export function AuthProvider(
    {children}: ProviderProps
): ReactElement {
    // --- STATE ---

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


    // --- HOOKS ---

    useEffect(() => {
        const interval = setInterval(() => {
            const hasToken = Cookies.get("hasAuthToken");
            const authUser = localStorage.getItem("authUser");

            const expireBy = getAuthExpireBy();
            const now = new Date();

            console.log("Expire At : ", expireBy.toISO());
            console.log("Refresh Expiry? : ", now.getTime() > expireBy.toJSDate().getTime());

            if (user !== null && (!hasToken || !authUser)) {
                setUser(null);
                setLogout(true);
            }
        }, 1000 * 30);

        return () => clearInterval(interval);
    }, [user]);

    const contextValue: AuthUserContextValue = {
        isAdmin: user?.roles.includes("ADMIN") ?? false,
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
}
