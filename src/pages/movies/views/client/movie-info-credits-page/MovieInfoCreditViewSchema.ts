/**
 * @file Schema for movie credits page view data.
 * @filename MovieInfoCreditViewSchema.ts
 */

import {z} from "zod";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {
    CastCreditExceptMovieSchema
} from "@/pages/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.schema.ts";
import {
    GroupedCrewCreditsExceptMovieSchema
} from "@/pages/moviecredit/schemas/model/movie-credit-related-schema/MovieCreditRelated.schema.ts";

/**
 * View schema combining movie details with grouped cast and crew credits.
 */
export const MovieInfoCreditViewSchema = z.object({
    movie: MovieDetailsSchema,
    creditDetails: z.object({
        castCredits: generateArraySchema(CastCreditExceptMovieSchema),
        crewCredits: generateArraySchema(GroupedCrewCreditsExceptMovieSchema),
    }),
});

/** Inferred type for movie credits page view data. */
export type MovieInfoCreditViewData = z.infer<typeof MovieInfoCreditViewSchema>;