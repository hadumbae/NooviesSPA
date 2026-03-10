/**
 * @file Zod schema and type for supported layout orientation values.
 * @filename OrientationEnumSchema.ts
 */

import {z} from "zod";
import {OrientationConstant} from "@/common/constants/OrientationConstant.ts";

/**
 * Runtime validation schema for layout orientation values.
 * Provides normalized user-facing validation messages.
 */
export const OrientationEnumSchema = z.enum(OrientationConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
        if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
        return {message: ctx.defaultError};
    },
});

/**
 * Union type of all supported orientation values.
 */
export type OrientationValues = z.infer<typeof OrientationEnumSchema>;