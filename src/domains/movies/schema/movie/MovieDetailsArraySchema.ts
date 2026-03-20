/**
 * @file Validation schema for a collection of detailed Movie records.
 * @filename MovieDetailsArraySchema.ts
 */

import {z} from "zod";
import {MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/**
 * Zod schema defining an array of {@link MovieDetailsSchema} objects.
 * * * **Usage:** Primarily used to validate API responses for movie listing pages
 * that require pre-populated genre metadata and rich movie details.
 */
export const MovieDetailsArraySchema = z.array(MovieDetailsSchema);

/**
 * TypeScript type inferred from {@link MovieDetailsArraySchema}.
 * * Represents a collection of {@link MovieDetails} objects, where each item
 * contains fully resolved relational data.
 */
export type MovieDetailsArray = z.infer<typeof MovieDetailsArraySchema>;