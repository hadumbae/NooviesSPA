/**
 * @fileoverview Utility for extracting field keys from a Zod schema as react-hook-form paths.
 */

import {z, ZodObject, ZodRawShape} from "zod";
import {Path} from "react-hook-form";

/** Extracts the top-level keys from a Zod object schema and casts them to react-hook-form paths. */
export function getSchemaFieldKeys<TShape extends ZodRawShape>(
    {shape}: ZodObject<TShape>
): Path<z.infer<ZodObject<TShape>>>[] {
    return Object.keys(shape) as Path<z.infer<ZodObject<TShape>>>[];
}
