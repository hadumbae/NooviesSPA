import {useContext} from "react";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import {AuthUserDetails, AuthUserDetailsSchema} from "@/pages/auth/schema/AuthUserDetailsSchema.ts";

export default function useFetchAuthUserDetails(): AuthUserDetails {
    const navigate = useNavigate();
    const authUserDetails = useContext(AuthContext)

    const parsedResult = AuthUserDetailsSchema.safeParse(authUserDetails);

    if (!parsedResult.success || !parsedResult.data) {
        toast.error("You must be logged in!");

        localStorage.removeItem("authUser");
        Cookies.remove("hasAuthToken");

        navigate("/auth/login");
    }

    return parsedResult.data!;
}