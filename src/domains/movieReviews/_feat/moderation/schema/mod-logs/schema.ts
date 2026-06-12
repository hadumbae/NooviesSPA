/**
 * @fileoverview Defines the Zod validation schema for enriched movie review moderation logs.
 */

import {z} from "zod"
import {LeanUserWithEmailSchema} from "@/domains/users/schema/user"
import {MovieReviewModerationLogReferenceSchema} from "@/domains/movieReviews/_feat/moderation/schema/mod-logs/refSchema.ts"

/** Hydrated version of a moderation log entry containing full administrator details. */
export const MovieReviewModerationLogSchema = MovieReviewModerationLogReferenceSchema.extend({
    admin: LeanUserWithEmailSchema,
});

/** Represents a log entry ready for rendering in a moderation history table. */
export type MovieReviewModerationLog = z.infer<typeof MovieReviewModerationLogSchema>;