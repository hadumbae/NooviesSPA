/**
 * @fileoverview Utility for constructing and dispatching standardized log entries.
 */

import {LoggerFunction, LogType} from "@/common/_feat/logger/Logger.types.ts";
import {Logger} from "@/common/_feat/logger/Logger.ts";
import {filterNullishAttributes} from "@/common/_feat/filter-object-attributes/filterNullishAttributes.ts";

/** Configuration parameters for constructing a standard log entry. */
type LogParams = {
    type?: LogType;
    level?: LoggerFunction;
    msg: string;
    component?: string;
    context?: Record<string, unknown>;
};

/** Formats log data and dispatches it through the central Logger utility. */
export function buildStandardLog(params: LogParams) {
    const {msg, type = "GENERAL", level = "log", component, context = {}} = params;

    Logger[level]({
        msg,
        type,
        context: filterNullishAttributes({component, ...context}),
    });
}
