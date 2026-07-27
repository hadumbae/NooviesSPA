/**
 * @fileoverview Defines the Zod validation schema and TypeScript type for customer movie review route parameters.
 */

import {z} from "zod"
import {IDStringSchema} from "@/common/_schemas";

/** Zod schema for validating URL parameters required to identify a customer for their reviews. */
export const CustomerReviewsRouteParamsSchema = z.object({
    customerID: IDStringSchema,
})

/** Type definition for the validated customer review route parameters. */
export type CustomerReviewsRouteParams = z.infer<typeof CustomerReviewsRouteParamsSchema>