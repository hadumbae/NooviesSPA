/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for customer review moderation log route parameters.
 */

import {z} from "zod"
import {UserUniqueCodeSchema} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts"
import {MovieReviewUniqueCodeSchema} from "@/domains/movie-reviews/_schema/fields"

/** Validation schema for URL parameters identifying a specific customer and their movie review. */
export const CustomerReviewLogsRouteParamsSchema = z.object({
    uniqueCode: UserUniqueCodeSchema,
    reviewCode: MovieReviewUniqueCodeSchema,
})

/** Represents the parsed and validated route parameters for customer review-related endpoints. */
export type CustomerReviewLogsRouteParams = z.infer<typeof CustomerReviewLogsRouteParamsSchema>