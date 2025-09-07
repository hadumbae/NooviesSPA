import {z} from "zod";
import {
    PaginatedRoleTypeSchema,
    RoleTypeArraySchema,
    RoleTypeSchema
} from "@/pages/roletype/schema/model/RoleType.schema.ts";

/**
 * TypeScript type inferred from {@link RoleTypeSchema}.
 *
 * Represents a role type object, including ID, name, department,
 * and an optional description.
 */
export type RoleType = z.infer<typeof RoleTypeSchema>;

/**
 * TypeScript type inferred from {@link RoleTypeArraySchema}.
 *
 * Represents an array of {@link RoleType} objects.
 * Useful when working with collections of role types.
 */
export type RoleTypeArray = z.infer<typeof RoleTypeArraySchema>;

/**
 * TypeScript type inferred from {@link PaginatedRoleTypeSchema}.
 *
 * Represents a paginated list of {@link RoleType} objects,
 * typically used in API responses that return:
 * - an array of role types for the current page
 * - pagination metadata such as total count, page number, and page size
 */
export type PaginatedRoleTypes = z.infer<typeof PaginatedRoleTypeSchema>;