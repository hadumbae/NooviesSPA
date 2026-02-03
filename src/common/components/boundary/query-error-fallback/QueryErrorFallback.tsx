/**
 * @file QueryErrorFallback.tsx
 *
 * Error boundary fallback component for query and data-fetching errors.
 *
 * Responsibilities:
 * - Route known error types to specialized display components
 * - Provide a safe fallback for unknown error shapes
 *
 * Intended for use with `react-error-boundary` in query-driven UIs.
 */

import {FallbackProps} from "react-error-boundary";
import {NetworkError} from "@/common/errors/NetworkError.ts";
import NetworkErrorDisplay from "@/common/components/boundary/query-error-fallback/display/NetworkErrorDisplay.tsx";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import HttpResponseErrorDisplay
    from "@/common/components/boundary/query-error-fallback/display/HttpResponseErrorDisplay.tsx";
import BaseQueryErrorDisplay from "@/common/components/boundary/query-error-fallback/display/BaseQueryErrorDisplay.tsx";

type CompProps = FallbackProps & {
    /** Optional wrapper class name */
    className?: string;
};

/**
 * Error boundary fallback renderer for query failures.
 *
 * Selects a display component based on the error instance:
 * - `NetworkError` → network-level failure
 * - `HttpResponseError` → HTTP response failure
 * - unknown → generic query error display
 */
const QueryErrorFallback = ({error, className}: CompProps) => {
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
        <BaseQueryErrorDisplay
            error={error}
            className={className}
        />
    );
};

export default QueryErrorFallback;
