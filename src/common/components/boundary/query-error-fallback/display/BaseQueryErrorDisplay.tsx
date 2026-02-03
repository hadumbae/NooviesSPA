/**
 * @file BaseQueryErrorDisplay.tsx
 *
 * Generic fallback display for unknown query errors.
 *
 * Used when an error does not match a known domain-specific type.
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {Network} from "lucide-react";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

type DisplayParams = {
    /** Unknown error object */
    error: unknown;

    /** Optional wrapper class name */
    className?: string;
};

/**
 * Displays a generic query error message and logs diagnostic context.
 *
 * This component is intentionally conservative and should only be reached
 * when the error type is not explicitly handled elsewhere.
 */
const BaseQueryErrorDisplay = ({error, className}: DisplayParams) => {
    const errorMessage = error instanceof Error
        ? error.message
        : "An unknown query error occurred.";

    Logger.log({
        type: "ERROR",
        msg: "Unknown Query Error.",
        context: buildContext([
            {key: "error", value: error},
            {key: "errorMessage", value: errorMessage},
        ]),
    });

    return (
        <div className={cn("h-full flex justify-center items-center space-y-4", className)}>
            <Network/>

            <div className="space-y-2">
                <h2 className={cn(PrimaryTextBaseCSS, "uppercase italic")}>Query Error</h2>
                <span className={cn(SecondaryTextBaseCSS, "text-sm")}>{errorMessage}</span>
            </div>
        </div>
    );
};

export default BaseQueryErrorDisplay;
