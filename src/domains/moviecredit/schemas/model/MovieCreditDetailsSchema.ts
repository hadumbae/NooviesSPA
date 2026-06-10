/**
 * @fileoverview Extended schemas for movie credits with populated relation details.
 */
import {z} from "zod";
import {PersonSchema} from "@/domains/persons/schema/person/Person.schema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleTypeSchema.ts";
import {MovieCreditCastSchema, MovieCreditCrewSchema} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";

/**
 * Zod shape for populated movie credit relations.
 */
const detailsExtension = {
    movie: z.lazy(() => MovieWithGenresSchema),
    person: z.lazy(() => PersonSchema),
    roleType: z.lazy(() => RoleTypeSchema),
};

/** Crew credit schema with populated relation objects. */
export const MovieCreditDetailsCrewSchema = MovieCreditCrewSchema.extend(detailsExtension);

/** Cast credit schema with populated relation objects. */
export const MovieCreditDetailsCastSchema = MovieCreditCastSchema.extend(detailsExtension);

/** Discriminated union schema for populated movie credit details. */
export const MovieCreditDetailsSchema = z.discriminatedUnion(
    "department",
    [MovieCreditDetailsCrewSchema, MovieCreditDetailsCastSchema],
);

/** Validated crew credit with populated relations. */
export type MovieCreditDetailsCrew = z.infer<typeof MovieCreditDetailsCrewSchema>;

/** Validated cast credit with populated relations. */
export type MovieCreditDetailsCast = z.infer<typeof MovieCreditDetailsCastSchema>;

/** Union type of all populated movie credit variants. */
export type MovieCreditDetails = z.infer<typeof MovieCreditDetailsSchema>;