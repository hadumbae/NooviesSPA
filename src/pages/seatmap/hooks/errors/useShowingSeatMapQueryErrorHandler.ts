import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {useEffect} from "react";
import useLoggedNavigate from "@/common/hooks/logging/useLoggedNavigate.ts";

export default function useShowingSeatMapQueryErrorHandler(error?: Error | null) {
    const navigate = useLoggedNavigate();

    useEffect(() => {
        if (!(error instanceof HttpResponseError)) return;

        const {message, response: {status}} = error;

        console.error("HTTP RESPONSE ERROR: ", status, message);

        if (status === 404) {
            navigate({
                level: "error",
                to: "/admin/showings",
                component: useShowingSeatMapQueryErrorHandler.name,
                message: "Navigation due to 404 HTTP error.",
            });
        }
    }, [error]);
}