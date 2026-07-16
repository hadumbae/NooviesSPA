/**
 * @fileoverview Utility for logging Zod validation failures to the console.
 */

import {ZodIssue} from "zod";

/** Configuration object for logging Zod errors. */
type LogConfig = {
    raw: unknown;
    errors: ZodIssue[];
}

/** Logs the raw payload and associated Zod issues to a grouped console error. */
export function logZodErrors({raw, errors}: LogConfig): void {
    console.group("Query Validation Failed");

    console.error("Payload: ", raw);
    console.error("Zod Issues: ", errors);

    console.groupEnd();
}