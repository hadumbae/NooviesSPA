/**
 * @fileoverview Zod schema and type definition for application error codes.
 */

import {z} from "zod";
import {ErrorCodeConstant} from "@/common/_const";
import {ZodEnumParamHandler} from "@/common/_feat/validation-handlers";

/** Zod schema for validating error code strings. */
export const ErrorCodeSchema = z.enum(
    ErrorCodeConstant,
    ZodEnumParamHandler({invalidValue: "Must be a valid error code.", invalidType: "Must be a error code string."})
);

/** Type representing a valid error code. */
export type ErrorCode = z.infer<typeof ErrorCodeSchema>;