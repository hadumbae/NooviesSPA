import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

/**
 * Custom React hook to handle errors from showing-related queries.
 *
 * @param error - An Error object, potentially an instance of HttpResponseError.
 *
 * @remarks
 * This hook checks if the provided error is an instance of HttpResponseError.
 * If it is, it logs the error details to the console. Further action depends
 * on the status code of the response.
 *
 * @example
 * ```tsx
 * const { data, error } = useQuery(...);
 * useShowingQueryErrorHandler(error);
 * ```
 */
export default function useShowingQueryErrorHandler(error: Error | null) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!(error instanceof HttpResponseError)) return;

        const {message, response: {status}} = error;
        console.error("HTTP RESPONSE ERROR: ", status, message);

        if (status === 404) navigate("/admin/showings");
    }, [error]);
}