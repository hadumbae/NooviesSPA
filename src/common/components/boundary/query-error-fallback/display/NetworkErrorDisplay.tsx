/**
 * @file NetworkErrorDisplay.tsx
 *
 * Display component for network-level query failures.
 *
 * Used when a request fails before receiving a valid HTTP response.
 */

import {NetworkError} from "@/common/errors/NetworkError.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

type DisplayParams = {
    /** Network error instance */
    error: NetworkError;

    /** Optional wrapper class name */
    className?: string;
};

/**
 * Renders network failure details and emits structured diagnostics.
 *
 * Intended for transport-level failures such as connectivity issues,
 * timeouts, or aborted requests.
 */
const NetworkErrorDisplay = ({error, className}: DisplayParams) => {
    const {method, url, message: errorMessage, cause: {message: causeMessage} = {}} = error;

    Logger.error({
        error,
        type: "ERROR",
        msg: "Network Error",
        context: buildContext([
            {key: "method", value: method},
            {key: "url", value: url},
            {key: "cause", value: causeMessage},
            {key: "message", value: errorMessage},
        ]),
    });

    return (
        <div className={cn("h-full flex justify-center items-center space-y-4", className)}>
            <Network/>

            <div className="space-y-2">
                <h2 className={cn(PrimaryTextBaseCSS)}>Network Error</h2>
                <span className={cn(SecondaryTextBaseCSS, "text-sm")}>
                    {errorMessage ?? causeMessage}
                </span>
            </div>
        </div>
    );
};

export default NetworkErrorDisplay;
