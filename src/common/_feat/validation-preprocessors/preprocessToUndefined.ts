/**
 * @fileoverview Utility for preprocessing schema values to undefined, useful for discriminated unions.
 */

import {z, ZodTypeAny} from "zod";

/** Preprocesses any input to undefined before evaluating against the provided Zod schema. */
export function preprocessToUndefined<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return z.preprocess(() => undefined, schema);
}