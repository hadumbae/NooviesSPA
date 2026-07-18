/**
 * @fileoverview A component that dispatches specific error display components based on the type of query error encountered.
 */

import {ReactElement} from "react";
import {NetworkError} from "@/common/_err/NetworkError.ts";
import HttpResponseError from "@/common/_err/HttpResponseError.ts";
import {ErrorHandlerProps} from "@/common/_types/error/ErrorHandlerProps.ts";
import {HttpStatusOverrideText} from "@/common/_types/error/HttpErrorTypes.ts";
import {AppErrorDisplay} from "@/views/common/_feat/error-boundary/app-error-boundary";
import {
    HttpResponseErrorDisplay,
    NetworkErrorDisplay
} from "@/views/common/_feat/error-boundary/query-error-fallback/display";

/** Props for the QueryErrorHandler component. */
type HandlerProps = ErrorHandlerProps & {
    statusTextOverride?: HttpStatusOverrideText;
};

/** Renders the appropriate error UI by evaluating if the error is a network, HTTP, or generic application error. */
export function QueryErrorHandler(
    {error, className, statusTextOverride}: HandlerProps
): ReactElement {
    if (error instanceof NetworkError) {
        return (
            <NetworkErrorDisplay
                error={error}
                className={className}
            />
        );
    }

    if (error instanceof HttpResponseError) {
        return (
            <HttpResponseErrorDisplay
                statusTextOverride={statusTextOverride}
                error={error}
                className={className}
            />
        );
    }

    return (
        <AppErrorDisplay
            error={error}
            className={className}
        />
    );
}
