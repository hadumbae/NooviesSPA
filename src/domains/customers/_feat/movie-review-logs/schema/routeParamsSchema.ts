/**
 * @fileoverview Zod validation schema and TypeScript type for customer review moderation log route parameters.
 */

import {z} from "zod"
import {IDStringSchema} from "@/common/_schemas";

/** Zod schema for validating customer review log route parameters. */
export const CustomerReviewLogsRouteParamsSchema = z.object({
    customerID: IDStringSchema,
    reviewID: IDStringSchema,
})

/** Type definition inferred from the customer review logs route parameters schema. */
export type CustomerReviewLogsRouteParams = z.infer<typeof CustomerReviewLogsRouteParamsSchema>