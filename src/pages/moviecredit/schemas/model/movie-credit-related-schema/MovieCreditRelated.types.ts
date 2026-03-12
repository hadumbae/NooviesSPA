/**
 * @file Inferred types for movie credit related schemas.
 * @filename MovieCreditRelated.types.ts
 */

import {z} from "zod";
import {
    GroupedCrewCreditsExceptMovieSchema,
    MovieCreditArraySchema,
    MovieCreditDetailsArraySchema,
    PaginatedMovieCreditDetailsSchema,
    PaginatedMovieCreditSchema
} from "@/pages/moviecredit/schemas/model/movie-credit-related-schema/MovieCreditRelated.schema.ts";

/** Array of movie credits. */
export type MovieCreditArray = z.infer<typeof MovieCreditArraySchema>;

/** Array of detailed movie credits. */
export type MovieCreditDetailsArray = z.infer<typeof MovieCreditDetailsArraySchema>;

/** Paginated movie credits response. */
export type PaginatedMovieCredit = z.infer<typeof PaginatedMovieCreditSchema>;

/** Paginated detailed movie credits response. */
export type PaginatedMovieCreditDetails = z.infer<typeof PaginatedMovieCreditDetailsSchema>;

/** Crew credits grouped by category excluding movie relation details. */
export type GroupedCrewCreditsExceptMovie = z.infer<typeof GroupedCrewCreditsExceptMovieSchema>;