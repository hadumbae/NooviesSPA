import { z } from "zod";
import { RoleTypeDepartmentEnumSchema } from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    RoleTypeCastCategoryEnumSchema,
    RoleTypeCrewCategoryEnumSchema,
} from "@/pages/roletype/schema/enums/RoleTypeCategory.enum.ts";
import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";

/**
 * Base schema defining shared fields for all role types.
 *
 * @remarks
 * This schema serves as the foundation for both cast and crew role types.
 * It defines the fields that are common to all roles, including identifiers,
 * names, departments, and optional descriptions.
 */
const RoleTypeBaseSchema = z.object({
    /** Unique identifier for the role type (read-only). */
    _id: IDStringSchema.readonly(),

    /** Role name, required, must be a non-empty string (max length 150). */
    roleName: NonEmptyStringSchema,

    /** Department the role belongs to, must be `"CAST"` or `"CREW"`. */
    department: RoleTypeDepartmentEnumSchema,

    /**
     * Optional role description.
     *
     * @remarks
     * - Must be a string if provided.
     * - May be `null` if intentionally unset.
     * - Maximum length (1000) enforced by {@link NonEmptyStringSchema}.
     */
    description: NonEmptyStringSchema.optional().nullable(),
});

/**
 * Schema representing a crew role type.
 *
 * @remarks
 * Extends {@link RoleTypeBaseSchema} with crew-specific fields and
 * constrains the `department` to `"CREW"`.
 */
const RoleTypeCrewSchema = RoleTypeBaseSchema.extend({
    /** Department discriminator, fixed to `"CREW"`. */
    department: z.literal("CREW"),

    /** Crew category enum value (e.g., "CINEMATOGRAPHY", "DIRECTION"). */
    category: RoleTypeCrewCategoryEnumSchema,
});

/**
 * Schema representing a cast role type.
 *
 * @remarks
 * Extends {@link RoleTypeBaseSchema} with cast-specific fields and
 * constrains the `department` to `"CAST"`.
 */
const RoleTypeCastSchema = RoleTypeBaseSchema.extend({
    /** Department discriminator, fixed to `"CAST"`. */
    department: z.literal("CAST"),

    /** Cast category enum value (e.g., "MAIN", "SUPPORTING"). */
    category: RoleTypeCastCategoryEnumSchema,
});

/**
 * Discriminated union schema for all role types.
 *
 * @remarks
 * Uses the `department` field as the discriminator between
 * {@link RoleTypeCastSchema} and {@link RoleTypeCrewSchema}.
 */
export const RoleTypeSchema = z.discriminatedUnion("department", [
    RoleTypeCastSchema,
    RoleTypeCrewSchema,
]);

/**
 * Schema representing an array of role types.
 *
 * @remarks
 * Ensures that each element in the array conforms to {@link RoleTypeSchema}.
 */
export const RoleTypeArraySchema = z.array(RoleTypeSchema, {
    message: "Must be an array of role types.",
});

/**
 * Schema for paginated role type results.
 *
 * @remarks
 * Extends pagination metadata to include role type data.
 * Generated using {@link generatePaginationSchema}.
 */
export const PaginatedRoleTypeSchema = generatePaginationSchema(RoleTypeSchema);