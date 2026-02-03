/**
 * @file AppErrorFallback.tsx
 *
 * Root fallback component for application-level error boundaries.
 *
 * Delegates query-related errors to the query error handler,
 * while rendering a generic application error display for
 * all other error types.
 */

import {FallbackProps} from "react-error-boundary";
import AppErrorDisplay from "@/common/components/boundary/app-error-boundary/display/AppErrorDisplay.tsx";
import {isQueryError} from "@/common/utility/errors/checkErrorType.ts";
import QueryErrorHandler from "@/common/components/boundary/query-error-fallback/QueryErrorHandler.tsx";

type HandlerProps = FallbackProps & { className?: string };

/**
 * Error boundary fallback renderer for the application.
 *
 * @param props - Error boundary fallback props
 */
const AppErrorFallback = ({error, className}: HandlerProps) => {
    if (isQueryError(error)) {
        return (
            <QueryErrorHandler
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

export default AppErrorFallback;
