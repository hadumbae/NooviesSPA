/**
 * @file Zod schema and type for administrative reservation note update submissions.
 * @filename formSchema.ts
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Validation schema for submitting administrative updates to reservation notes.
 */
export const UpdateReservationNotesFormSubmitSchema = z.object({
    /**
     * The administrative commentary or audit notes to be persisted.
     * Handles empty string conversion to ensure clean database entries.
     */
    notes: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.optional().nullable()
    ),
});

/**
 * TypeScript type inferred from {@link UpdateReservationNotesFormSubmitSchema}.
 */
export type UpdateReservationNotesFormSubmit = z.infer<typeof UpdateReservationNotesFormSubmitSchema>;