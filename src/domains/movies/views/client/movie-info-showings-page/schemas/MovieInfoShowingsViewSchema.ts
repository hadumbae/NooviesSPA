/**
 * @file Aggregated schema for movie details and paginated showings.
 * @filename MovieInfoShowingsViewSchema.ts
 */

import { z } from "zod";
import { MovieDetailsSchema } from "@/domains/movies/schema/movie/Movie.schema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import { PopulatedShowingSchema } from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";

/**
 * Zod schema combining {@link MovieDetailsSchema} and paginated {@link PopulatedShowingSchema}.
 */
export const MovieInfoShowingsViewSchema = z.object({
    /** {@link MovieDetailsSchema} */
    movie: MovieDetailsSchema,

    /** Paginated results via {@link generatePaginationSchema}. */
    showingDetails: generatePaginationSchema(PopulatedShowingSchema),
});

/**
 * Inferred type from {@link MovieInfoShowingsViewSchema}.
 */
export type MovieInfoShowingsViewData = z.infer<typeof MovieInfoShowingsViewSchema>;