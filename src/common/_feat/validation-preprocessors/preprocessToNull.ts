/**
 * @fileoverview Utility for preprocessing Zod schema values to null, primary for discriminated union branches.
 */

import {z, ZodTypeAny} from "zod";

/** Preprocesses any input value to null before validating with the provided schema. */
export function preprocessToNull<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return z.preprocess(() => null, schema);
}