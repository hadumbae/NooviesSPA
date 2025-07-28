import {FC} from 'react';
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageError from "@/common/components/page/errors/PageError.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {TriangleAlert} from "lucide-react";

/**
 * Props for the {@link PageHTTPError} component.
 */
type PageHTTPErrorProps = {
    /**
     * Optional header text displayed as the main error title.
     * Defaults to a status-specific message (e.g., `"Not Found"` for `404`).
     */
    header?: string;

    /**
     * Optional message displayed below the header.
     * Defaults to either:
     * - A status-specific explanation, or
     * - The error's `message` property, or
     * - `"HTTP Code: <status>"` if no other message is available.
     */
    message?: string;

    /**
     * The HTTP error instance containing the HTTP response status and message.
     * If the provided error is not an {@link HttpResponseError}, the component
     * will fall back to rendering {@link PageError}.
     */
    error: HttpResponseError;
};

/**
 * A page-level error component that displays an HTTP response error.
 *
 * This component:
 * - Falls back to {@link PageError} if the provided error is not an {@link HttpResponseError}.
 * - Maps HTTP status codes (400–504) to descriptive titles and subtitles.
 * - Defaults to `"A Network Error Occurred"` if no mapping is available.
 * - Displays a centered layout with an icon, header, and descriptive message.
 *
 * @param params - See {@link PageHTTPErrorProps}.
 *
 * @returns A centered error page with an HTTP status-specific header and message.
 *
 * @example
 * ```tsx
 * try {
 *   await fetchData();
 * } catch (err) {
 *   if (err instanceof HttpResponseError) {
 *     return <PageHTTPError error={err} />;
 *   }
 * }
 * ```
 */
const PageHTTPError: FC<PageHTTPErrorProps> = (params) => {
    const {error, message, header} = params;

    if (!error || !(error instanceof HttpResponseError)) {
        return <PageError {...params} />;
    }

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
