import {z} from "zod";
import {
    MovieCreditArraySchema,
    MovieCreditDetailsArraySchema,
    PaginatedMovieCreditDetailsSchema,
    PaginatedMovieCreditSchema
} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";

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