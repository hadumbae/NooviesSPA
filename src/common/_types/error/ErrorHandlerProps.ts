/**
 * @fileoverview Defines prop types for error handling and error display components.
 */

import {FallbackProps} from "react-error-boundary";

/** Props for error handling components. */
export type ErrorHandlerProps = Omit<FallbackProps, "resetErrorBoundary"> & {
    resetErrorBoundary?: (...args: unknown[]) => void;
    className?: string;
};

/** Props for components that display error information. */
export type ErrorHandlerDisplayProps<TError = unknown> = {
    error: TError;
    className?: string;
};
