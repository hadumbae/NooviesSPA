/**
 * @fileoverview Defines types and interfaces for the application logging system.
 */

import {Logger} from "@/common/_feat/logger/Logger.ts";

/** Categories used to classify log messages. */
export type LogType =
    "GENERAL" |
    "INFO" |
    "WARNING" |
    "ERROR" |
    "FETCH" |
    "DATA" |
    "NAVIGATION";


/** Metadata object containing additional information for a log entry. */
export type LogContext = Record<string, unknown>;

/** Structure of a complete log entry payload. */
export type LogPayload = {
    type?: LogType;
    msg: string;
    context?: LogContext;
    error?: Error;
};

/** Utility type that extracts valid method names from the Logger class. */
export type LoggerFunction = {
    [K in keyof typeof Logger]: typeof Logger[K] extends (...args: any[]) => any ? K : never
}[keyof typeof Logger];
