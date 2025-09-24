import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import RouterService from "@/common/services/RouterService.ts";
import {toast} from "react-toastify";
import {useEffect} from "react";
import useLoggedNavigate from "@/common/hooks/useLoggedNavigate.ts";

/**
 * TODO
 * Shouldn't draw URL form response error!
 * Shouldn't redirect to URL here!
 */

export default function useHttpResponseErrorHandler(error: unknown) {
    const navigate = useLoggedNavigate();
    if (!(error instanceof HttpResponseError)) return;

    useEffect(() => {
        const {response: {url, status}} = error;

        if (status === 401) {
            toast.error("Unauthorized!");

            const targetURL = new URL(url);
            RouterService.setRedirectPath(targetURL);

            navigate({
                to: "/auth/login",
                message: "Unauthorized!",
                component: useHttpResponseErrorHandler.name,
            });
        }
    }, []);
}