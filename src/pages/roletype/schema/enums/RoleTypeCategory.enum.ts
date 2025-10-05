import { z } from "zod";
import RoleTypeCastCategoryConstant from "@/pages/roletype/constant/RoleTypeCastCategoryConstant.ts";
import RoleTypeCrewCategoryConstant from "@/pages/roletype/constant/RoleTypeCrewCategoryConstant.ts";

/**
 * Zod schema for cast role categories.
 *
 * @remarks
 * Ensures that a cast role category is one of the predefined constants
 * in `RoleTypeCastCategoryConstant`.
 *
 * Validation behavior:
 * - Missing value → "Required."
 * - Value is not a string → "Must be a valid string."
 * - Value is not in the enum → "Invalid Value."
 */
export const RoleTypeCastCategoryEnumSchema = z.enum(RoleTypeCastCategoryConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return { message: "Invalid Value." };
        if (issue.code === z.ZodIssueCode.invalid_type) return { message: "Must be a valid string." };
        return { message: ctx.defaultError };
    },
});

/**
 * Zod schema for crew role categories.
 *
 * @remarks
 * Ensures that a crew role category is one of the predefined constants
 * in `RoleTypeCrewCategoryConstant`.
 *
 * Validation behavior:
 * - Missing value → "Required."
 * - Value is not a string → "Must be a valid string."1
 * - Value is not in the enum → "Invalid Value."
 */
export const RoleTypeCrewCategoryEnumSchema = z.enum(RoleTypeCrewCategoryConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return { message: "Invalid Value." };
        if (issue.code === z.ZodIssueCode.invalid_type) return { message: "Must be a valid string." };
        return { message: ctx.defaultError };
    },
});
