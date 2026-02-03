/**
 * @file HttpResponseErrorDisplay.tsx
 *
 * Display component for HTTP response–level query failures.
 *
 * Used when a request completes successfully at the network
 * level but returns a non-OK HTTP status code.
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {HeaderTextCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ErrorHandlerDisplayProps} from "@/common/type/ErrorHandlerProps.ts";
import {HttpStatusOverrideText} from "@/common/type/error/HttpErrorTypes.ts";

type DisplayProps = ErrorHandlerDisplayProps<HttpResponseError> & {
    /** Optional HTTP status → message overrides */
    statusTextOverride?: HttpStatusOverrideText;
};

/**
 * Renders HTTP response errors and logs structured
 * request/response context for diagnostics.
 *
 * Supports optional status text overrides for
 * domain-specific or user-friendly messaging.
 */
const HttpResponseErrorDisplay = ({error, className, statusTextOverride}: DisplayProps) => {
    const {message, status, statusText, url, model, payload} = error;

    const errorMessage = message ? message : undefined;
    const statusMessage = statusTextOverride?.[status] || statusText;

    Logger.error({
        error,
        type: "ERROR",
        msg: `HTTP ${status}: ${statusText}`,
        context: buildContext([
            {key: "url", value: url},
            {key: "model", value: model},
            {key: "status", value: status},
            {key: "payload", value: payload},
            {key: "message", value: errorMessage},
            {key: "statusText", value: statusMessage},
        ]),
    });

    return (
        <div className={cn("h-full flex flex-col justify-center items-center space-y-4", className)}>
            <Network size={30}/>

            <div className="space-y-2 text-center">
                <h2 className={cn(HeaderTextCSS, "uppercase italic")}>HTTP {status}</h2>
                <span className={cn(SecondaryTextBaseCSS, "text-sm")}>
                    {errorMessage ?? statusMessage}
                </span>
            </div>
        </div>
    );
};

export default HttpResponseErrorDisplay;
