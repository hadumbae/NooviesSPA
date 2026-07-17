/**
 * @fileoverview Loader function for handling route-level authentication and user data retrieval.
 */

import Cookies from "js-cookie";
import {LoaderFunctionArgs, redirect} from "react-router-dom";
import {toast} from "react-toastify";
import {setRedirectPath} from "@/common/_feat/navigation";

/** Validates authentication tokens and returns the parsed user object from local storage. */
export function AuthLoader<TCtx = any>({request}: LoaderFunctionArgs<TCtx>) {
    const url = new URL(request.url);
    const hasAuth = Cookies.get("hasAuthToken");

    if (!hasAuth) {
        setRedirectPath(url);
        return redirect("/error/unauthorized");
    }

    const authDetails = localStorage.getItem("authUser");

    try {
        return JSON.parse(authDetails!);
    } catch (error: unknown) {
        console.error("Authentication Error: ", error);
        toast.error("Invalid authentication details. Please login.");

        localStorage.removeItem("authUser");
        Cookies.remove("hasAuthToken");

        return redirect("/error/unauthorized");
    }
}
