/**
 * @fileoverview Zod schema for validation error response payloads.
 */

import {z} from "zod";
import {ZodParseIssueSchema} from "@/common/_schemas/zod/ZodParseIssueSchema.ts";
import {ErrorResponsePayloadSchema} from "@/common/_schemas/response-payloads/ErrorResponsePayloadSchema.ts";

/** Schema for API responses containing validation errors. */
export const ValidationErrorResponsePayloadSchema = ErrorResponsePayloadSchema.extend({
    errors: z.array(ZodParseIssueSchema, {
        required_error: "Required.",
        invalid_type_error: "Must be an array of Zod Issues."
    }),
});

/** Type definition for validation error response payloads. */
export type ValidationErrorResponsePayload = z.infer<typeof ValidationErrorResponsePayloadSchema>;