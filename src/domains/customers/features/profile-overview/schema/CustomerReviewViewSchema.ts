/**
 * @file Client-side Zod schema for validating the aggregated Customer Review View data.
 * @filename CustomerReviewViewSchema.ts
 */

import {z} from "zod";
import {LeanUserWithEmailSchema} from "@/domains/users/schemas/user";
import {CustomerMovieReviewSchema} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSchema.ts";

/**
 * Zod validation schema for the customer-review pair used in moderation views.
 * ---
 */
export const CustomerReviewViewSchema = z.object({
   /** The author of the review, including contact information for administrative follow-up. */
   customer: LeanUserWithEmailSchema,
   /** The specific movie review content, including moderation history and ratings. */
   review: CustomerMovieReviewSchema,
});

/**
 * TypeScript type inferred from the {@link CustomerReviewViewSchema}.
 * Use this for typing props and state in administrative review detail pages.
 */
export type CustomerReviewViewData = z.infer<typeof CustomerReviewViewSchema>;