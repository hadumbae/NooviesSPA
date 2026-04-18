/**
 * @fileoverview Extended movie credit schemas with populated movie and role type relations.
 * This schema excludes detailed person information, preserving the person field as a
 * simple identifier. This is ideal for person-centric views where the person's identity
 * is already known.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {RoleTypeSchema} from "@/domains/roletype/schema/model/RoleType.schema.ts";
import {MovieCreditCastSchema, MovieCreditCrewSchema} from "@/domains/moviecredit/schemas/model/MovieCreditSchema.ts";
import {MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

/**
 * Extension fields that define the hydration state of the credit.
 */
const detailsExceptPersonExtension = {
    person: IDStringSchema,
    movie: z.lazy(() => MovieSchema),
    roleType: z.lazy(() => RoleTypeSchema),
};

/**
 * Crew credit schema with partially populated relations.
 */
export const PersonCrewCreditSchema =
    MovieCreditCrewSchema.extend(detailsExceptPersonExtension);

/**
 * Cast credit schema with partially populated relations.
 */
export const PersonCastCreditSchema =
    MovieCreditCastSchema.extend(detailsExceptPersonExtension);

/**
 * Discriminated union schema for partially populated credit details.
 */
export const PersonCreditSchema = z.discriminatedUnion(
    "department",
    [
        PersonCrewCreditSchema,
        PersonCastCreditSchema,
    ]
);

/** Represents a crew credit with populated movie/role details but raw person ID. */
export type PersonCrewCredit = z.infer<typeof PersonCrewCreditSchema>;

/** Represents a cast credit with populated movie/role details but raw person ID. */
export type PersonCastCredit = z.infer<typeof PersonCastCreditSchema>;

/** Represents a union type for credits used in person-specific data aggregations. */
export type PersonCredit = z.infer<typeof PersonCreditSchema>;