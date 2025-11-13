import { ZodNullable, ZodOptional, ZodTypeAny } from "zod";

/**
 * Recursively unwraps a Zod schema to its underlying non-optional, non-nullable type.
 *
 * This function removes layers of `ZodOptional` and `ZodNullable`, returning
 * the core schema type that represents the actual value.
 *
 * @param schema - The Zod schema to unwrap.
 *
 * @returns The innermost Zod schema that is not wrapped with `ZodOptional` or `ZodNullable`.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const schema = z.string().optional().nullable();
 * const unwrapped = unwrapZodSchema(schema);
 * // unwrapped is z.string()
 * ```
 */
export default function unwrapZodSchema(schema: ZodTypeAny): ZodTypeAny {
    if (schema instanceof ZodOptional || schema instanceof ZodNullable) {
        return unwrapZodSchema(schema._def.innerType);
    }

    return schema;
}
