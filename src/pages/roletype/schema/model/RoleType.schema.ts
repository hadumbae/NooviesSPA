import {z} from "zod";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";

/**
 * Zod schema for a role type entity.
 *
 * A role type represents a specific job or function (e.g., `"Actor"`, `"Director"`)
 * within a production, and is associated with a department (e.g., `"CAST"`, `"CREW"`).
 *
 * Fields:
 * - `_id`: Unique identifier for the role type (read-only).
 * - `roleName`: Name of the role (e.g., `"Actor"`, `"Director"`), required,
 *   must be a non-empty string (max 150 characters enforced by {@link NonEmptyStringSchema}).
 * - `department`: Department the role belongs to, must be either `"CAST"` or `"CREW"`.
 * - `description`: Optional free-text description of the role, up to 1000 characters.
 *   May also be `null` if not provided.
 *
 * @example
 * ```ts
 * const role = RoleTypeSchema.parse({
 *   _id: "role_123",
 *   roleName: "Actor",
 *   department: "CAST",
 *   description: "Performs a character in the production."
 * });
 *
 * // role is now strongly typed as RoleType
 * ```
 */
export const RoleTypeSchema = z.object({
    /** Unique identifier for the role type (read-only). */
    _id: IDStringSchema.readonly(),

    /** Role name, required, must be a non-empty string (max length 150). */
    roleName: NonEmptyStringSchema,

    /** Department the role belongs to, must be `"CAST"` or `"CREW"`. */
    department: RoleTypeDepartmentEnumSchema,

    /**
     * Optional role description.
     *
     * - Must be a string (if provided).
     * - May be `null` if intentionally unset.
     * - Maximum length (1000) enforced by {@link NonEmptyStringSchema}.
     */
    description: NonEmptyStringSchema
        .optional()
        .nullable(),
});

/**
 * Zod schema for an array of role types.
 *
 * Each element of the array must conform to {@link RoleTypeSchema}.
 *
 * @example
 * ```ts
 * const roles = RoleTypeArraySchema.parse([
 *   { _id: "1", roleName: "Actor", department: "CAST" },
 *   { _id: "2", roleName: "Director", department: "CREW" }
 * ]);
 * ```
 */
export const RoleTypeArraySchema = z.array(RoleTypeSchema, {
    message: "Must be an array of role types.",
});

/**
 * Zod schema for paginated role types.
 *
 * Extends {@link RoleTypeSchema} into a paginated structure
 * using {@link generatePaginationSchema}. Includes:
 * - `items`: array of role types for the current page
 * - `totalCount`: total number of role types
 * - `page`: current page number (1-based)
 * - `pageSize`: number of items per page
 *
 * @example
 * ```ts
 * const page = PaginatedRoleTypeSchema.parse({
 *   items: [{ _id: "1", roleName: "Actor", department: "CAST" }],
 *   totalCount: 42,
 *   page: 1,
 *   pageSize: 10
 * });
 * ```
 */
export const PaginatedRoleTypeSchema = generatePaginationSchema(RoleTypeSchema);
