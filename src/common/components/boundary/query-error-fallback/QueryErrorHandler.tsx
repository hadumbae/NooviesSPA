/**
 * @file QueryErrorHandler.tsx
 *
 * Central dispatcher for query-related errors.
 *
 * Routes known error types to specialized displays
 * and falls back to the generic app error display
 * for unexpected cases.
 */

import {NetworkError} from "@/common/errors/NetworkError.ts";
import NetworkErrorDisplay from "@/common/components/boundary/query-error-fallback/display/NetworkErrorDisplay.tsx";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import HttpResponseErrorDisplay
    from "@/common/components/boundary/query-error-fallback/display/HttpResponseErrorDisplay.tsx";
import AppErrorDisplay from "@/common/components/boundary/app-error-boundary/display/AppErrorDisplay.tsx";
import {ErrorHandlerProps} from "@/common/type/ErrorHandlerProps.ts";

/**
 * Handles query-related errors by delegating to
 * the appropriate error display component.
 *
 * @param error - Error thrown by a query
 * @param className - Optional wrapper class name
 */
const QueryErrorHandler = ({error, className}: ErrorHandlerProps) => {
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
};

export default QueryErrorHandler;
