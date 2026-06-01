/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for customer profile route parameters.
 *
 */

import {z} from "zod"
import {UserUniqueCodeSchema} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"

/** Validation schema for URL parameters required to identify a specific customer. */
export const CustomerReviewsRouteParamsSchema = z.object({
    /** The unique identifier code for the customer. */
    uniqueCode: UserUniqueCodeSchema,
})

/** Represents the parsed and validated route parameters for customer-specific view endpoints. */
export type CustomerReviewsRouteParams = z.infer<typeof CustomerReviewsRouteParamsSchema>