/**
 * @fileoverview Defines the Zod validation schema for an enriched Movie Review
 * moderation log, including hydrated administrator profile information.
 */

import {z} from "zod"
import {
    MovieReviewModerationLogReferenceSchema
} from "@/domains/review/features/moderation/schema"
import {LeanUserWithEmailSchema} from "@/domains/users/schemas/user"

/**
 * Hydrated version of a moderation log entry, replacing IDs with user objects.
 */
export const MovieReviewModerationLogSchema = MovieReviewModerationLogReferenceSchema.extend({
    admin: LeanUserWithEmailSchema,
})

/**
 * Represents a log entry ready for rendering in a moderation history table,
 * containing full administrator details.
 */
export type MovieReviewModerationLog = z.infer<typeof MovieReviewModerationLogSchema>