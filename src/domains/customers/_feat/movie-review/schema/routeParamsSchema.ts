/**
 * @fileoverview Zod validation schema for URL parameters in customer review detail views.
 *
 */

import {z} from "zod";
import {UserUniqueCodeSchema} from "@/domains/users/_schema/fields/UserUniqueCodeSchema.ts";
import {MovieReviewUniqueCodeSchema} from "@/domains/movie-reviews/_schema/fields";

/** Validation schema for identifying a specific review within a customer's scope via URL. */
export const CustomerReviewRouteParamsSchema = z.object({
    uniqueCode: UserUniqueCodeSchema,
    reviewCode: MovieReviewUniqueCodeSchema,
});

/** Type inferred from CustomerReviewRouteParamsSchema for use with useParams hooks. */
export type CustomerReviewRouteParams = z.infer<typeof CustomerReviewRouteParamsSchema>;