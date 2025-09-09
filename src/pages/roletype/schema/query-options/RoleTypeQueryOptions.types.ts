import {z} from "zod";
import {
    RoleTypeQueryFiltersSchema, RoleTypeQueryOptionsFormValuesSchema,
    RoleTypeQueryOptionsSchema,
    RoleTypeQuerySortsSchema
} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.schema.ts";

/**
 * TypeScript type inferred from {@link RoleTypeQueryOptionsFormValuesSchema}.
 *
 * Represents the values used to initialize the RoleType query form.
 * All fields are optional and can start as empty strings or default values.
 */
export type RoleTypeQueryOptionsFormValues = z.infer<typeof RoleTypeQueryOptionsFormValuesSchema>;

/**
 * TypeScript type inferred from {@link RoleTypeQueryFiltersSchema}.
 *
 * Represents the optional filters that can be applied when querying
 * `RoleType` records. Fields include:
 * - `roleName`: Optional string filter for the role name.
 * - `department`: Optional department filter (`"CAST"` or `"CREW"`).
 *
 * @example
 * ```ts
 * const filters: RoleTypeQueryFilters = {
 *   roleName: "Actor",
 *   department: "CAST"
 * };
 * ```
 */
export type RoleTypeQueryFilters = z.infer<typeof RoleTypeQueryFiltersSchema>;

/**
 * TypeScript type inferred from {@link RoleTypeQuerySortsSchema}.
 *
 * Represents the optional sort order fields for `RoleType` queries.
 * Each field accepts values defined by {@link MongooseSortOrderSchema}
 * (typically `"asc"` or `"desc"`).
 *
 * @example
 * ```ts
 * const sorts: RoleTypeQuerySorts = {
 *   roleName: "asc",
 *   department: "desc"
 * };
 * ```
 */
export type RoleTypeQuerySorts = z.infer<typeof RoleTypeQuerySortsSchema>;

/**
 * TypeScript type inferred from {@link RoleTypeQueryOptionsSchema}.
 *
 * Combines both filters and sorts into a single type for querying
 * `RoleType` records. Includes all fields from {@link RoleTypeQueryFilters}
 * and {@link RoleTypeQuerySorts}.
 *
 * @example
 * ```ts
 * const options: RoleTypeQueryOptions = {
 *   roleName: "Director",
 *   department: "CREW",
 *   roleNameSort: "asc",
 *   departmentSort: "desc"
 * };
 * ```
 */
export type RoleTypeQueryOptions = z.infer<typeof RoleTypeQueryOptionsSchema>;