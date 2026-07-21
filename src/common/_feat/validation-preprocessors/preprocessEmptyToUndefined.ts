/**
 * @fileoverview Zod preprocessor to convert empty values to undefined.
 */

import {z, ZodTypeAny} from "zod";

/**
 * Wraps a Zod schema to treat empty strings, null, or undefined as undefined before validation.
 */
export function preprocessEmptyToUndefined<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return z.preprocess(val => (val === "" || val === undefined || val === null) ? undefined : val, schema);
}