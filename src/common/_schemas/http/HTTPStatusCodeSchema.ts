/**
 * @fileoverview Zod schema and type definition for valid HTTP status codes.
 */

import {z} from "zod";
import {HTTPStatusCodeConstant} from "@/common/_const";
import {ZodEnumParamHandler} from "@/common/_feat/validation-handlers";

/** Zod schema for validating HTTP status codes. */
export const HTTPStatusCodeSchema = z.enum(HTTPStatusCodeConstant, ZodEnumParamHandler({
    invalidValue: "Not A Valid HTTP Status Code.",
    invalidType: "Must be a number.",
}));

/** Type representing a valid HTTP status code. */
export type HTTPStatusCode = z.infer<typeof HTTPStatusCodeSchema>;