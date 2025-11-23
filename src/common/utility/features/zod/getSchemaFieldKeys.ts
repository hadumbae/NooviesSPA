/**
 * @file getSchemaFieldKeys.ts
 * @description
 * Utility function for extracting the field keys from a Zod object schema.
 *
 * Converts the keys of a Zod schema's `shape` into a strongly-typed array of
 * `react-hook-form` `Path<T>` values. This ensures type-safe referencing of form
 * fields derived directly from your Zod validation schema.
 *
 * @example
 * ```ts
 * const schema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 * });
 *
 * const keys = getSchemaFieldKeys(schema); 
 * // -> ["name", "age"] (typed as Path<{ name: string; age: number }>)
 * ```
 */

import {z, ZodObject, ZodRawShape} from "zod";
import {Path} from "react-hook-form";

/**
 * Extracts the field keys from a Zod object schema as typed `react-hook-form` paths.
 *
 * @remarks
 * This utility is primarily used to derive type-safe field lists from Zod schemas,
 * enabling automatic generation of:
 * - Field activation maps
 * - Dynamic form select lists
 * - Schema-driven form builders
 *
 * Zod schemas expose their underlying shape through the `shape` property.
 * This function returns `Object.keys(shape)` but casts the result to a list of
 * `Path<TSchemaValues>`, ensuring compatibility with `react-hook-form`.
 *
 * @template TShape - The raw shape type of the Zod object schema.
 *
 * @param schema - A Zod object schema whose shape keys should be extracted.
 *
 * @returns An array of keys typed as `Path<z.infer<ZodObject<TShape>>>[]`.
 *
 * @example
 * ```ts
 * const keys = getSchemaFieldKeys(ShowingFormValuesSchema);
 * // -> ["status", "language", "startAtDate", ...] typed safely as form paths
 * ```
 */
export default function getSchemaFieldKeys<TShape extends ZodRawShape>(
    { shape }: ZodObject<TShape>
): Path<z.infer<ZodObject<TShape>>>[] {
    return Object.keys(shape) as Path<z.infer<ZodObject<TShape>>>[];
}
