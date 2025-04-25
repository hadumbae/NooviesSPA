import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";

export default function useFetchAuthUserDetails(): AuthUserDetails {
    const navigate = useNavigate();
    const authUserDetails = useContext(AuthContext)

    const [parsedData, setParsedData] = useState<AuthUserDetails | null>(null);


    useEffect(() => {
        if (authUserDetails === undefined) return;
        const parsedResult = AuthUserDetailsSchema.safeParse(authUserDetails);

        console.log("Auth User Details: ", authUserDetails);
        console.log("Parsed Success: ", parsedResult.success);

        if (parsedResult.success) {
            setParsedData(parsedResult.data);
        } else {
            console.log("Here?")
            toast.error("You must be logged in!");
            navigate("/auth/login", {state: {showLoginError: true}});
        }
    }, [authUserDetails, navigate]);


    return parsedData!;
}