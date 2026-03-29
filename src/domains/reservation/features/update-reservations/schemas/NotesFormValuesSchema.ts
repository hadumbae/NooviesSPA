/**
 * @file Zod schema and type for state-managed reservation note form values.
 * @filename NotesFormValuesSchema.ts
 */

import {z} from "zod";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {
    ReservationNotesFormSubmitSchema
} from "@/domains/reservation/features/update-reservations/schemas/NotesFormSubmitSchema.ts";

/**
 * Transformation schema for mapping raw submission data to UI form state.
 */
export const ReservationNotesFormValuesSchema = generateFormValueSchema(
    ReservationNotesFormSubmitSchema
);

/**
 * TypeScript type inferred from {@link ReservationNotesFormSubmitSchema}.
 * Represents the shape of the form state before it is cleaned for submission.
 */
export type ReservationNotesFormValues = z.infer<typeof ReservationNotesFormSubmitSchema>;