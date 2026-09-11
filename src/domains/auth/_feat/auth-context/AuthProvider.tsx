/**
 * @fileoverview Authentication context provider that manages user state and periodic validation of persisted credentials.
 */

import Cookies from "js-cookie";
import {ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import {User, UserSchema} from "@/domains/users/_schema/user/UserSchema";
import {getAuthExpireBy, setAuthExpireBy} from "@/domains/auth/_feat/storage";
import {AuthContext, AuthUserContextValue} from "@/domains/auth/_feat/auth-context/AuthContext.ts";
import {useAuthRefreshToken} from "@/domains/auth";
import {toast} from "react-toastify";
import {DateTime} from "luxon";

/** Props for the AuthProvider component. */
type ProviderProps = {
    children: ReactNode;
};

/** Component that manages and distributes authentication state via React Context. */
export function AuthProvider(
    {children}: ProviderProps
): ReactElement {
    // --- STATE ---

    const isRefreshingToken = useRef<boolean>(false);
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

    const {mutateAsync: refreshToken} = useAuthRefreshToken();

    // --- HOOKS ---

    useEffect(() => {
        const handleRefresh = async () => {
            try {
                const user = await refreshToken();

                const refreshByDate = Cookies.get("refreshBy");
                const refreshDate = refreshByDate ? DateTime.fromISO(refreshByDate) : DateTime.now();

                setAuthExpireBy(refreshDate);
                setUser(user);
                setLogout(false);
            } catch (error: unknown) {
                toast.error("An error occurred with authentication.");
                setUser(null);
                setLogout(true);
            } finally {
                isRefreshingToken.current = false;
            }
        }

        const interval = setInterval(() => {
            const expireBy = getAuthExpireBy();
            const now = new Date();

            if (now.getTime() > expireBy.toJSDate().getTime() && !isRefreshingToken.current) {
                isRefreshingToken.current = true;
                handleRefresh();
            }
        }, 1000 * 30);

        return () => clearInterval(interval);
    }, [user]);

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
