/**
 * @file Zod validation schema and type definitions for Theatre Screen technical formats.
 * @filename ScreenTypeSchema.ts
 */

import {z} from "zod";
import ScreenTypeConstant from "@/domains/theatre-screens/constants/ScreenTypeConstant.ts";

/**
 * Zod schema for validating and restricting string values to known theatre screen types.
 */
export const ScreenTypeSchema = z.enum(
    ScreenTypeConstant,
    {
        errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
                return {message: "Invalid screen type value."};
            }

            if (issue.code === z.ZodIssueCode.invalid_type) {
                return {message: "Must be a valid screen type string."};
            }

            return {message: ctx.defaultError};
        },
    },
);

/**
 * TypeScript type representing a validated screen type format.
 */
export type ScreenType = z.infer<typeof ScreenTypeSchema>;