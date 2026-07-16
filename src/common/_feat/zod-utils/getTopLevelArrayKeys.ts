/**
 * @fileoverview Utility for extracting keys of array-typed fields from a Zod object schema.
 */

import { ZodArray, ZodObject, ZodRawShape } from "zod";
import {unwrapZodSchema} from "@/common/_feat/zod-utils/unwrapZodSchema.ts";

/** Identifies and returns the property names of a Zod object that map to Zod array schemas. */
export function getTopLevelArrayKeys<TShape extends ZodRawShape>(
    {shape}: ZodObject<TShape>
): string[] {
    return Object
        .entries(shape)
        .filter(([_, schema]) => unwrapZodSchema(schema) instanceof ZodArray)
        .map(([key]) => key);
}
