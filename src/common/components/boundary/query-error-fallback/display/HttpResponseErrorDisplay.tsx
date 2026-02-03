/**
 * @file HttpResponseErrorDisplay.tsx
 *
 * Display component for HTTP response-level query failures.
 *
 * Used when a request completes but returns a non-OK HTTP status.
 */

import Logger from "@/common/utility/features/logger/Logger.ts";
import buildContext from "@/common/utility/features/logger/buildLoggerContext.ts";
import {Network} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {HeaderTextCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import {ErrorHandlerDisplayProps} from "@/common/type/ErrorHandlerProps.ts";

/**
 * Renders HTTP error details and logs structured response context.
 *
 * Intended for server-side failures and non-OK HTTP responses.
 */
const HttpResponseErrorDisplay = ({error, className}: ErrorHandlerDisplayProps<HttpResponseError>) => {
    const {message, status, statusText, url, model, payload} = error;
    const errorMessage = message ? message : undefined;

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
        ]),
    });

    return (
        <div className={cn("h-full flex flex-col justify-center items-center space-y-4", className)}>
            <Network size={30}/>

            <div className="space-y-2 text-center">
                <h2 className={cn(HeaderTextCSS, "uppercase italic")}>HTTP {status}</h2>
                <span className={cn(SecondaryTextBaseCSS, "text-sm")}>
                    {errorMessage ?? statusText}
                </span>
            </div>
        </div>
    );
};

export default HttpResponseErrorDisplay;
