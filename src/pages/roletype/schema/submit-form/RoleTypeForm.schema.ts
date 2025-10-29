import { z } from "zod";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { RoleTypeDepartmentEnumSchema } from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {
    RoleTypeCastCategoryEnumSchema,
    RoleTypeCrewCategoryEnumSchema,
} from "@/pages/roletype/schema/enums/RoleTypeCategory.enum.ts";

/**
 * Schema representing the initial (unvalidated) form values
 * for creating or editing a role type.
 *
 * @remarks
 * Used primarily for initializing form states, where all fields
 * are stored as generic values compatible with form libraries.
 */
export const RoleTypeFormValuesSchema = z.object({
    /** Role name value (may start as an empty string). */
    roleName: FormStarterValueSchema,

    /** Department value (e.g., `"CAST"`, `"CREW"`, or empty before selection). */
    department: FormStarterValueSchema,

    /** Category value corresponding to the selected department. */
    category: FormStarterValueSchema,

    /** Description value (may start as an empty string). */
    description: FormStarterValueSchema,
});

/**
 * Base schema for validating form input when creating or editing role types.
 *
 * @remarks
 * Shared between cast and crew role forms.
 *
 * **Validation behavior:**
 * - `roleName`: Required, non-empty string, max 150 characters.
 * - `department`: Must be `"CAST"` or `"CREW"`, required.
 * - `description`: Optional; if empty, transformed to `undefined`.
 */
const RoleTypeFormBaseSchema = z.object({
    /** Role name, required, non-empty, max 150 characters. */
    roleName: NonEmptyStringSchema.max(150, {
        message: "Must be 150 characters or less.",
    }),

    /**
     * Department value.
     *
     * @remarks
     * Accepts `"CAST"` or `"CREW"`, required.
     * Empty string is disallowed and yields `"Required."` message.
     */
    department: z
        .union([z.literal(""), RoleTypeDepartmentEnumSchema], {
            message: "Invalid value. Must be a string.",
        })
        .refine((val) => val !== "", { message: "Required." }),

    /**
     * Optional description field.
     *
     * @remarks
     * - Max length 1000 characters.
     * - Empty strings are transformed to `undefined`.
     */
    description: NonEmptyStringSchema.max(1000, {
        message: "Must be 1000 characters or less.",
    })
        .optional()
        .transform((val) => {
            if (typeof val !== "string" || val === "") return undefined;
            return val;
        }),
});

/**
 * Schema for validating crew role form input.
 *
 * @remarks
 * Extends {@link RoleTypeFormBaseSchema} with:
 * - Fixed `department`: `"CREW"`
 * - Valid `category`: from {@link RoleTypeCrewCategoryEnumSchema}
 */
const RoleTypeFormCrewSchema = RoleTypeFormBaseSchema.extend({
    /** Department discriminator, fixed to `"CREW"`. */
    department: z.literal("CREW"),

    /** Crew category selection (e.g., "CINEMATOGRAPHY", "DIRECTION"). */
    category: RoleTypeCrewCategoryEnumSchema,
});

/**
 * Schema for validating cast role form input.
 *
 * @remarks
 * Extends {@link RoleTypeFormBaseSchema} with:
 * - Fixed `department`: `"CAST"`
 * - Valid `category`: from {@link RoleTypeCastCategoryEnumSchema}
 */
const RoleTypeFormCastSchema = RoleTypeFormBaseSchema.extend({
    /** Department discriminator, fixed to `"CAST"`. */
    department: z.literal("CAST"),

    /** Cast category selection (e.g., "MAIN", "SUPPORTING"). */
    category: RoleTypeCastCategoryEnumSchema,
});

/**
 * Discriminated union schema for validating role type form submissions.
 *
 * @remarks
 * Uses the `department` field as the discriminator between
 * {@link RoleTypeFormCastSchema} and {@link RoleTypeFormCrewSchema}.
 */
export const RoleTypeFormSchema = z.discriminatedUnion("department", [
    RoleTypeFormCrewSchema,
    RoleTypeFormCastSchema,
]);
