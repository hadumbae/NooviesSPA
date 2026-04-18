/**
 * @fileoverview Base and discriminated schemas for cast and crew movie credits.
 * Defines the validation logic and TypeScript types for movie participation records.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {
    UndefinedForCrewFieldSchema
} from "@/domains/moviecredit/schemas/model/UndefinedForCrewFieldSchema.ts";

/**
 * Base schema shared by cast and crew credits.
 */
export const MovieCreditBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    slug: NonEmptyStringSchema.max(75, "Must be 75 characters or less."),
    department: RoleTypeDepartmentEnumSchema,
    displayRoleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ).optional(),
    creditedAs: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, "Must be 150 characters or less.").optional()
    ).optional(),
    uncredited: CoercedBooleanValueSchema.optional(),
    notes: NonEmptyStringSchema.nullable().optional(),
    movie: IDStringSchema,
    person: IDStringSchema,
    roleType: IDStringSchema,
});

/**
 * Schema for non-performance based credits (e.g., Directing, Production).
 */
export const MovieCreditCrewSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CREW"),
    billingOrder: UndefinedForCrewFieldSchema,
    characterName: UndefinedForCrewFieldSchema,
    isPrimary: UndefinedForCrewFieldSchema,
    voiceOnly: UndefinedForCrewFieldSchema,
    cameo: UndefinedForCrewFieldSchema,
    motionCapture: UndefinedForCrewFieldSchema,
    archiveFootage: UndefinedForCrewFieldSchema,
});

/**
 * Schema for performance-based credits.
 */
export const MovieCreditCastSchema = MovieCreditBaseSchema.extend({
    department: z.literal("CAST"),
    characterName: NonEmptyStringSchema,
    billingOrder: PositiveNumberSchema.optional(),
    isPrimary: CoercedBooleanValueSchema,
    voiceOnly: CoercedBooleanValueSchema,
    cameo: CoercedBooleanValueSchema,
    motionCapture: CoercedBooleanValueSchema,
    archiveFootage: CoercedBooleanValueSchema,
});

/**
 * Discriminated union of movie credit variants.
 */
export const MovieCreditSchema = z.discriminatedUnion("department", [
    MovieCreditCrewSchema,
    MovieCreditCastSchema,
]);

/** Represents a validated crew movie credit. */
export type CrewMovieCredit = z.infer<typeof MovieCreditCrewSchema>;

/** Represents a validated cast movie credit. */
export type CastMovieCredit = z.infer<typeof MovieCreditCastSchema>;

/** Represents a validated movie credit (either cast or crew). */
export type MovieCredit = z.infer<typeof MovieCreditSchema>;