import {z} from "zod";
import {GenreFormSchema, GenreFormValuesSchema} from "@/pages/genres/schema/form/GenreForm.schema.ts";

/**
 * **GenreFormValues**
 *
 * TypeScript type inferred from {@link GenreFormValuesSchema}.
 *
 * Represents the raw values entered into the Genre form before any
 * additional transformations or normalization (e.g., user-typed strings).
 *
 * Typically used:
 * - In form components as the shape of `useForm` or `react-hook-form` values.
 * - When handling validation errors or default values for the form.
 */
export type GenreFormValues = z.infer<typeof GenreFormValuesSchema>;

/**
 * **GenreForm**
 *
 * TypeScript type inferred from {@link GenreFormSchema}.
 *
 * Represents the fully validated and transformed Genre entity as it exists
 * after form submission and Zod validation.
 *
 * Typically used:
 * - When persisting a genre to the database or API.
 * - For internal business logic after validation.
 */
export type GenreForm = z.infer<typeof GenreFormSchema>;