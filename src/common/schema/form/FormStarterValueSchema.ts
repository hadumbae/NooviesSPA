import {z} from "zod";

/**
 * Zod schema representing valid starter values for form fields.
 *
 * This union allows for primitive values that are commonly used
 * as default or initial values in form inputs. These include:
 *
 * - `string`: for text inputs
 * - `number`: for number inputs
 * - `boolean`: for checkboxes and toggles
 * - `null`: for optional fields with no value yet
 * - `undefined`: for fields not yet set or controlled
 */
export const FormStarterValueSchema = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.undefined(),
]);

/**
 * Type representing valid starter values for form fields.
 *
 * This type is inferred from {@link FormStarterValueSchema}
 * and includes all values typically safe to use as defaults
 * in form field state or `defaultValues` in `useForm`.
 */
export type FormStarterValue = z.infer<typeof FormStarterValueSchema>;