/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for the
 * route parameters used to fetch customer review moderation logs.
 */

import {z} from "zod"
import {UserUniqueCodeSchema} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"
import {MovieReviewUniqueCodeSchema} from "@/domains/review/features/codes"

/**
 * Validation schema for URL parameters required to identify a specific
 * customer and their movie review.
 */
export const CustomerReviewLogsRouteParamsSchema = z.object({
    uniqueCode: UserUniqueCodeSchema,
    reviewCode: MovieReviewUniqueCodeSchema,
})

/**
 * Represents the parsed and validated route parameters for customer
 * review-related endpoints.
 */
export type CustomerReviewRouteParams = z.infer<typeof CustomerReviewLogsRouteParamsSchema>