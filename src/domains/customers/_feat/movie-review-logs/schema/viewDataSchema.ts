/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for paginated customer review moderation logs.
 */

import {z} from "zod"
import {generatePaginationSchema} from "@/common/_feat/validation-builders"
import {MovieReviewModerationLogSchema} from "@/domains/movie-reviews/_feat/moderation/schema"

/** Validation schema for a paginated collection of movie review moderation log entries. */
export const CustomerReviewLogsViewDataSchema = generatePaginationSchema(MovieReviewModerationLogSchema)

/** Represents the paginated data structure for customer review moderation logs. */
export type CustomerReviewLogsViewData = z.infer<typeof CustomerReviewLogsViewDataSchema>