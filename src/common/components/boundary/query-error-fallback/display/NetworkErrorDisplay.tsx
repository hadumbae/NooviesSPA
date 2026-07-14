/**
 * @fileoverview Component for displaying and logging network-related errors within a query error boundary.
 */

import {NetworkError} from "@/common/errors/NetworkError.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {ErrorHandlerDisplayProps} from "@/common/type/ErrorHandlerProps.ts";
import { ReactElement } from "react";

/**
 * Renders a visual representation of a network error and logs the error details to the logger.
 */
export function NetworkErrorDisplay(
    {error, className}: ErrorHandlerDisplayProps<NetworkError>
): ReactElement {
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
            <Network size={30}/>

            <div className="space-y-2 text-center">
                <h2 className="section-title italic">Network Error</h2>
                <span className="secondary-title text-sm">{errorMessage ?? causeMessage}</span>
            </div>
        </div>
    );
}
