import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {ZodParseIssueSchema} from "@/common/schema/errors/ZodParseIssueSchema.ts";

/**
 * 🛑 Standard error response format.
 *
 * Returned whenever an API endpoint fails with a simple error message.
 */
export const ErrorResponseSchema = z.object({
    /** User-friendly error message. */
    message: NonEmptyStringSchema,
});

/**
 * 🚨 Detailed parse error response.
 *
 * Extends `ErrorResponseSchema` by including a list of detailed parsing issues.
 * At least one issue is required.
 */
export const ParseErrorResponseSchema = ErrorResponseSchema.extend({
    /**
     * List of individual parse issues identified by Zod during validation.
     * Must include at least one issue.
     */
    errors: z
        .array(ZodParseIssueSchema)
        .min(1, "Must have at least one issue."),
});