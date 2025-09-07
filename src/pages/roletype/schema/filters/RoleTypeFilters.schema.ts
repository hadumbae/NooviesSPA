import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";

/**
 * Zod schema for filtering `RoleType` records in queries.
 *
 * Fields are optional and can be used to narrow down results:
 * - `roleName`: Filter by role name (string, max 150 characters).
 * - `department`: Filter by department (`"CAST"` or `"CREW"`).
 *
 * @example
 * ```ts
 * const filters = RoleTypeQueryFiltersSchema.parse({
 *   roleName: "Actor",
 *   department: "CAST"
 * });
 * ```
 */
export const RoleTypeQueryFiltersSchema = z.object({
    /** Filter by role name (max 150 characters). */
    roleName: NonEmptyStringSchema.max(150, { message: "Must be 150 characters or less." }).optional(),

    /** Filter by department, must be `"CAST"` or `"CREW"`. */
    department: RoleTypeDepartmentEnumSchema.optional(),
});

/**
 * Zod schema for specifying sort order in `RoleType` queries.
 *
 * Fields are optional and determine the sorting direction of query results.
 * Each field accepts a value defined by {@link MongooseSortOrderSchema}
 * (typically `"asc"` or `"desc"`).
 *
 * @example
 * ```ts
 * const sorts = RoleTypeQuerySortsSchema.parse({
 *   roleName: "asc",
 *   department: "desc"
 * });
 * ```
 */
export const RoleTypeQuerySortsSchema = z.object({
    /** Sort by role name, ascending or descending. */
    roleName: MongooseSortOrderSchema.optional(),

    /** Sort by department, ascending or descending. */
    department: MongooseSortOrderSchema.optional(),
});

/**
 * Zod schema representing all query options for `RoleType` records.
 *
 * Combines filters and sorts into a single schema for querying:
 * - All fields from {@link RoleTypeQueryFiltersSchema} (optional).
 * - All fields from {@link RoleTypeQuerySortsSchema} (optional).
 *
 * @example
 * ```ts
 * const options = RoleTypeQueryOptionsSchema.parse({
 *   roleName: "Director",
 *   department: "CREW",
 *   roleNameSort: "asc",
 *   departmentSort: "desc"
 * });
 * ```
 */
export const RoleTypeQueryOptionsSchema = RoleTypeQueryFiltersSchema.merge(RoleTypeQuerySortsSchema);