/**
 * @file Extended movie credit schemas with populated movie and role type relations,
 * excluding person details.
 * @filename CreditExceptPerson.schema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";
import {
    MovieCreditCastSchema,
    MovieCreditCrewSchema
} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/**
 * Relation fields populated while preserving person as an identifier.
 */
const detailsExceptPersonExtension = {
    person: IDStringSchema,
    movie: z.lazy(() => MovieSchema),
    roleType: z.lazy(() => RoleTypeSchema),
};

/** Crew credit schema with partially populated relations. */
export const CrewCreditExceptPersonSchema =
    MovieCreditCrewSchema.extend(detailsExceptPersonExtension);

/** Cast credit schema with partially populated relations. */
export const CastCreditExceptPersonSchema =
    MovieCreditCastSchema.extend(detailsExceptPersonExtension);

/**
 * Discriminated union schema for partially populated credit details.
 */
export const CreditExceptPersonSchema = z.discriminatedUnion(
    "department",
    [
        CrewCreditExceptPersonSchema,
        CastCreditExceptPersonSchema,
    ]
);