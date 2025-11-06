import {z, ZodObject, ZodRawShape} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * A mapped type representing a new Zod shape where every field
 * from the original shape is replaced with {@link FormStarterValueSchema}.
 */
type ZodReturnShape<TShape extends ZodRawShape> = {
    [K in keyof TShape]: typeof FormStarterValueSchema;
};

/**
 * Generates a new Zod object schema based on an existing one,
 * replacing all of its field schemas with {@link FormStarterValueSchema}.
 *
 * @typeParam TShape - The raw shape type of the input Zod object schema.
 * @param schema - The original {@link ZodObject} whose keys are used to construct the new schema.
 * @returns A new {@link ZodObject} where each field corresponds to
 * the same key in the original schema but uses `FormStarterValueSchema` as its value schema.
 *
 * @example
 * ```ts
 * import { z } from "zod";
 * import generateFormSchema from "./generateFormSchema";
 *
 * const userSchema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 * });
 *
 * const formSchema = generateFormSchema(userSchema);
 * // formSchema now validates objects like:
 * // { name: { value: string, touched: boolean }, age: { value: number, touched: boolean } }
 * ```
 *
 * @remarks
 * This utility is typically used to generate form-friendly schemas
 * from existing Zod definitions, ensuring consistent initial values
 * and validation structures for forms.
 */
export default function generateFormValueSchema<TShape extends ZodRawShape>(
    schema: ZodObject<TShape>
): ZodObject<ZodReturnShape<TShape>> {
    const originalShape = schema.shape;

    const newShape = Object.fromEntries(
        Object.keys(originalShape).map(key => [key, FormStarterValueSchema]),
    ) as ZodReturnShape<TShape>;

    return z.object(newShape);
}
