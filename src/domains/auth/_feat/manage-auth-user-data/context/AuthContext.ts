/**
 * @fileoverview Authentication context types and instance for managing shared user state.
 */

import {createContext, Dispatch, SetStateAction} from "react";


import {User} from "@/domains/users/schema/user/UserSchema";

/**
 * Value exposed by the AuthContext.
 *
 */
export type AuthUserContextValue = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    logout: boolean;
    setLogout: Dispatch<SetStateAction<boolean>>;
    isAdmin: boolean;
};

/**
 * React context for authentication state.
 * Must be consumed within an AuthProvider.
 */
export const AuthContext = createContext<AuthUserContextValue | undefined>(undefined);
