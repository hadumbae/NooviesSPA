/**
 * @fileoverview Error boundary component integrated with React Query's reset functionality.
 */

import {ReactElement, ReactNode} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import {HttpStatusOverrideText} from "@/common/_types/error/HttpErrorTypes.ts";
import {
    QueryErrorHandler
} from "@/views/common/_feat/error-boundary/query-error-fallback/boundary/QueryErrorHandler.tsx";

/** Props for the QueryErrorBoundary component. */
type BoundaryProps = {
    children: ReactNode;
    statusTextOverride?: HttpStatusOverrideText;
    className?: string;
};

/**
 * Catches rendering and data fetching errors and provides a mechanism to reset the query cache.
 */
export function QueryErrorBoundary(
    {children, className, statusTextOverride}: BoundaryProps
): ReactElement {
    const {reset} = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary onReset={reset} fallbackRender={(fallbackProps) => (
            <QueryErrorHandler
                {...fallbackProps}
                className={className}
                statusTextOverride={statusTextOverride}
            />
        )}>
            {children}
        </ErrorBoundary>
    );
}
