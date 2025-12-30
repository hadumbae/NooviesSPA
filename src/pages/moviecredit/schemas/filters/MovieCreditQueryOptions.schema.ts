/**
 * @file MovieCreditQueryOptions.schema.ts
 * @description
 * Zod schemas for filtering and sorting movie credit queries.
 *
 * Designed for use with query parameter validation on list and search endpoints.
 */
import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Defines filter parameters for movie credit queries.
 *
 * All fields are optional and may be combined freely.
 *
 * Supported filters include:
 * - Identifiers (`_id`, `movie`, `person`, `roleType`)
 * - Department classification (`CAST` / `CREW`)
 * - Text-based fields (names and titles)
 * - Billing and credit flags
 */
export const MovieCreditQueryFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    movie: IDStringSchema.optional(),
    movieSlug: NonEmptyStringSchema.optional(),
    person: IDStringSchema.optional(),
    roleType: IDStringSchema.optional(),
    department: RoleTypeDepartmentEnumSchema.optional(),
    name: NonEmptyStringSchema
        .min(3, {message: "Must be at least 3 characters."})
        .max(255, {message: "Must be 255 characters or less."})
        .optional(),
    title: NonEmptyStringSchema
        .max(255, {message: "Must be 255 characters or less."})
        .optional(),
    displayRoleName: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
    creditedAs: NonEmptyStringSchema
        .max(150, {message: "Must be 150 characters or less."})
        .optional(),
    characterName: NonEmptyStringSchema.optional(),
    billingOrder: PositiveNumberSchema.optional(),
    uncredited: CoercedBooleanValueSchema.optional(),
    voiceOnly: CoercedBooleanValueSchema.optional(),
    cameo: CoercedBooleanValueSchema.optional(),
    motionCapture: CoercedBooleanValueSchema.optional(),
    isPrimary: CoercedBooleanValueSchema.optional(),
    archiveFootage: CoercedBooleanValueSchema.optional(),
});

/**
 * Defines sorting parameters for movie credit queries.
 *
 * Each field maps to a sortable property and uses
 * {@link MongooseSortOrderSchema} (`asc` or `desc`).
 */
export const MovieCreditQuerySortsSchema = z.object({
    sortByMovie: MongooseSortOrderSchema.optional(),
    sortByPerson: MongooseSortOrderSchema.optional(),
    sortByRoleType: MongooseSortOrderSchema.optional(),
    sortByDepartment: MongooseSortOrderSchema.optional(),
    sortByCreditedAs: MongooseSortOrderSchema.optional(),
    sortByCharacterName: MongooseSortOrderSchema.optional(),
    sortByBillingOrder: MongooseSortOrderSchema.optional(),
    sortByUncredited: MongooseSortOrderSchema.optional(),
    sortByVoiceOnly: MongooseSortOrderSchema.optional(),
    sortByCameo: MongooseSortOrderSchema.optional(),
    sortByMotionCapture: MongooseSortOrderSchema.optional(),
    sortByIsPrimary: MongooseSortOrderSchema.optional(),
    sortByArchiveFootage: MongooseSortOrderSchema.optional(),
});

/**
 * Combined schema for movie credit query options.
 *
 * Merges filtering and sorting parameters into a single schema
 * suitable for validating query strings.
 */
export const MovieCreditQueryOptionsSchema =
    MovieCreditQueryFiltersSchema.merge(MovieCreditQuerySortsSchema);
