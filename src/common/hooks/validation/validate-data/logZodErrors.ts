/**
 * @file Debugging utility for capturing and displaying Zod validation failures.
 * @filename logZodErrors.ts
 */

import {ZodIssue} from "zod";

/**
 * Configuration for the Zod error logger.
 */
type LogConfig = {
    /** The raw payload that failed validation. */
    raw: unknown;
    /** The collection of issues produced by the Zod parser. */
    errors: ZodIssue[];
}

/**
 * Provides a formatted, grouped console output for runtime validation errors.
 * ---
 * @param config - The raw data and corresponding validation issues.
 */
export function logZodErrors({raw, errors}: LogConfig): void {
    console.group("Query Validation Failed");

    /** Log the actual object received from the network/source */
    console.error("Payload: ", raw);

    /** Log the array of specific field violations and error messages */
    console.error("Zod Issues: ", errors);

    console.groupEnd();
}