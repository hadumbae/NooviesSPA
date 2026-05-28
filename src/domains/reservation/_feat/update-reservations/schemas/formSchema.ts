/**
 * @fileoverview Zod schema and types for administrative reservation note update submissions.
 *
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";
import {AnyValues} from "@/common/types";

/** Validation schema for submitting administrative updates to reservation notes. */
export const UpdateReservationNotesFormSubmitSchema = z.object({
    notes: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.optional().nullable()
    ),
});

/** TypeScript type inferred from UpdateReservationNotesFormSubmitSchema. */
export type UpdateReservationNotesFormSubmit = z.infer<typeof UpdateReservationNotesFormSubmitSchema>;

/** Type representing the raw form values for reservation note updates. */
export type UpdateReservationNotesFormValues = AnyValues<UpdateReservationNotesFormSubmit>;