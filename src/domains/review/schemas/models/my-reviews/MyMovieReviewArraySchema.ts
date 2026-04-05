/**
 * @file Zod schema and type for a collection of the user's personal movie reviews.
 * @filename MyMovieReviewArraySchema.ts
 */

import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {MyMovieReviewSchema} from "@/domains/review/schemas/models/my-reviews/MyMovieReviewSchema.ts";
import {z} from "zod";

/**
 * Standardized array schema for the "My Reviews" collection.
 * ---
 */
export const MyMovieReviewArraySchema = generateArraySchema(MyMovieReviewSchema);

/**
 * TypeScript type inferred from {@link MyMovieReviewArraySchema}.
 * Represents a list of enriched reviews authored by the current user.
 */
export type MyMovieReviewsArray = z.infer<typeof MyMovieReviewArraySchema>;