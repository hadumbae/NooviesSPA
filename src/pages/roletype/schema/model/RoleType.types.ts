import { z } from "zod";
import {
    PaginatedRoleTypeSchema,
    RoleTypeArraySchema,
    RoleTypeSchema,
} from "@/pages/roletype/schema/model/RoleType.schema.ts";

/**
 * Represents a role type entity.
 *
 * @remarks
 * Inferred from {@link RoleTypeSchema}.
 * Includes the following properties:
 * - `_id`: Unique identifier for the role.
 * - `roleName`: Name of the role (non-empty string).
 * - `department`: Either `"CAST"` or `"CREW"`.
 * - `category`: Category within the department.
 * - `description`: Optional or nullable text description.
 */
export type RoleType = z.infer<typeof RoleTypeSchema>;

/**
 * Represents an array of {@link RoleType} entities.
 *
 * @remarks
 * Inferred from {@link RoleTypeArraySchema}.
 * Commonly used when fetching or validating multiple roles at once.
 */
export type RoleTypeArray = z.infer<typeof RoleTypeArraySchema>;

/**
 * Represents a paginated list of {@link RoleType} entities.
 *
 * @remarks
 * Inferred from {@link PaginatedRoleTypeSchema}.
 * Used for API responses that include:
 * - An array of role types for the current page.
 * - Pagination metadata (e.g., total count, page number, page size).
 */
export type PaginatedRoleTypes = z.infer<typeof PaginatedRoleTypeSchema>;
