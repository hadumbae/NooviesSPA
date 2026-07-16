/**
 * @fileoverview Utility for logging form submission data with structured context.
 */

import {Logger} from "@/common/_feat/logger/Logger.ts";
import {buildContext} from "@/common/_feat/logger-builders/buildLoggerContext.ts";

/** Parameters for constructing a form submission log entry. */
type LogParams = {
    msg: string;
    component?: string;
    values: Record<string, unknown>;
};

/** Logs form submission data to the centralised logger with a DATA type. */
export function buildFormSubmitLog(params: LogParams) {
    const {msg, component, values} = params;

    const context = buildContext([
        {key: "component", value: component},
        {key: "values", value: values},
    ]);

    Logger.log({
        type: "DATA",
        msg,
        context,
    });
}
