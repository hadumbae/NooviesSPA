/**
 * @file Zod enum schemas for role type categories.
 * @filename RoleTypeCategoryEnumSchema.ts
 */

import {z} from "zod";
import RoleTypeCastCategoryConstant from "@/pages/roletype/constant/RoleTypeCastCategoryConstant.ts";
import RoleTypeCrewCategoryConstant from "@/pages/roletype/constant/RoleTypeCrewCategoryConstant.ts";

/**
 * Enum schema for cast role categories.
 */
export const RoleTypeCastCategoryEnumSchema = z.enum(RoleTypeCastCategoryConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
        if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
        return {message: ctx.defaultError};
    },
});

/**
 * Enum schema for crew role categories.
 */
export const RoleTypeCrewCategoryEnumSchema = z.enum(RoleTypeCrewCategoryConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
        if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
        return {message: ctx.defaultError};
    },
});

/**
 * Enum schema for all role type categories.
 */
export const RoleTypeCategorySchema = z.enum(
    [...RoleTypeCastCategoryConstant, ...RoleTypeCrewCategoryConstant],
    {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
            if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
            return {message: ctx.defaultError};
        },
    }
);