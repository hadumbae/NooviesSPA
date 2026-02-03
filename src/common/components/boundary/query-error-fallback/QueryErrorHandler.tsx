/**
 * @file QueryErrorHandler.tsx
 *
 * Central dispatcher for query-related errors.
 *
 * Routes known query error types to specialized displays
 * and falls back to the generic app error UI for
 * unexpected or unclassified errors.
 */

import {NetworkError} from "@/common/errors/NetworkError.ts";
import NetworkErrorDisplay from "@/common/components/boundary/query-error-fallback/display/NetworkErrorDisplay.tsx";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import HttpResponseErrorDisplay
    from "@/common/components/boundary/query-error-fallback/display/HttpResponseErrorDisplay.tsx";
import AppErrorDisplay from "@/common/components/boundary/app-error-boundary/display/AppErrorDisplay.tsx";
import {ErrorHandlerProps} from "@/common/type/ErrorHandlerProps.ts";
import {HttpStatusOverrideText} from "@/common/type/error/HttpErrorTypes.ts";

type HandlerProps = ErrorHandlerProps & {
    /** Optional HTTP status → message overrides */
    statusTextOverride?: HttpStatusOverrideText;
};

/**
 * Handles query-related errors by delegating to the
 * appropriate error display component.
 *
 * @param error - Error thrown by a query
 * @param className - Optional wrapper class name
 * @param statusTextOverride - Optional HTTP status message overrides
 */
const QueryErrorHandler = ({error, className, statusTextOverride}: HandlerProps) => {
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
};

export default QueryErrorHandler;
