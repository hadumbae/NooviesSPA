/**
 * @file Zod schema and type for reservation note update form submissions.
 * @filename UpdateReservationNotesFormSubmitSchema.ts
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Validation schema for the reservation notes update form.
 */
export const UpdateReservationNotesFormSubmitSchema = z.object({
    /** The administrative text to be associated with the reservation record. */
    notes: NonEmptyStringSchema.optional().nullable(),
});

/**
 * TypeScript type inferred from {@link UpdateReservationNotesFormSubmitSchema}.
 * Represents the data structure expected by the note-update service.
 */
export type UpdateReservationNotesFormSubmit = z.infer<typeof UpdateReservationNotesFormSubmitSchema>;