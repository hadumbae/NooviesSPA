/**
 * @fileoverview Extended movie credit schemas with populated person and role type relations, excluding movie details.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {RoleTypeSchema} from "@/domains/roletypes/_schema/model/RoleTypeSchema.ts";
import {MovieCreditCastSchema, MovieCreditCrewSchema} from "@/domains/movie-credits/_schemas/model/MovieCreditSchema.ts";

import {PersonSchema} from "@/domains/persons/_schema/person/PersonSchema";

/**
 * Relation fields populated while preserving movie as an identifier.
 */
const detailsExceptMovieExtension = {
    person: z.lazy(() => PersonSchema),
    movie: IDStringSchema,
    roleType: z.lazy(() => RoleTypeSchema),
};

/** Crew credit schema with partially populated relations excluding movie details. */
export const CrewCreditExceptMovieSchema =
    MovieCreditCrewSchema.extend(detailsExceptMovieExtension);

/** Crew credit with populated relations excluding movie details. */
export type CrewCreditExceptMovie = z.infer<typeof CrewCreditExceptMovieSchema>;

/** Cast credit schema with partially populated relations excluding movie details. */
export const CastCreditExceptMovieSchema =
    MovieCreditCastSchema.extend(detailsExceptMovieExtension);

/** Cast credit with populated relations excluding movie details. */
export type CastCreditExceptMovie = z.infer<typeof CastCreditExceptMovieSchema>;

/** Discriminated union schema for partially populated credit details. */
export const CreditExceptMovieSchema = z.discriminatedUnion(
    "department",
    [
        CrewCreditExceptMovieSchema,
        CastCreditExceptMovieSchema,
    ]
);

/** Union type for partially populated credit details excluding movie. */
export type CreditExceptMovie = z.infer<typeof CreditExceptMovieSchema>;