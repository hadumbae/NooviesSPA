/**
 * @fileoverview Zod preprocessor utility to convert empty strings to undefined.
 */

import {z, ZodTypeAny} from "zod";

/**
 * Wraps a Zod schema to treat empty string inputs as undefined before validation.
 */
export function preprocessEmptyStringToUndefined<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return z.preprocess(val => val === "" ? undefined : val, schema);
}