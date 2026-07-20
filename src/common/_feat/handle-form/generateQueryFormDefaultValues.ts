/**
 * @fileoverview Utility for generating initial empty string values for Zod-based search query forms.
 */

import {ZodObject, ZodRawShape} from "zod";

/** Configuration for generating default form values from a Zod schema. */
type GenerationConfig<TShape extends ZodRawShape> = {
    schema: ZodObject<TShape>;
}

/** Creates an object with empty string values for every key defined in the provided Zod schema shape. */
export function generateQueryFormDefaultValues<TShape extends ZodRawShape>(
    {schema: {shape}}: GenerationConfig<TShape>
): Record<keyof TShape, string> {
    return Object.fromEntries(
        Object.keys(shape).map((key) => [key, ""])
    ) as Record<keyof TShape, string>;
}