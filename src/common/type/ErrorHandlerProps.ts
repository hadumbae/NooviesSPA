/**
 * @file ErrorHandlerProps.ts
 *
 * Shared prop contracts for error boundary fallback components.
 *
 * Provides a normalized interface for error handling UI by:
 * - extending `react-error-boundary` fallback props
 * - allowing optional reset overrides
 * - supporting consistent wrapper styling via `className`
 *
 * Intended for reuse across application- and query-level error boundaries.
 */

import {FallbackProps} from "react-error-boundary";

/**
 * Base props for error boundary fallback handlers.
 *
 * Derived from `react-error-boundary`’s `FallbackProps`, with:
 * - an optional `resetErrorBoundary` override
 * - an optional `className` for layout or styling
 */
export type ErrorHandlerProps = Omit<FallbackProps, "resetErrorBoundary"> & {
    resetErrorBoundary?: (...args: unknown[]) => void;
    className?: string;
};

/**
 * Display-only error props for error UI components.
 *
 * @template TError
 * Error type expected by the display component.
 */
export type ErrorHandlerDisplayProps<TError = unknown> = {
    error: TError;
    className?: string;
};
