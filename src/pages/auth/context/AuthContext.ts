import {createContext, Dispatch, SetStateAction} from "react";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";

export interface IAuthContext {
    user: AuthUserDetails | null;
    setUser: Dispatch<SetStateAction<AuthUserDetails | null>>;
    logout: boolean;
    setLogout: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext | null>(null);