import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function useShowingSeatMapQueryErrorHandler(error?: Error | null) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!(error instanceof HttpResponseError)) return;

        const {message, response: {status}} = error;

        console.error("HTTP RESPONSE ERROR: ", status, message);

        if (status === 404) {
            navigate("/admin/showings");
        }
    }, [error]);
}