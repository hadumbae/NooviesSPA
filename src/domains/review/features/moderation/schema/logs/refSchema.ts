/**
 * @fileoverview Defines the Zod validation schema for Movie Review moderation
 * log entries, used for validating administrative audit data.
 */

import {z} from "zod"
import {MovieReviewModerationActionSchema} from "@/domains/review/features/moderation/schema"
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts"
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts"
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts"

/**
 * Validated reference schema for an individual moderation audit entry.
 */
export const MovieReviewModerationLogReferenceSchema = z.object({
    _id: IDStringSchema,
    review: IDStringSchema,
    action: MovieReviewModerationActionSchema,
    admin: IDStringSchema,
    modDate: UTCISO8601DateTimeSchema,
    message: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),
})

/**
 * Represents a moderation log entry used for administrative audit trails and
 * moderation history components.
 */
export type MovieReviewModerationLogReference = z.infer<typeof MovieReviewModerationLogReferenceSchema>