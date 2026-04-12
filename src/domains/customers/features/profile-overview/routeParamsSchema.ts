/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for the
 * route parameters required to access a customer's profile overview.
 */

import {z} from "zod"
import {UserUniqueCodeSchema} from "@/domains/users/schemas/UserUniqueCodeSchema.ts"

/**
 * Validation schema for URL parameters used to target a specific customer
 * profile for an administrative overview.
 */
export const CustomerProfileOverviewRouteParamsSchema = z.object({
    /** The validated unique system code for the customer. */
    uniqueCode: UserUniqueCodeSchema,
})

/**
 * Represents the parsed and validated route parameters for the customer
 * profile overview endpoint.
 */
export type CustomerProfileOverviewRouteParams = z.infer<typeof CustomerProfileOverviewRouteParamsSchema>