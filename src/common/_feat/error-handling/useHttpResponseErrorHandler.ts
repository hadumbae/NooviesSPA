/**
 * @fileoverview Hook for handling HTTP response errors and managing unauthorised redirection.
 */

import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {useLoggedNavigate} from "@/common/_feat/navigation/useLoggedNavigate.ts";
import {useLocation} from "react-router-dom";
import setRedirectPath from "@/common/utility/router/setRedirectPath.ts";

/** Hook that monitors for HttpResponseErrors and redirects to login on 401 status. */
export function useHttpResponseErrorHandler(error: unknown) {
    const navigate = useLoggedNavigate();

    const {pathname, search, hash} = useLocation();
    const targetURL = new URL(`${pathname}${search}${hash}`);

    if (!(error instanceof HttpResponseError)) return;

    useEffect(() => {
        const {status} = error;

        if (status === 401) {
            toast.error("Unauthorized!");
            setRedirectPath(targetURL);

            navigate({
                to: "/auth/login",
                message: "Unauthorized!",
                component: useHttpResponseErrorHandler.name,
            });
        }
    }, [error, targetURL]);
}