/**
 * @file AppErrorBoundary.tsx
 *
 * Top-level application error boundary.
 *
 * Wraps the application tree and provides a unified fallback
 * for both query-related and non-query runtime errors.
 *
 * Integrates React Query’s reset mechanism to allow recovery
 * after handled failures.
 */

import {ErrorBoundary} from "react-error-boundary";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import AppErrorFallback from "@/common/components/boundary/app-error-boundary/AppErrorFallback.tsx";
import {ReactNode} from "react";

type BoundaryProps = {
    children: ReactNode;
    className?: string;
};

/**
 * Root error boundary for the application.
 *
 * @param children - Wrapped render tree
 * @param className - Optional class name passed to fallback UI
 */
const AppErrorBoundary = ({children, className}: BoundaryProps) => {
    const {reset} = useQueryErrorResetBoundary();

    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={(fallbackProps) => (
                <AppErrorFallback
                    {...fallbackProps}
                    className={className}
                />
            )}
        >
            {children}
        </ErrorBoundary>
    );
};

export default AppErrorBoundary;
