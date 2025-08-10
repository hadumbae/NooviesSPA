import {z} from "zod";
import {
    PersonFormSchema,
    PersonFormValuesSchema,
    PersonProfileImageFormSchema,
    PersonProfileImageFormValuesSchema
} from "@/pages/persons/schema/forms/PersonForm.schema.ts";

/**
 * Type representing the raw, unvalidated values of the Person form.
 *
 * This type corresponds to the shape of {@link PersonFormValuesSchema} and is
 * typically used for managing initial form state and progressive user input.
 * Fields may be incomplete or partially filled.
 */
export type PersonFormValues = z.infer<typeof PersonFormValuesSchema>;

/**
 * Type representing the validated and sanitized Person form data.
 *
 * This type corresponds to {@link PersonFormSchema} and is used for form submissions
 * after successful validation. All fields conform to the required formats and constraints.
 */
export type PersonForm = z.infer<typeof PersonFormSchema>;

/**
 * Type representing the raw, unvalidated values of the Person profile image form.
 *
 * Corresponds to {@link PersonProfileImageFormValuesSchema}. Used primarily for
 * initial form state and handling of the image file input before validation.
 */
export type PersonProfileImageFormValues = z.infer<typeof PersonProfileImageFormValuesSchema>;

/**
 * Type representing the validated Person profile image form data.
 *
 * Corresponds to {@link PersonProfileImageFormSchema}. Ensures that the profile image
 * is a valid, non-empty File instance of an accepted MIME type, ready for upload or further processing.
 */
export type PersonProfileImageForm = z.infer<typeof PersonProfileImageFormSchema>;