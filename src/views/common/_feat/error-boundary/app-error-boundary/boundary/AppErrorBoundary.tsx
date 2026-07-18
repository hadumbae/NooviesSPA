/**
 * @fileoverview Error boundary component that integrates with TanStack Query for automatic error state resetting.
 */

import {ReactElement, ReactNode} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import {AppErrorFallback} from "@/views/common/_feat/error-boundary/app-error-boundary/boundary/AppErrorFallback.tsx";

/** Props for the AppErrorBoundary component. */
type BoundaryProps = {
    children: ReactNode;
    className?: string;
};

/** Catch-all error boundary that resets the React Query cache when a retry is attempted. */
export function AppErrorBoundary(
    {children, className}: BoundaryProps
): ReactElement {
    const {reset} = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary onReset={reset} fallbackRender={(fallbackProps) => (
            <AppErrorFallback
                {...fallbackProps}
                className={className}
            />
        )}>
            {children}
        </ErrorBoundary>
    );
}