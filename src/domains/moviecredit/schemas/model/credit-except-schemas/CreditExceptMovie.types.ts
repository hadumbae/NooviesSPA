/**
 * @file Inferred types for partially populated movie credit schemas excluding movie details.
 * @filename CreditExceptMovie.types.ts
 */

import {z} from "zod";
import {
    CastCreditExceptMovieSchema,
    CreditExceptMovieSchema,
    CrewCreditExceptMovieSchema
} from "@/domains/moviecredit/schemas/model/credit-except-schemas/CreditExceptMovie.schema.ts";

/** Crew credit with populated relations excluding movie details. */
export type CrewCreditExceptMovie = z.infer<typeof CrewCreditExceptMovieSchema>;

/** Cast credit with populated relations excluding movie details. */
export type CastCreditExceptMovie = z.infer<typeof CastCreditExceptMovieSchema>;

/** Union type for partially populated credit details excluding movie. */
export type CreditExceptMovie = z.infer<typeof CreditExceptMovieSchema>;