import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import {toast} from "react-toastify";
import {AuthUserDetails} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

export default function useFetchAuthUserDetails(): AuthUserDetails | null {
    const navigate = useLoggedNavigate();
    const authContext = useContext(AuthContext)

    const [authDetails, setAuthDetails] = useState<AuthUserDetails | null>(null);

    useEffect(() => {
        if (!authContext || authContext.logout) return;

        if (authContext.user) {
            setAuthDetails(authContext.user);
        } else {
            toast.error("You must be logged in!");
            navigate({
                to: "/auth/login",
                component: useFetchAuthUserDetails.name,
                options: {state: {showLoginError: true}},
            });
        }
    }, [authContext, navigate]);

    return authDetails;
}