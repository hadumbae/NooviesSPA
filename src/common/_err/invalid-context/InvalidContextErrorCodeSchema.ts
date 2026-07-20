/**
 * @fileoverview Defines the Zod schema and type for invalid context error codes.
 */

import {z} from "zod";
import {InvalidContextErrorCodeConstant} from "@/common/_err/invalid-context/InvalidContextErrorCodeConstant.ts";
import {ZodEnumParamHandler} from "@/common/_feat";

/** Zod schema for validating invalid context error code strings. */
export const InvalidContextErrorCodeSchema = z.enum(InvalidContextErrorCodeConstant, ZodEnumParamHandler({
    invalidValue: "Must be a valid error code.",
    invalidType: "Must be a error code string.",
}));

/** Type inferred from the InvalidContextErrorCodeSchema. */
export type InvalidContextErrorCode = z.infer<typeof InvalidContextErrorCodeSchema>;