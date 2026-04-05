/**
 * @file Zod schema and type for paginated personal movie reviews.
 * @filename MyMovieReviewPaginatedSchema.ts
 */

import {z} from "zod";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {MyMovieReviewSchema} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewSchema.ts";

/**
 * Validated pagination wrapper for the author's movie reviews.
 * ---
 */
export const MyMovieReviewPaginatedSchema = generatePaginationSchema(MyMovieReviewSchema);

/**
 * TypeScript type inferred from {@link MyMovieReviewPaginatedSchema}.
 * Used for managing paginated state in the "My Reviews" dashboard.
 */
export type MyPaginatedMovieReviews = z.infer<typeof MyMovieReviewPaginatedSchema>;