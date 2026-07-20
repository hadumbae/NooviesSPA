/**
 * @fileoverview Defines the React context and types for managing authenticated user state.
 */

import {createContext, Dispatch, SetStateAction} from "react";


import {User} from "@/domains/users/_schema/user/UserSchema";

/** Context value containing user data, authentication status, and state setters. */
export type AuthUserContextValue = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    logout: boolean;
    setLogout: Dispatch<SetStateAction<boolean>>;
    isAdmin: boolean;
};

/** React context for accessing and updating the current authentication state. */
export const AuthContext = createContext<AuthUserContextValue | undefined>(undefined);

AuthContext.displayName = "AuthContext";