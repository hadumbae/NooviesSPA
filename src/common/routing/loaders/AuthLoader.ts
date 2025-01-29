import Cookies from "js-cookie";
import {LoaderFunction, redirect} from "react-router-dom";
import {toast} from "react-toastify";
import RouterService from "@/common/services/RouterService.ts";

const AuthLoader: LoaderFunction = ({request}) => {
    const url = new URL(request.url);
    const hasAuth = Cookies.get("hasAuthToken");

    if (!hasAuth) {
        RouterService.setRedirectPath(url);
        return redirect("/error/unauthorized");
    }

    const authDetails = localStorage.getItem("authUser");

    try {
        return JSON.parse(authDetails!);
    } catch (e) {
        console.error("Authentication Error: ", e);
        toast.error("Invalid authentication details. Please login.")

        localStorage.removeItem("authUser");
        Cookies.remove("hasAuthToken");

        return redirect("/error/unauthorized");
    }
}

export default AuthLoader;