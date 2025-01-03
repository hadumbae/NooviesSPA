import {FC, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import Cookies from "js-cookie";

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const details = useContext(AuthContext)
    const [authUserDetails, setAuthUserDetails] = useState<AuthUserDetails | undefined>();

    useEffect(() => {
        const hasToken = Cookies.get("hasAuthToken");

        if (hasToken) {
            const item = localStorage.getItem("authUser");
            setAuthUserDetails(item ? JSON.parse(item) : details);
        } else {
            localStorage.removeItem("authUser");
            setAuthUserDetails(undefined);
        }
    }, []);

    return (
        <AuthContext.Provider value={authUserDetails}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
