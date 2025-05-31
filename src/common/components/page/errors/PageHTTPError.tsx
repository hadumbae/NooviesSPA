import {FC} from 'react';
import {ParseError} from "@/common/errors/ParseError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {TriangleAlert} from "lucide-react";

/**
 * Props for the `PageHTTPError` component.
 *
 * These props allow customization of the error display, or passing in a specific `HttpResponseError`
 * to render context-aware messaging based on HTTP status codes.
 */
interface ErrorProps {
    /**
     * Optional override for the default main error header.
     */
    header?: string;

    /**
     * Optional override for the default subtitle or error message.
     */
    message?: string;

    /**
     * The error object to display. If this is not an instance of `HttpResponseError`,
     * the component will fall back to rendering a generic `PageError`.
     */
    error?: Error | ParseError | HttpResponseError | null;
}

/**
 * `PageHTTPError` is a React component that displays detailed, user-friendly messages
 * for `HttpResponseError` instances. It maps specific HTTP status codes (e.g. 404, 500)
 * to corresponding titles and descriptions, and falls back to a general error layout if the
 * error type is unrecognized.
 *
 * If the error is not an instance of `HttpResponseError`, it renders a more generic `PageError`.
 *
 * This component is intended for use in full-page network error states.
 *
 * @param params - Object containing optional `header`, `message`, and an `error`.
 * @returns A React element rendering the error page.
 */
const PageHTTPError: FC<ErrorProps> = (params) => {
    const {error, message, header} = params;

    if (!error || !(error instanceof HttpResponseError)) return <PageError {...params} />
    const {response: {status}, message: errorMessage} = error;

    const statusText: Record<number, { text: string, subtitle: string }> = {
        400: {text: "Bad Request", subtitle: "The server could not understand your request. Please check your input."},
        401: {text: "Unauthorized", subtitle: "You must be logged in to access this resource."},
        403: {text: "Forbidden", subtitle: "You don't have permission to access this page."},
        404: {text: "Not Found", subtitle: "We couldn’t find what you were looking for."},
        405: {text: "Method Not Allowed", subtitle: "The action you tried is not allowed on this page."},
        408: {text: "Request Timeout", subtitle: "The request took too long. Please try again."},
        409: {text: "Conflict", subtitle: "There was a conflict with your request. Please refresh or try again."},
        429: {text: "Too Many Requests", subtitle: "You’ve made too many requests. Please wait and try again later."},
        500: {text: "Server Error", subtitle: "Something went wrong on our end. We're working on it."},
        502: {text: "Bad Gateway", subtitle: "The server received an invalid response. Please try again later."},
        503: {text: "Service Unavailable", subtitle: "The server is temporarily unavailable. Please try again later."},
        504: {text: "Gateway Timeout", subtitle: "The server took too long to respond. Please try again later."},
    };

    const statusInfo = statusText[status];
    const mainText = header || statusInfo.text || "A Network Error Occurred";
    const subText = message || errorMessage || statusInfo.subtitle || `HTTP Code : ${status}`;

    return (
        <PageCenter className="space-y-6">
            <TriangleAlert className="text-neutral-500" size={100} />

            <section className="flex flex-col justify-center items-center space-y-2">
                <h1 className="dotgothic16-regular text-3xl">{mainText}</h1>
                <h2 className="text-neutral-500">{subText}</h2>
            </section>
        </PageCenter>
    );
};

export default PageHTTPError;
