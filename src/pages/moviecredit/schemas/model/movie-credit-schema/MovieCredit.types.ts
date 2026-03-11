/**
 * @file Inferred types for cast and crew movie credit schemas.
 * @filename MovieCredit.types.ts
 */

import {z} from "zod";
import {
    MovieCreditCastSchema,
    MovieCreditCrewSchema,
    MovieCreditSchema,
} from "@/pages/moviecredit/schemas/model/movie-credit-schema/MovieCredit.schema.ts";

/** Crew movie credit type. */
export type CrewMovieCredit = z.infer<typeof MovieCreditCrewSchema>;

/** Cast movie credit type. */
export type CastMovieCredit = z.infer<typeof MovieCreditCastSchema>;

/** Union type for movie credits. */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;