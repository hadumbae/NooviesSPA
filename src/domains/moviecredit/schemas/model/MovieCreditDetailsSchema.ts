/**
 * @fileoverview Extended schemas for movie credits with populated relation details.
 * Contains the schema definitions for credits that include full object models for
 * movies, persons, and role types instead of just their identifiers.
 */

import {z} from "zod";
import {PersonSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";
import {MovieCreditCastSchema, MovieCreditCrewSchema} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/**
 * Extension fields representing populated database relations.
 */
const detailsExtension = {
    movie: z.lazy(() => MovieSchema),
    person: z.lazy(() => PersonSchema),
    roleType: z.lazy(() => RoleTypeSchema),
};

/**
 * Crew credit schema with populated relation objects.
 */
export const MovieCreditDetailsCrewSchema = MovieCreditCrewSchema.extend(detailsExtension);

/**
 * Cast credit schema with populated relation objects.
 */
export const MovieCreditDetailsCastSchema = MovieCreditCastSchema.extend(detailsExtension);

/**
 * Discriminated union schema for populated movie credit details.
 */
export const MovieCreditDetailsSchema = z.discriminatedUnion(
    "department",
    [MovieCreditDetailsCrewSchema, MovieCreditDetailsCastSchema],
);

/** Represents a validated crew credit with populated relations. */
export type MovieCreditDetailsCrew = z.infer<typeof MovieCreditDetailsCrewSchema>;

/** Represents a validated cast credit with populated relations. */
export type MovieCreditDetailsCast = z.infer<typeof MovieCreditDetailsCastSchema>;

/** Represents a union type of all populated movie credit variants. */
export type MovieCreditDetails = z.infer<typeof MovieCreditDetailsSchema>;