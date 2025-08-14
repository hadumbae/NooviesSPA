import {z} from "zod";

/**
 * Zod schema representing the allowed starter values for a form field.
 *
 * This schema is used to initialize form fields with default values before
 * user input. It allows a flexible set of types to cover common starter values:
 *
 * - `string` — typical for text inputs
 * - `number` — for numeric inputs
 * - `boolean` — for checkboxes or toggles
 * - `null` / `undefined` — to represent empty or uninitialized fields
 * - `File` — to allow starter values that may already include a file object
 *
 * This ensures that form fields are correctly typed for initialization while
 * still being compatible with eventual validation and transformation to the
 * final payload type.
 */
export const FormStarterValueSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.undefined(),
    z.instanceof(File),
]);

/**
 * Type representing valid starter values for form fields.
 *
 * This type is inferred from {@link FormStarterValueSchema}
 * and includes all values typically safe to use as defaults
 * in form field state or `defaultValues` in `useForm`.
 */
export type FormStarterValue = z.infer<typeof FormStarterValueSchema>;