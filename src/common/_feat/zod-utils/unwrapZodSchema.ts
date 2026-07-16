/**
 * @fileoverview Utility for unwrapping Zod schemas to access their underlying types.
 */

import { ZodNullable, ZodOptional, ZodTypeAny } from "zod";

/** Recursively unwraps ZodOptional and ZodNullable wrappers to retrieve the base schema. */
export function unwrapZodSchema(schema: ZodTypeAny): ZodTypeAny {
    if (schema instanceof ZodOptional || schema instanceof ZodNullable) {
        return unwrapZodSchema(schema._def.innerType);
    }

    return schema;
}
