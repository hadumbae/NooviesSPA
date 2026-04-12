/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for
 * paginated customer review moderation logs.
 */

import {z} from "zod"
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts"
import {MovieReviewModerationLogSchema} from "@/domains/review/features/moderation/schema"

/**
 * Validation schema for a paginated collection of movie review moderation
 * log entries.
 */
export const CustomerReviewLogsViewDataSchema = generatePaginationSchema(MovieReviewModerationLogSchema)

/**
 * Represents the paginated data structure for customer review moderation logs,
 * typically used for administrative history views.
 */
export type CustomerReviewLogsViewData = z.infer<typeof CustomerReviewLogsViewDataSchema>