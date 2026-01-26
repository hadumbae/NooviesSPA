import {z, ZodObject, ZodRawShape} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Recursive mapped type that converts a Zod object shape into
 * a form-value shape.
 *
 * - Leaf fields are replaced with {@link FormStarterValueSchema}.
 * - Nested {@link ZodObject} fields are transformed recursively.
 *
 * @typeParam TShape - Raw Zod shape to transform.
 */
type ZodReturnShape<TShape extends ZodRawShape> = {
    [K in keyof TShape]: TShape[K] extends ZodObject<infer TChildShape extends ZodRawShape>
        ? ZodObject<ZodReturnShape<TChildShape>>
        : typeof FormStarterValueSchema;
};

// type ZodReturnShape<TShape extends ZodRawShape> = {
//     [K in keyof TShape]: typeof FormStarterValueSchema;
// };

/**
 * Generates a form-value Zod schema from an existing Zod object schema.
 *
 * @remarks
 * Preserves the original object structure while replacing all
 * non-object fields with {@link FormStarterValueSchema}. Nested
 * Zod objects are handled recursively.
 *
 * Intended for initializing and validating form state where each
 * field tracks metadata such as `{ value, touched }`.
 *
 * @typeParam TShape - Raw shape of the source {@link ZodObject}.
 * @param schema - Source schema used as the structural template.
 * @returns A new {@link ZodObject} mirroring the input schema’s keys,
 * with all fields converted to form starter value schemas.
 *
 * @example
 * ```ts
 * const userSchema = z.object({
 *   name: z.string(),
 *   profile: z.object({
 *     age: z.number(),
 *   }),
 * });
 *
 * const formSchema = generateFormValueSchema(userSchema);
 * ```
 */
export default function generateFormValueSchema<TShape extends ZodRawShape>(
    schema: ZodObject<TShape>
): ZodObject<ZodReturnShape<TShape>> {
    const originalShape = schema.shape;

    const newShape = Object.fromEntries(
        Object.entries(originalShape).map(([key, value]) => {
            if (value instanceof z.ZodObject) {
                return [key, generateFormValueSchema(value)];
            }

            return [key, FormStarterValueSchema];
        }),
    ) as ZodReturnShape<TShape>;

    return z.object(newShape);
}
