/**
 * @file Zod validation schema for movie review moderation actions.
 * @filename schema.ts
 */

import {z} from "zod";
import {MovieReviewModerationActionConstant} from "@/domains/review/features/moderation/schema/action/constant.ts";

/**
 * Schema for validating administrative moderation commands.
 * ---
 */
export const MovieReviewModerationActionSchema = z.enum(
    MovieReviewModerationActionConstant,
    {
        /** Custom logic to translate Zod internal issues into readable administrative feedback. */
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
            if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
            return {message: ctx.defaultError};
        }
    }
);

/**
 * TypeScript type inferred from the {@link MovieReviewModerationActionSchema}.
 * Used for dispatching moderation events in the admin services.
 */
export type MovieReviewModerationAction = z.infer<typeof MovieReviewModerationActionSchema>;