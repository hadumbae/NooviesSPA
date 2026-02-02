import {FC} from 'react';
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {TriangleAlert} from "lucide-react";
import PageError from "@/common/components/page/errors/PageError.tsx";

/**
 * Props for {@link PageHTTPError}.
 */
type PageHTTPErrorProps = {
    /**
     * Optional custom header to display above the error message.
     * Defaults to a value based on the HTTP status code, if available.
     */
    header?: string;

    /**
     * Optional custom message to display under the header.
     * Defaults to the error's message or a status-specific description.
     */
    message?: string;

    /**
     * The error that triggered this page.
     * Ideally, this should be an instance of {@link HttpResponseError},
     * but other `Error` types (or `null`) are allowed for flexibility.
     *
     * If the error is not an `HttpResponseError`, the component falls back
     * to rendering {@link PageError}.
     */
    error?: HttpResponseError | Error | null;
};

/**
 * A page-level component that displays an HTTP error message based on
 * the provided {@link HttpResponseError}.
 *
 * - If the `error` prop is an `HttpResponseError`, it displays a
 *   user-friendly message based on the HTTP status code.
 * - If the error is another type or `null`, it falls back to {@link PageError}.
 * - Status-specific titles and subtitles are included for common HTTP codes.
 *
 * @example
 * ```tsx
 * <PageHTTPError error={new HttpResponseError(response)} />
 *
 * <PageHTTPError
 *   header="Custom Error"
 *   message="Something unexpected happened."
 *   error={null}
 * />
 * ```
 */
const PageHTTPError: FC<PageHTTPErrorProps> = (params) => {
    const {error, message, header} = params;

    if (!error || !(error instanceof HttpResponseError)) {
        return <PageError {...params} />
    }

    const {status, message: errorMessage} = error;

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
