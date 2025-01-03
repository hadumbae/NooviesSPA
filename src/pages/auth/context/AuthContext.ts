import { createContext } from "react";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";

export const AuthContext = createContext<AuthUserDetails | undefined>(undefined);