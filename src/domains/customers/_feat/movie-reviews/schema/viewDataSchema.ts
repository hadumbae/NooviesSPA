/**
 * @fileoverview Zod schema and type definition for the Customer Reviews paginated view.
 */

import { LeanUserWithEmailSchema } from "@/domains/users/schemas/user";
import { generatePaginationSchema } from "@/common/_feat/validation-builders";
import { z } from "zod";
import { CustomerMovieReviewSummarySchema } from "@/domains/movieReviews/schemas";

/** Validates the aggregated response for a customer's full review history. */
export const CustomerReviewsViewDataSchema = z.object({
  customer: LeanUserWithEmailSchema,
  reviews: generatePaginationSchema(CustomerMovieReviewSummarySchema),
});

/** Data structure for the customer reviews view. */
export type CustomerReviewsViewData = z.infer<
  typeof CustomerReviewsViewDataSchema
>;