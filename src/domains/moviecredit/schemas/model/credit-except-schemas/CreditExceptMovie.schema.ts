/**
 * @file Extended movie credit schemas with populated person and role type relations,
 * excluding movie details.
 * @filename CreditExceptMovie.schema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";
import {
    MovieCreditCastSchema,
    MovieCreditCrewSchema
} from "@/domains/moviecredit/schemas/model/movie-credit-schema/MovieCredit.schema.ts";
import {PersonSchema} from "@/domains/persons/schema/person/Person.schema.ts";

/**
 * Relation fields populated while preserving movie as an identifier.
 */
const detailsExceptMovieExtension = {
    person: z.lazy(() => PersonSchema),
    movie: IDStringSchema,
    roleType: z.lazy(() => RoleTypeSchema),
};

/** Crew credit schema with partially populated relations. */
export const CrewCreditExceptMovieSchema =
    MovieCreditCrewSchema.extend(detailsExceptMovieExtension);

/** Cast credit schema with partially populated relations. */
export const CastCreditExceptMovieSchema =
    MovieCreditCastSchema.extend(detailsExceptMovieExtension);

/**
 * Discriminated union schema for partially populated credit details.
 */
export const CreditExceptMovieSchema = z.discriminatedUnion(
    "department",
    [
        CrewCreditExceptMovieSchema,
        CastCreditExceptMovieSchema,
    ]
);