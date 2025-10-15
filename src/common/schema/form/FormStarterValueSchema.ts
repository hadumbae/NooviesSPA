import { z } from "zod";

/**
 * Zod schema representing valid **starter values** for a form field.
 *
 * @description
 * This schema is intended to initialize form fields with default values
 * before user interaction. It allows a flexible set of types that cover
 * most common starter values:
 *
 * - `string` — for text inputs
 * - `number` — for numeric inputs
 * - `boolean` — for checkboxes or toggles
 * - `null` / `undefined` — for empty or uninitialized fields
 * - `Array<any>` — for multi-value inputs or complex initial arrays
 * - `File` — for fields that may start with a preloaded file
 *
 * @remarks
 * Using this schema ensures that initial form state is type-safe and
 * compatible with eventual transformation or validation before submission.
 *
 * @example
 * ```ts
 * import { FormStarterValueSchema } from "@/common/schema/forms/FormStarterValueSchema.ts";
 *
 * const defaultValue = FormStarterValueSchema.parse("Initial text");
 * const defaultNumber = FormStarterValueSchema.parse(0);
 * const defaultFile = FormStarterValueSchema.parse(new File([], "example.txt"));
 * ```
 */
export const FormStarterValueSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.any()),
    z.null(),
    z.undefined(),
    z.instanceof(File),
]);

/**
 * Type representing valid starter values for form fields.
 *
 * @description
 * This type is inferred from {@link FormStarterValueSchema} and can
 * be used to type form state, default values in `useForm`, or any
 * initial value passed to form fields.
 *
 * @example
 * ```ts
 * import type { FormStarterValue } from "@/common/schema/forms/FormStarterValueSchema.ts";
 *
 * const initialValue: FormStarterValue = "Hello";
 * const initialArray: FormStarterValue = [1, 2, 3];
 * const initialFile: FormStarterValue = new File([], "example.txt");
 * ```
 */
export type FormStarterValue = z.infer<typeof FormStarterValueSchema>;
