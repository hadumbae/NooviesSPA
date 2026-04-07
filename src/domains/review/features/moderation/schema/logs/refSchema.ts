/**
 * @file Zod validation schema for Movie Review moderation log entries.
 * @filename refSchema.ts
 */

import {z} from "zod";
import {MovieReviewModerationActionSchema} from "@/domains/review/features/moderation/schema";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";

/**
 * Validated reference schema for an individual moderation audit entry.
 * ---
 */
export const MovieReviewModerationLogReferenceSchema = z.object({
    /** The specific administrative action taken (e.g., Delete, Toggle Publicity). */
    action: MovieReviewModerationActionSchema,

    /** The unique ID string of the administrator responsible for the change. */
    admin: IDStringSchema,

    /** The ISO-8601 formatted date and time when the moderation occurred. */
    modDate: UTCISO8601DateTimeSchema,

    /** The justification or note associated with the moderation event. */
    message: NonEmptyStringSchema.max(500, "Must be 500 characters or less."),
});

/**
 * TypeScript type inferred from {@link MovieReviewModerationLogReferenceSchema}.
 * Used for administrative audit trails and moderation history components.
 */
export type MovieReviewModerationLogReference = z.infer<typeof MovieReviewModerationLogReferenceSchema>;