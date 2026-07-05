/**
 * @fileoverview Utility for preprocessing input values into numbers during Zod validation.
 */

import {z, type ZodType, type ZodTypeDef} from "zod";

/**
 * Wraps a Zod schema to convert strings or numbers to a number type, treating empty strings as undefined. */
export function preprocessToNumber<TData>(
    schema: ZodType<TData, ZodTypeDef, unknown>
): z.ZodEffects<ZodType<TData, ZodTypeDef, unknown>, TData, unknown> {
    return z.preprocess(
        (val) => {
            const num = Number(val);
            return (val === null || val === "" || isNaN(num)) ? undefined : num;
        },
        schema
    );
}