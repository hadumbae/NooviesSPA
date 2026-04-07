/**
 * @file Zod validation schema for an enriched Movie Review moderation log.
 * @filename schema.ts
 */

import {z} from "zod";
import {
    MovieReviewModerationLogReferenceSchema
} from "@/domains/review/features/moderation/schema";
import {LeanUserWithEmailSchema} from "@/domains/users/schemas/user";

/**
 * Hydrated version of a moderation log entry, replacing IDs with user objects.
 * ---
 */
export const MovieReviewModerationLogSchema = MovieReviewModerationLogReferenceSchema.extend({
    /** The hydrated profile of the administrator who performed the action. */
    admin: LeanUserWithEmailSchema,
});

/**
 * TypeScript type inferred from the {@link MovieReviewModerationLogSchema}.
 * Represents a log entry ready for rendering in a moderation history table.
 */
export type MovieReviewModerationLog = z.infer<typeof MovieReviewModerationLogSchema>;