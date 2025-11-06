import Cookies from "js-cookie";
import {LoaderFunction, redirect} from "react-router-dom";
import {toast} from "react-toastify";
import setRedirectPath from "@/common/utility/router/setRedirectPath.ts";

/**
 * A React Router loader function that verifies user authentication before allowing route access.
 *
 * This loader checks for a valid authentication token in cookies (`hasAuthToken`) and
 * user details in local storage (`authUser`). If authentication fails, it redirects
 * the user to the unauthorized error page and stores the current path for future redirection.
 *
 * @param request - The request object provided by React Router during route loading.
 * @returns A `redirect` response to `/error/unauthorized` if authentication fails,
 * or the parsed authentication details if successful.
 *
 * @remarks
 * - If no auth token is found, the current URL is stored using {@link setRedirectPath}
 *   to allow redirecting back after successful login.
 * - If the stored `authUser` value is invalid JSON, it clears authentication data and redirects.
 * - Displays a toast error message when invalid authentication details are detected.
 *
 * @example
 * ```ts
 * // In your route configuration
 * {
 *   path: "/dashboard",
 *   loader: AuthLoader,
 *   element: <Dashboard />,
 * }
 * ```
 */
const AuthLoader: LoaderFunction = ({ request }) => {
    const url = new URL(request.url);
    const hasAuth = Cookies.get("hasAuthToken");

    if (!hasAuth) {
        setRedirectPath(url);
        return redirect("/error/unauthorized");
    }

    const authDetails = localStorage.getItem("authUser");

    try {
        return JSON.parse(authDetails!);
    } catch (e) {
        console.error("Authentication Error: ", e);
        toast.error("Invalid authentication details. Please login.");

        localStorage.removeItem("authUser");
        Cookies.remove("hasAuthToken");

        return redirect("/error/unauthorized");
    }
};

export default AuthLoader;
