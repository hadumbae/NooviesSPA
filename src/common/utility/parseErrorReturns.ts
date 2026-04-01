/**
 * @file Utility for safely extracting error messages from API response payloads.
 * @filename parseErrorReturns.ts
 */

import {
    ErrorRequestMessageReturns,
    ErrorRequestMessageReturnsSchema
} from "@/common/schema/ErrorRequestMessageReturnsSchema.ts";

/**
 * Attempts to parse an unknown API payload into a standardized error message structure.
 * @param payload - The raw response body from a failed HTTP request.
 * @returns A validated {@link ErrorRequestMessageReturns} object, or `null` if the payload is malformed.
 */
export function parseErrorReturns(payload: unknown): ErrorRequestMessageReturns | null {
    const {success, data} = ErrorRequestMessageReturnsSchema.safeParse(payload);
    return success ? data : null;
}