import {z} from "zod";
import {RoleTypeDepartmentEnumSchema} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {generatePaginationSchema} from "@/common/schema/helpers/zodHelperFunctions.ts";

/**
 * Zod schema for a role type entity.
 *
 * A role type represents a specific job or function (e.g., `"actor"`, `"director"`)
 * within a production, and is associated with a department (e.g., `"CAST"`, `"CREW"`).
 *
 * Fields:
 * - `_id`: Unique identifier for the role type (read-only).
 * - `roleName`: Name of the role (e.g., `"Actor"`, `"Director"`), required,
 *   maximum 150 characters.
 * - `department`: Department the role belongs to, must be either `"CAST"` or `"CREW"`.
 * - `description`: Optional free-text description of the role, up to 1000 characters.
 *   If not provided, will be transformed to `undefined`.
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

    /** Name of the role (e.g., "Actor", "Director"). */
    roleName: NonEmptyStringSchema.max(150, {
        message: "Must be 150 characters or less.",
    }),

    /** Department the role belongs to, such as "CAST" or "CREW". */
    department: RoleTypeDepartmentEnumSchema,

    /**
     * Optional description of the role.
     * Will be transformed to `undefined` if not a string.
     */
    description: NonEmptyStringSchema
        .max(1000, {message: "Must be 1000 characters or less."})
        .optional()
        .transform((val) => (typeof val === "string" ? val : undefined)),
});

/**
 * Zod schema for an array of role types.
 *
 * Each element of the array must conform to {@link RoleTypeSchema}.
 */
export const RoleTypeArraySchema = z.array(
    RoleTypeSchema,
    {message: "Must be an array of role types."},
);

/**
 * Zod schema for paginated role types.
 *
 * Uses {@link generatePaginationSchema} to create a schema that includes:
 * - `items`: an array of role types for the current page
 * - `totalCount`: total number of role types
 * - `page`: current page number
 * - `pageSize`: number of items per page
 */
export const PaginatedRoleTypeSchema = generatePaginationSchema(RoleTypeSchema);

