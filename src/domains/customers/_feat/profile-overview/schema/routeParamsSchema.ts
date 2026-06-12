/**
 * @fileoverview Defines the validation schema and type for customer profile overview route parameters.
 */

import {z} from "zod"
import {UserUniqueCodeSchema} from "@/domains/users/schema/fields/UserUniqueCodeSchema.ts"

/** Validation schema for customer profile overview route parameters. */
export const CustomerProfileOverviewRouteParamsSchema = z.object({
    uniqueCode: UserUniqueCodeSchema,
})

/** Route parameters for the customer profile overview. */
export type CustomerProfileOverviewRouteParams = z.infer<typeof CustomerProfileOverviewRouteParamsSchema>