import {z} from "zod";
import {ScreenFormSchema, ScreenFormValuesSchema} from "@/pages/screens/schema/forms/ScreenForm.schema.ts";

/**
 * Type representing the initial form values for creating or editing a screen.
 *
 * This type is inferred from {@link ScreenFormValuesSchema} and is typically used
 * to define the default values passed into a form component.
 *
 * All fields are generic form starter values, suitable for unvalidated user input.
 */
export type ScreenFormValues = z.infer<typeof ScreenFormValuesSchema>;

/**
 * Type representing the validated shape of submitted screen form data.
 *
 * This type is inferred from {@link ScreenFormSchema} and ensures that
 * all form fields meet the expected validation rules before submission.
 *
 * Matches the structure defined in the {@link IScreenSubmit} interface.
 */
export type ScreenForm = z.infer<typeof ScreenFormSchema>;