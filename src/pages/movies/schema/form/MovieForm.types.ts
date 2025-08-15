import {z} from "zod";
import {MovieFormSchema, MovieFormValuesSchema} from "@/pages/movies/schema/form/MovieForm.schema.ts";

/**
 * Type representing the **raw, unvalidated** values from the movie form.
 *
 * - Directly inferred from {@link MovieFormValuesSchema}.
 * - Matches the data shape held in form state (e.g., in a UI library like React Hook Form).
 * - May contain empty strings, `null`, or partial data before final validation.
 */
export type MovieFormValues = z.infer<typeof MovieFormValuesSchema>;

/**
 * Type representing the **validated and normalized** movie form data.
 *
 * - Directly inferred from {@link MovieFormSchema}.
 * - All values meet schema constraints (e.g., valid date formats, ISO codes, positive numbers).
 * - Suitable for saving to a database or sending to an API.
 */
export type MovieForm = z.infer<typeof MovieFormSchema>;