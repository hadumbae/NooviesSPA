/**
 * @fileoverview Display component for HTTP response errors within the query error boundary fallback.
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ErrorHandlerDisplayProps} from "@/common/type/ErrorHandlerProps.ts";
import {HttpStatusOverrideText} from "@/common/type/error/HttpErrorTypes.ts";
import {ReactElement} from "react";

type DisplayProps = ErrorHandlerDisplayProps<HttpResponseError> & {
    statusTextOverride?: HttpStatusOverrideText;
};

/** Renders a visual representation of an HTTP error including status code and optional message overrides. */
export function HttpResponseErrorDisplay(
    {error, className, statusTextOverride}: DisplayProps
): ReactElement {
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
                <h2 className="section-title italic">HTTP {status}</h2>
                <span className="secondary-text text-sm">{errorMessage ?? statusMessage}</span>
            </div>
        </div>
    );
}
