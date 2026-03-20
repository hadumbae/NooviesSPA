/**
 * @file Extended schemas for movie credits with populated relation details.
 * @filename MovieCreditDetails.schema.ts
 */

import {z} from "zod";
import {PersonSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";
import {
    MovieCreditCastSchema,
    MovieCreditCrewSchema
} from "@/domains/moviecredit/schemas/model/movie-credit-schema/MovieCredit.schema.ts";
import {MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/**
 * Populated relation fields added to base movie credit schemas.
 */
const detailsExtension = {
    movie: z.lazy(() => MovieSchema),
    person: z.lazy(() => PersonSchema),
    roleType: z.lazy(() => RoleTypeSchema),
};

/** Crew credit schema with populated relation objects. */
export const MovieCreditDetailsCrewSchema = MovieCreditCrewSchema.extend(detailsExtension);

/** Cast credit schema with populated relation objects. */
export const MovieCreditDetailsCastSchema = MovieCreditCastSchema.extend(detailsExtension);

/**
 * Discriminated union schema for populated movie credit details.
 */
export const MovieCreditDetailsSchema = z.discriminatedUnion(
    "department",
    [MovieCreditDetailsCrewSchema, MovieCreditDetailsCastSchema],
);