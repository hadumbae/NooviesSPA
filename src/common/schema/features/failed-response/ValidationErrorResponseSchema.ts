import {z} from "zod";
import {ZodParseIssueSchema} from "@/common/schema/errors/ZodParseIssueSchema.ts";
import {ErrorResponseSchema} from "@/common/schema/features/failed-response/ErrorResponseSchema.ts";

/**
 * 🚨 Detailed parse error response.
 *
 * Extends `ErrorResponseSchema` by including a list of detailed parsing issues.
 * At least one issue is required.
 */
export const ValidationErrorResponseSchema = ErrorResponseSchema.extend({
    /**
     * List of individual parse issues identified by Zod during validation.
     * Must include at least one issue.
     */
    errors: z
        .array(ZodParseIssueSchema)
        .min(1, "Must have at least one issue."),
});