import { createContext } from "react";

export const AuthContext = createContext({
    user: null,
    name: null,
    email: null,
    isAdmin: null,
});