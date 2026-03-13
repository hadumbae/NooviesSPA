/**
 * @file Base and discriminated schemas for cast and crew movie credits.
 * @filename MovieCredit.schema.ts
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {UndefinedForCrewSchema} from "@/domains/moviecredit/schemas/model/movie-credit-schema/MovieCreditCrewSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Base schema shared by cast and crew credits.
 */
export const MovieCreditBaseSchema = z.object({
    /** Unique credit identifier */
    _id: IDStringSchema.readonly(),

    /** URL-friendly identifier */
    slug: NonEmptyStringSchema.max(75, "Must be 75 characters or less."),

    /** Credit department classification */
    department: RoleTypeDepartmentEnumSchema,

    /** Optional role display name */
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),

    /** Optional credited name */
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ),

    /** Indicates uncredited participation */
    uncredited: CoercedBooleanValueSchema.optional(),

    /** Optional credit notes */
    notes: NonEmptyStringSchema.nullable().optional(),

    /** Associated movie identifier */
    movie: IDStringSchema,

    /** Associated person identifier */
    person: IDStringSchema,

    /** Associated role type identifier */
    roleType: IDStringSchema,
});

/** Crew credit schema. */
export const MovieCreditCrewSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CREW"),

    billingOrder: UndefinedForCrewSchema,
    characterName: UndefinedForCrewSchema,
    isPrimary: UndefinedForCrewSchema,
    voiceOnly: UndefinedForCrewSchema,
    cameo: UndefinedForCrewSchema,
    motionCapture: UndefinedForCrewSchema,
    archiveFootage: UndefinedForCrewSchema,
});

/** Cast credit schema. */
export const MovieCreditCastSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CAST"),

    /** Character portrayed */
    characterName: NonEmptyStringSchema,

    /** Optional billing priority */
    billingOrder: PositiveNumberSchema.optional(),

    /** Indicates primary cast status */
    isPrimary: CoercedBooleanValueSchema,

    voiceOnly: CoercedBooleanValueSchema,
    cameo: CoercedBooleanValueSchema,
    motionCapture: CoercedBooleanValueSchema,
    archiveFootage: CoercedBooleanValueSchema,
});

/** Discriminated union of movie credit variants. */
export const MovieCreditSchema = z.discriminatedUnion("department", [
    MovieCreditCrewSchema,
    MovieCreditCastSchema,
]);