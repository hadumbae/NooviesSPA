import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {TheatreQueryOptionSchema} from "@/pages/theatres/schema/queries/TheatreQueryOption.schema.ts";
import {z} from "zod";

/**
 * Zod schema defining the form-compatible representation of {@link TheatreQueryOptionSchema}.
 *
 * This schema transforms the base query option schema into a structure suitable for
 * use with form libraries (e.g., React Hook Form), by wrapping each field with
 * a standardized form value schema (see {@link generateFormValueSchema}).
 *
 * @remarks
 * - This schema ensures each form field has consistent starter values
 *   for empty or uninitialized states.
 * - Typically used to initialize or validate UI form data before submission.
 *
 * @example
 * ```ts
 * import { TheatreQueryOptionFormValueSchema } from "@/pages/theatres/schema/forms/TheatreQueryOptionFormValueSchema";
 *
 * const parsed = TheatreQueryOptionFormValueSchema.parse({
 *   name: { value: "Apollo" },
 *   sortByCity: { value: 1 },
 * });
 * // → Valid form structure with standardized fields
 * ```
 */
export const TheatreQueryOptionFormValueSchema = generateFormValueSchema(TheatreQueryOptionSchema);

/**
 * Type inference for the validated form values of {@link TheatreQueryOptionFormValueSchema}.
 *
 * Represents the shape of data managed by the theatre query option form,
 * suitable for integration with `useForm` or similar hooks.
 *
 * @example
 * ```ts
 * const form = useForm<TheatreQueryOptionFormValues>({
 *   defaultValues: {
 *     name: { value: "" },
 *     sortBySeatCapacity: { value: undefined },
 *   },
 * });
 * ```
 */
export type TheatreQueryOptionFormValues = z.infer<typeof TheatreQueryOptionFormValueSchema>;
