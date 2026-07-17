/**
 * @fileoverview Utility for handling and logging errors resulting from mutation responses.
 */

import {ParseError} from "@/common/_err/ParseError.ts";
import {toast} from "react-toastify";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts";

/** Configuration for the mutation error handler. */
type ErrorParams = {
    error: unknown;
    displayMessage?: string;
};

/**
 * Processes mutation errors by displaying a toast notification and logging the error context.
 */
export function handleSubmitResponseError({error, displayMessage}: ErrorParams) {
    if (error instanceof ParseError) {
        const context = buildContext([
            {key: "message", value: displayMessage},
            {key: "raw", value: error.raw},
            {key: "errors", value: error.errors},
        ]);

        toast.error(displayMessage ?? "Invalid data returned. Please try again.");
        Logger.error({msg: "Failed To Validate Data", context, error});

        return;
    }

    if (error instanceof Error) {
        const context = buildContext([{key: "message", value: displayMessage}])
        toast.error(displayMessage ?? "Oops. Something went wrong. Please try again.");
        Logger.error({msg: "Error In Mutation:", error, context})
    } else {
        toast.error("An unknown error occurred. Please try again.");
        Logger.error({msg: "Unknown Error In Mutation", context: {error: error}});
    }
}
