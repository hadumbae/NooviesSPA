/**
 * @file Inferred types for populated movie credit detail schemas.
 * @filename MovieCreditDetails.types.ts
 */

import {z} from "zod";
import {
    MovieCreditDetailsCastSchema,
    MovieCreditDetailsCrewSchema,
    MovieCreditDetailsSchema
} from "@/domains/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.schema.ts";

/** Crew credit with populated relation objects. */
export type MovieCreditDetailsCrew = z.infer<typeof MovieCreditDetailsCrewSchema>;

/** Cast credit with populated relation objects. */
export type MovieCreditDetailsCast = z.infer<typeof MovieCreditDetailsCastSchema>;

/** Union type for populated movie credit details. */
export type MovieCreditDetails = z.infer<typeof MovieCreditDetailsSchema>;