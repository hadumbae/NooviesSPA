/**
 * @file Zod schema and type for standardized error message responses.
 * @filename ErrorRequestMessageReturnsSchema.ts
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validates a simple error response envelope containing a descriptive message.
 */
export const ErrorRequestMessageReturnsSchema = z.object({
    /**
     * The human-readable error description sent by the server.
     * Validated via {@link NonEmptyStringSchema} to ensure displayable content.
     */
    message: NonEmptyStringSchema,
});

/**
 * TypeScript type inferred from {@link ErrorRequestMessageReturnsSchema}.
 * Represents a basic error payload for non-validation-specific failures.
 */
export type ErrorRequestMessageReturns = z.infer<typeof ErrorRequestMessageReturnsSchema>;