import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Schema for filtering movie credit queries.
 *
 * All fields are optional.
 * Includes filters by:
 * - IDs (`_id`, `movie`, `person`, `roleType`)
 * - department (`CREW` or `CAST`)
 * - names (`name`, `title`, `displayRoleName`, `creditedAs`, `characterName`)
 * - billing and status fields (`billingOrder`, `uncredited`, `voiceOnly`, `cameo`, `motionCapture`, `isPrimary`, `archiveFootage`)
 */
export const MovieCreditQueryFiltersSchema = z.object({
    _id: IDStringSchema.optional(),
    movie: IDStringSchema.optional(),
    person: IDStringSchema.optional(),
    roleType: IDStringSchema.optional(),
    department: RoleTypeDepartmentEnumSchema.optional(),
    name: NonEmptyStringSchema.min(3, {message: "Must be at least 3 characters."}).max(255, {message: "Must be 255 characters or less."}).optional(),
    title: NonEmptyStringSchema.max(255, {message: "Must be 255 characters or less."}).optional(),
    displayRoleName: NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional(),
    creditedAs: NonEmptyStringSchema.max(150, {message: "Must be 150 characters or less."}).optional(),
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
 * Schema for sorting movie credit queries.
 *
 * Each field corresponds to a sortable property.
 * Uses `MongooseSortOrderSchema` (`asc` or `desc`) and is optional.
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
 * Merges filters and sorting options into a single schema for query parameters.
 */
export const MovieCreditQueryOptionsSchema = MovieCreditQueryFiltersSchema.merge(MovieCreditQuerySortsSchema);
