/**
 * @fileoverview Display component for rendering general application errors.
 */

import {ReactElement} from "react";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {TriangleAlert} from "lucide-react";
import {ErrorHandlerDisplayProps} from "@/common/type/ErrorHandlerProps.ts";

/**
 * Renders a fallback UI with an error message when the application encounters an unhandled error.
 */
export function AppErrorDisplay(
    {error, className}: ErrorHandlerDisplayProps
): ReactElement {
    const errorMessage = error instanceof Error
        ? error.message
        : "An Error Occurred. Please Try Again.";

    Logger.log({
        type: "ERROR",
        msg: "General App Error.",
        context: buildContext([
            {key: "error", value: error},
            {key: "errorMessage", value: errorMessage},
        ]),
    });

    return (
        <div className={cn("h-full flex flex-col justify-center items-center space-y-4", className)}>
            <TriangleAlert size={30}/>

            <div className="space-y-2 text-center">
                <h2 className="section-title italic">Query Error</h2>
                <span className="secondary-text text-sm">{errorMessage}</span>
            </div>
        </div>
    );
}
