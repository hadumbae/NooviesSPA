import {FC} from 'react';
import {TriangleAlert} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Props for the {@link ErrorMessageDisplay} component.
 */
type ErrorProps = {
    /**
     * The error object to display.
     * Can be a generic `Error`, a `ParseError`, or an `HttpResponseError`.
     */
    error?: Error | null | undefined;

    /**
     * Optional override message to display instead of the error's message.
     */
    displayMessage?: string;

    /**
     * Optional additional CSS class names to apply to the container.
     */
    className?: string;

    /**
     * Optional name of the function or component where the error was caught.
     * If provided and `logToConsole` is `true`, this will be logged to the console.
     */
    fnName?: string;

    /**
     * Layout orientation of the component.
     * - `"horizontal"` (default): icon and message side-by-side.
     * - `"vertical"`: icon above the message with spacing.
     */
    orientation?: "horizontal" | "vertical";

    /**
     * Whether to log error details to the console.
     * Defaults to `true`.
     */
    logToConsole?: boolean;
};

/**
 * A component to display an error message with an alert icon.
 *
 * This component:
 * - Displays detailed error information for `HttpResponseError` and `ParseError` instances.
 * - Logs error details to the console if `logToConsole` is enabled.
 * - Supports customizable layout orientation and message override.
 *
 * @param props - {@link ErrorProps}
 *
 * @example
 * ```tsx
 * <ErrorMessageDisplay error={someError} fnName="MyComponent" />
 * ```
 */
const ErrorMessageDisplay: FC<ErrorProps> = ({error, displayMessage, className, fnName, orientation, logToConsole = true}) => {
    let errorMessage = error?.message ?? "Something Went Wrong.";

    if (logToConsole && fnName) {
        console.error(`Error Caught In ${fnName}`);
    }

    if (error instanceof HttpResponseError) {
        const {response: {status}, message} = error;
        errorMessage = message ? `${status} : ${message}` : `Network Attempt Failed With Code ${status}`;

        if (logToConsole) {
            console.error("Error: Network Attempt Failed.");
            console.error("Response Status : ", status);
            message && console.error("Error Message: ", message);
        }
    }

    if (error instanceof ParseError) {
        const {message, errors, raw} = error;
        errorMessage = message ? "Failed To Validate Data" : errorMessage;

        if (logToConsole) {
            console.error("Error: Failed To Validate Data")
            console.error("Parse Errors: ", errors);
            console.error("Raw Data: ", raw);
        }
    }

    if (displayMessage) {
        errorMessage = displayMessage;
    }

    return (
        <div className={cn(
            "text-red-500 flex justify-center items-center",
            orientation === "vertical" ? "flex-col space-y-3" : "space-x-5",
            className,
        )}>
            <TriangleAlert/>
            <span role="alert">{errorMessage}</span>
        </div>
    );
};

export default ErrorMessageDisplay;
