import { z } from "zod";
import {
    MovieCreditArraySchema,
    MovieCreditDetailsArraySchema,
    MovieCreditDetailsSchema,
    MovieCreditSchema,
    PaginatedMovieCreditDetailsSchema,
    PaginatedMovieCreditSchema,
} from "@/pages/moviecredit/schemas/model/MovieCredit.schema.ts";

/**
 * Type representing a single movie credit (CREW or CAST) with ID references.
 */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;

/**
 * Type representing a single detailed movie credit (CREW or CAST)
 * with full objects for `movie`, `person`, and `roleType`.
 */
export type MovieCreditDetails = z.infer<typeof MovieCreditDetailsSchema>;

/**
 * Type representing an array of movie credits.
 */
export type MovieCreditArray = z.infer<typeof MovieCreditArraySchema>;

/**
 * Type representing an array of detailed movie credits.
 */
export type MovieCreditDetailsArray = z.infer<typeof MovieCreditDetailsArraySchema>;

/**
 * Type representing a paginated response of movie credits.
 */
export type PaginatedMovieCredit = z.infer<typeof PaginatedMovieCreditSchema>;

/**
 * Type representing a paginated response of detailed movie credits.
 */
export type PaginatedMovieCreditDetails = z.infer<typeof PaginatedMovieCreditDetailsSchema>;
