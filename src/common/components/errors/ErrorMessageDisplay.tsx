import {FC} from 'react';
import {TriangleAlert} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

/**
 * Props for the `ErrorMessageDisplay` component.
 */
interface ErrorProps {
    /**
     * The error object to display.
     * Supports generic Error, HttpResponseError, and ParseError.
     */
    error?: Error | null;

    /**
     * An optional message to override the default error message.
     */
    displayMessage?: string;

    /**
     * Optional CSS class names to apply to the root element.
     */
    className?: string;

    /**
     * Optional function name or context for logging purposes.
     * Will be printed to the console if `logToConsole` is true.
     */
    fnName?: string;

    /**
     * Layout direction for the error message and icon.
     * Defaults to "horizontal".
     */
    orientation?: "horizontal" | "vertical";

    /**
     * Whether to log details to the browser console.
     * Defaults to `true`.
     */
    logToConsole?: boolean;
}

/**
 * `ErrorMessageDisplay` is a reusable React component that renders a formatted error message,
 * optionally logging debugging info to the console.
 * It supports multiple error types and visual layout options.
 *
 * @param error - The error object to display.
 * @param displayMessage - Optional message to override the default.
 * @param className - Optional additional CSS classes.
 * @param fnName - Optional function name for logging context.
 * @param orientation - Layout orientation ("horizontal" or "vertical").
 * @param logToConsole - If true, logs error details to the console.
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
