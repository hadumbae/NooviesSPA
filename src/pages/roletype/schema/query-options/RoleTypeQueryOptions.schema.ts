import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Zod schema for initial form values of the RoleType query options form.
 *
 * This schema is used to populate a form with default/empty values before submission.
 *
 * Fields:
 * - `department`: Initial value for the department filter.
 * - `roleName`: Initial value for the role name filter.
 * - `sortByRoleName`: Initial value for the role name sort option.
 * - `sortByDepartment`: Initial value for the department sort option.
 */
export const RoleTypeQueryOptionsFormValuesSchema = z.object({
    department: FormStarterValueSchema,
    roleName: FormStarterValueSchema,
    sortByRoleName: FormStarterValueSchema,
    sortByDepartment: FormStarterValueSchema,
});

/**
 * Zod schema for filtering RoleType queries.
 *
 * Fields:
 * - `department`: The department to filter by. Empty string is treated as `undefined`.
 * - `roleName`: The role name to filter by, with a max length of 150 characters. Empty string is treated as `undefined`.
 */
export const RoleTypeQueryFiltersSchema = z.object({
    department: preprocessEmptyStringToUndefined(
        RoleTypeDepartmentEnumSchema
    ),

    roleName: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.max(150, { message: "Must be 150 characters or less." })
    ),
});

/**
 * Zod schema for sorting RoleType queries.
 *
 * Fields:
 * - `sortByRoleName`: Sort order for the `roleName` field (`asc` or `desc`). Empty string is treated as `undefined`.
 * - `sortByDepartment`: Sort order for the `department` field (`asc` or `desc`). Empty string is treated as `undefined`.
 */
export const RoleTypeQuerySortsSchema = z.object({
    sortByRoleName: preprocessEmptyStringToUndefined(MongooseSortOrderSchema),
    sortByDepartment: preprocessEmptyStringToUndefined(MongooseSortOrderSchema),
});

/**
 * Zod schema for full RoleType query options, combining filters and sort options.
 *
 * This schema merges `RoleTypeQueryFiltersSchema` and `RoleTypeQuerySortsSchema`,
 * so it includes all filter and sort fields. Empty strings are treated as `undefined`.
 */
export const RoleTypeQueryOptionsSchema = RoleTypeQueryFiltersSchema.merge(RoleTypeQuerySortsSchema);
