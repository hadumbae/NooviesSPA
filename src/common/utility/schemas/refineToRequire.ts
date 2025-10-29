import { ZodTypeAny } from "zod";

/**
 * Refines a Zod schema to always fail validation with a "Required." message.
 *
 * Useful in scenarios where a default value must be passed, but the value
 * should still be treated as "missing" or "not provided" for validation purposes.
 *
 * @template TSchema - The type of Zod schema to refine (defaults to `ZodTypeAny`).
 * @param schema - The Zod schema to refine.
 * @returns A new schema that always fails validation with the message "Required."
 *
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const schema = z.string().default("");
 * const requiredSchema = refineToRequire(schema);
 *
 * requiredSchema.safeParse(""); // fails with message "Required."
 * ```
 */
export default function refineToRequire<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return schema.refine(() => false, { message: "Required." });
}
