import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {toast} from "react-toastify";
import {useEffect} from "react";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";
import {useLocation} from "react-router-dom";
import setRedirectPath from "@/common/utility/router/setRedirectPath.ts";

export default function useHttpResponseErrorHandler(error: unknown) {
    const location = useLocation();
    const navigate = useLoggedNavigate();

    if (!(error instanceof HttpResponseError)) return;

    useEffect(() => {
        const {response: {status}} = error;

        if (status === 401) {
            toast.error("Unauthorized!");

            const {pathname, search, hash} = location;
            const targetURL = new URL(`${pathname}${search}${hash}`);

            setRedirectPath(targetURL);

            navigate({
                to: "/auth/login",
                message: "Unauthorized!",
                component: useHttpResponseErrorHandler.name,
            });
        }
    }, []);
}