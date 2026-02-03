/**
 * @file AppErrorDisplay.tsx
 *
 * Generic UI for rendering non-query application errors.
 *
 * Logs the error context and presents a user-facing
 * fallback message when no specialized handler applies.
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {TriangleAlert} from "lucide-react";
import {HeaderTextCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {ErrorHandlerDisplayProps} from "@/common/type/ErrorHandlerProps.ts";

/**
 * Displays a generic application error state.
 *
 * @param error - Error value to display
 * @param className - Optional wrapper class name
 */
const AppErrorDisplay = ({error, className}: ErrorHandlerDisplayProps) => {
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
                <h2 className={cn(HeaderTextCSS, "uppercase italic")}>Query Error</h2>
                <span className={cn(SecondaryTextBaseCSS, "text-sm")}>{errorMessage}</span>
            </div>
        </div>
    );
};

export default AppErrorDisplay;
