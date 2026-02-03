/**
 * @file QueryErrorBoundary.tsx
 *
 * Error boundary wrapper for query-driven React components.
 *
 * Integrates `react-error-boundary` with TanStack Query’s
 * error reset mechanism to provide coordinated recovery
 * from query failures.
 */

import {ReactNode} from "react";
import {ErrorBoundary} from "react-error-boundary";
import QueryErrorFallback from "@/common/components/boundary/query-error-fallback/QueryErrorFallback.tsx";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";

type BoundaryProps = {
    /** Child components protected by the error boundary */
    children: ReactNode;

    /** Optional class name forwarded to the fallback display */
    className?: string;
};

/**
 * Provides a query-aware error boundary.
 *
 * - Catches errors thrown during query rendering
 * - Resets failed queries when the boundary is reset
 * - Delegates error rendering to `QueryErrorFallback`
 *
 * Intended to wrap components that rely on TanStack Query.
 */
const QueryErrorBoundary = ({children, className}: BoundaryProps) => {
    const {reset} = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={(fallbackProps) => (
                <QueryErrorFallback
                    {...fallbackProps}
                    className={className}
                />
            )}
        >
            {children}
        </ErrorBoundary>
    );
};

export default QueryErrorBoundary;
