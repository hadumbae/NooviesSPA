import { ZodArray, ZodObject, ZodRawShape } from "zod";
import unwrapZodSchema from "@/common/utility/features/zod/unwrapZodSchema.ts";

/**
 * Extracts the keys of top-level array fields from a Zod object schema.
 *
 * Only the first-level properties of the schema are checked.
 * If a property is a `ZodArray`, its key is included in the result.
 *
 * @template TShape - The shape of the Zod object schema (`ZodRawShape`).
 *
 * @param obj - The Zod object from which to extract array keys.
 * @param obj.shape - The shape of the Zod object.
 *
 * @returns An array of strings representing the keys of all top-level `ZodArray` fields.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 *
 * const schema = z.object({
 *   tags: z.array(z.string()),
 *   name: z.string(),
 *   values: z.array(z.number())
 * });
 *
 * const arrayKeys = getTopLevelArrayKeys(schema);
 * // Result: ["tags", "values"]
 * ```
 */
export default function getTopLevelArrayKeys<TShape extends ZodRawShape>(
    { shape }: ZodObject<TShape>
): string[] {
    return Object
        .entries(shape)
        .filter(([_, schema]) => unwrapZodSchema(schema) instanceof ZodArray)
        .map(([key]) => key);
}
