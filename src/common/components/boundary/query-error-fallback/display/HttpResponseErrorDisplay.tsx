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
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";

type DisplayParams = {
    /** HTTP response error instance */
    error: HttpResponseError;

    /** Optional wrapper class name */
    className?: string;
};

/**
 * Renders HTTP error details and logs structured response context.
 *
 * Intended for server-side failures and non-OK HTTP responses.
 */
const HttpResponseErrorDisplay = ({error, className}: DisplayParams) => {
    const {message, status, statusText, url, model, payload} = error;

    Logger.error({
        error,
        type: "ERROR",
        msg: `HTTP ${status}: ${statusText}`,
        context: buildContext([
            {key: "url", value: url},
            {key: "model", value: model},
            {key: "status", value: status},
            {key: "payload", value: payload},
            {key: "message", value: message},
        ]),
    });

    return (
        <div className={cn("h-full flex justify-center items-center space-y-4", className)}>
            <Network/>

            <div className="space-y-2">
                <h2 className={cn(PrimaryTextBaseCSS)}>HTTP {status}</h2>
                <span className={cn(SecondaryTextBaseCSS, "text-sm")}>
                    {message ?? statusText}
                </span>
            </div>
        </div>
    );
};

export default HttpResponseErrorDisplay;
