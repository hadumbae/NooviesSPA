/**
 * @fileoverview Zod schema for validating orientation enum values.
 */

import {z} from "zod";
import {OrientationConstant} from "@/common/_const/OrientationConstant.ts";

/** Zod schema for validating orientation enum values. */
export const OrientationEnumSchema = z.enum(OrientationConstant, {
    errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_enum_value) return {message: "Invalid Value."};
        if (issue.code === z.ZodIssueCode.invalid_type) return {message: "Must be a valid string."};
        return {message: ctx.defaultError};
    },
});

/** Inferred type for orientation values. */
export type OrientationValues = z.infer<typeof OrientationEnumSchema>;