import {z} from "zod";
import {TheatreFormSchema, TheatreFormValuesSchema} from "@/pages/theatres/schema/forms/TheatreForm.schema.ts";

/**
 * Type representing raw form input values for the theatre form.
 *
 * Typically includes initial user-entered values which may be unvalidated
 * and potentially empty.
 */
export type TheatreFormValues = z.infer<typeof TheatreFormValuesSchema>;

/**
 * Type representing validated and cleaned theatre form data.
 *
 * Conforms to the schema `TheatreFormSchema` and the interface `ITheatreSubmit`.
 */
export type TheatreForm = z.infer<typeof TheatreFormSchema>;