/**
 * @fileoverview Zod schema for validating aggregated customer review view data.
 */

import {z} from "zod";
import {LeanUserWithEmailSchema} from "@/domains/users/schemas/user";
import {CustomerMovieReviewSchema} from "@/domains/movieReviews/schemas/customer-reviews";

/** Zod validation schema for the customer-review pair used in moderation views. */
export const CustomerReviewViewSchema = z.object({
    customer: LeanUserWithEmailSchema,
    review: CustomerMovieReviewSchema,
});

/** TypeScript type inferred from the CustomerReviewViewSchema. */
export type CustomerReviewViewData = z.infer<typeof CustomerReviewViewSchema>;
