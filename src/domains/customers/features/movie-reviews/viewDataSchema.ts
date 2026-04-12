/**
 * @file Zod schema and type definition for the Customer Reviews paginated view.
 * @filename viewDataSchema.ts
 */

import {LeanUserWithEmailSchema} from "@/domains/users/schemas/user";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {
    CustomerMovieReviewSummarySchema
} from "@/domains/review/schemas/models/customer-movie-reviews/CustomerMovieReviewSummarySchema.ts";
import {z} from "zod";

/**
 * Validates the aggregated response for a customer's full review history.
 * ---
 */
export const CustomerReviewsViewDataSchema = z.object({
    /** The validated profile information of the review author. */
    customer: LeanUserWithEmailSchema,

    /** A paginated collection of review summaries with hydrated movie details. */
    reviews: generatePaginationSchema(CustomerMovieReviewSummarySchema),
});

/**
 * TypeScript type inferred from the CustomerReviewsViewDataSchema.
 */
export type CustomerReviewsViewData = z.infer<typeof CustomerReviewsViewDataSchema>;