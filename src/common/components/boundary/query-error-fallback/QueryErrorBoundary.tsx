/**
 * @file QueryErrorBoundary.tsx
 *
 * Error boundary wrapper for React Query workflows.
 *
 * Integrates React Query’s reset mechanism with a unified
 * query error handler and optional HTTP status text overrides.
 */

import {ReactNode} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import QueryErrorHandler from "@/common/components/boundary/query-error-fallback/QueryErrorHandler.tsx";
import {HttpStatusOverrideText} from "@/common/type/error/HttpErrorTypes.ts";

type BoundaryProps = {
    /** Wrapped query-driven render tree */
    children: ReactNode;

    /** Optional HTTP status → message overrides */
    statusTextOverride?: HttpStatusOverrideText;

    /** Optional wrapper class name forwarded to fallback UI */
    className?: string;
};

/**
 * Error boundary for query-driven components.
 *
 * Automatically resets failed queries when the boundary
 * is reset and delegates error rendering to `QueryErrorHandler`.
 *
 * @param children - Wrapped render tree
 * @param statusTextOverride - Optional HTTP status message overrides
 * @param className - Optional class name passed to fallback UI
 */
const QueryErrorBoundary = ({children, className, statusTextOverride}: BoundaryProps) => {
    const {reset} = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={(fallbackProps) => (
                <QueryErrorHandler
                    {...fallbackProps}
                    className={className}
                    statusTextOverride={statusTextOverride}
                />
            )}
        >
            {children}
        </ErrorBoundary>
    );
};

export default QueryErrorBoundary;
