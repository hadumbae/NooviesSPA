/**
 * @file MovieCreditQueryOptions.schema.ts
 * @summary
 * Zod schemas for validating movie credit query parameters.
 *
 * @description
 * Provides composable schemas for filtering and sorting movie credit
 * list/search endpoints.
 *
 * Design goals:
 * - Safe parsing of URL query parameters
 * - Explicit constraints for IDs, strings, numbers, and booleans
 * - MongoDB-compatible sort semantics
 *
 * These schemas are intended to sit at the API boundary, before
 * translation into aggregation stages such as `$match` and `$sort`.
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Match-level filters for MovieCredit queries.
 *
 * @remarks
 * These filters map directly to fields on the MovieCredit model and are
 * typically converted into MongoDB `$match` conditions.
 *
 * All properties are optional and may be freely combined.
 */
export const MovieCreditQueryMatchFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    movie: IDStringSchema.optional(),
    person: IDStringSchema.optional(),
    roleType: IDStringSchema.optional(),
    department: RoleTypeDepartmentEnumSchema.optional(),
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
 * Sort options for MovieCredit queries.
 *
 * @remarks
 * Each field represents a sortable attribute and accepts a
 * {@link MongooseSortOrderSchema} value (`asc` or `desc`).
 */
export const MovieCreditQueryMatchSortsSchema = z.object({
    sortByCreditedAs: MongooseSortOrderSchema.optional(),
    sortByCharacterName: MongooseSortOrderSchema.optional(),
    sortByBillingOrder: MongooseSortOrderSchema.optional(),
});

/**
 * Reference-level filters for MovieCredit queries.
 *
 * @remarks
 * These filters apply to fields resolved via lookups or joins
 * (e.g. movie slug, role name).
 */
export const MovieCreditQueryReferenceFiltersSchema = z.object({
    movieSlug: NonEmptyStringSchema.optional(),
    roleName: NonEmptyStringSchema.optional(),
});

/**
 * Combined filter schema for MovieCredit queries.
 *
 * @remarks
 * Merges match-level and reference-level filters into a single schema.
 */
export const MovieCreditQueryFiltersSchema =
    MovieCreditQueryMatchFiltersSchema.merge(MovieCreditQueryReferenceFiltersSchema);

/**
 * Full query options schema for MovieCredit list endpoints.
 *
 * @remarks
 * Combines filtering and sorting parameters for validating raw
 * query strings.
 */
export const MovieCreditQueryOptionsSchema =
    MovieCreditQueryFiltersSchema.merge(MovieCreditQueryMatchSortsSchema);
