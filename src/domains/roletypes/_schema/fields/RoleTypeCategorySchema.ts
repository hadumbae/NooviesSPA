/**
 * @fileoverview Zod enum schemas for role type categories.
 */

import {z} from "zod";
import {RoleTypeCastCategoryConstant} from "@/domains/roletypes/_schema/fields/RoleTypeCastCategoryConstant.ts";
import {
    RoleTypeCrewCategoryConstant
} from "@/domains/roletypes/_schema/fields/RoleTypeCrewCategoryConstant.ts";

/** Enum schema for cast role categories. */
export const RoleTypeCastCategorySchema = z.enum(RoleTypeCastCategoryConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
        if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
        return {message: ctx.defaultError};
    },
});

/** Cast role category type. */
export type RoleTypeCastCategory = z.infer<typeof RoleTypeCastCategorySchema>;

/** Enum schema for crew role categories. */
export const RoleTypeCrewCategorySchema = z.enum(RoleTypeCrewCategoryConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
        if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
        return {message: ctx.defaultError};
    },
});

/** Crew role category type. */
export type RoleTypeCrewCategory = z.infer<typeof RoleTypeCrewCategorySchema>;

/** Enum schema for all role type categories. */
export const RoleTypeCategorySchema = z.enum(
    [...RoleTypeCastCategoryConstant, ...RoleTypeCrewCategoryConstant],
    {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
            if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
            return {message: ctx.defaultError};
        },
    },
);

/** Role category type (cast or crew). */
export type RoleTypeCategory = z.infer<typeof RoleTypeCategorySchema>;