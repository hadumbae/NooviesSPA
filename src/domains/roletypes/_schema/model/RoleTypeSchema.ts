/**
 * @fileoverview Defines the Zod schemas and TypeScript types for cast and crew role entities.
 */

import {z} from "zod";
import {RoleTypeDepartmentSchema} from "@/domains/roletypes/_schema/fields/RoleTypeDepartmentSchema.ts";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {IDStringSchema} from "@/common/_schemas";
import {
    RoleTypeCastCategorySchema,
    RoleTypeCrewCategorySchema,
} from "@/domains/roletypes/_schema/fields/RoleTypeCategorySchema.ts";

const RoleTypeBaseSchema = z.object({
    _id: IDStringSchema.readonly(),
    roleName: NonEmptyStringSchema,
    department: RoleTypeDepartmentSchema,
    description: NonEmptyStringSchema.optional().nullable(),
});

const RoleTypeCrewSchema = RoleTypeBaseSchema.extend({
    department: z.literal("CREW"),
    category: RoleTypeCrewCategorySchema,
});

const RoleTypeCastSchema = RoleTypeBaseSchema.extend({
    department: z.literal("CAST"),
    category: RoleTypeCastCategorySchema,
});

/** Zod schema for validating cast and crew role types using a discriminated union on the department field. */
export const RoleTypeSchema = z.discriminatedUnion(
    "department",
    [RoleTypeCastSchema, RoleTypeCrewSchema],
);

/** Represents the inferred type for a cast or crew role entity. */
export type RoleType = z.infer<typeof RoleTypeSchema>;