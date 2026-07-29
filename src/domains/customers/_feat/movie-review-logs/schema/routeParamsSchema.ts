/**
 * @fileoverview Zod validation schema and TypeScript type for customer review moderation log route parameters.
 */

import {z} from "zod"
import {CustomerReviewRouteParamsSchema} from "@/domains/customers/_feat/movie-review";

/** Zod schema for validating customer review log route parameters. */
export const CustomerReviewLogsRouteParamsSchema = CustomerReviewRouteParamsSchema.extend({});

/** Type definition inferred from the customer review logs route parameters schema. */
export type CustomerReviewLogsRouteParams = z.infer<typeof CustomerReviewLogsRouteParamsSchema>