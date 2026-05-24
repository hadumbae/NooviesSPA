/**
 * @fileoverview Utility for generating Zod array schemas with standardized error messages.
 */

import {z, ZodArray, ZodTypeAny} from "zod";

/**
 * Wraps a Zod schema in an array with predefined required and type validation errors.
 */
export function generateArraySchema<TSchema extends ZodTypeAny>(schema: TSchema): ZodArray<TSchema> {
    return z.array(schema, {required_error: "Required.", invalid_type_error: "Must be an array."});
}