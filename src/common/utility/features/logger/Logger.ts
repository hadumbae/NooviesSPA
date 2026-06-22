/**
 * @fileoverview Utility for environment-aware structured logging.
 */

import {LogPayload} from "@/common/utility/features/logger/Logger.types.ts";

const isDev = import.meta.env.VITE_DEV_MODE === 'true';
const isLoggingToConsole = import.meta.env.VITE_LOG_TO_CONSOLE === 'true';
const formatContext = ({context, error, type = "GENERAL"}: LogPayload) => {
    return {
        type,
        time: new Date().toISOString(),
        context: context ?? {},
        error: error
            ? {message: error.message, stack: error.stack}
            : {message: null, stack: null},
    };
};

/**
 * A logger object that provides methods for different log levels and handles environment-based filtering.
 */
const Logger = {
    /** Logs an informational message to the console if development mode or console logging is enabled. */
    log: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.log("[INFO]", msg, formatContext(payload));
    },

    /** Logs a warning message to the console if development mode or console logging is enabled. */
    warn: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.warn("[WARN]", msg, formatContext(payload));
    },

    /** Logs a debug message to the console if development mode or console logging is enabled. */
    debug: (payload: LogPayload) => {
        const {msg} = payload;
        if (isDev || isLoggingToConsole) console.debug("[DEBUG]", msg, formatContext(payload));
    },

    /** Logs an error message to the console regardless of the current environment. */
    error: (payload: LogPayload) => {
        const {msg} = payload;
        console.error("[ERROR]", msg, formatContext(payload));
    },
};

export default Logger;
