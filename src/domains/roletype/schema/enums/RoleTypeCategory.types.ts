/**
 * @file Type definitions for role type categories.
 * @filename RoleTypeCategory.types.ts
 */

import {z} from "zod";
import {
    RoleTypeCastCategoryEnumSchema,
    RoleTypeCategorySchema,
    RoleTypeCrewCategoryEnumSchema
} from "@/domains/roletype/schema/enums/RoleTypeCategory.enum.ts";

/** Cast role category type. */
export type RoleTypeCastCategory = z.infer<typeof RoleTypeCastCategoryEnumSchema>;

/** Crew role category type. */
export type RoleTypeCrewCategory = z.infer<typeof RoleTypeCrewCategoryEnumSchema>;

/** Role category type (cast or crew). */
export type RoleTypeCategory = z.infer<typeof RoleTypeCategorySchema>;