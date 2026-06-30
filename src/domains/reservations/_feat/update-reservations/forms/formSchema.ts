/**
 * @fileoverview Zod schema and types for administrative reservation note update submissions.
 */

import {z} from "zod";
import {AnyValues} from "@/common/types";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";

/** Validation schema for submitting administrative updates to reservation notes. */
export const UpdateReservationNotesFormDataSchema = z.object({
    notes: preprocessEmptyStringToUndefined(
        NonEmptyStringSchema.optional().nullable()
    ),
});

/** TypeScript type inferred from UpdateReservationNotesFormDataSchema. */
export type UpdateReservationNotesFormData = z.infer<typeof UpdateReservationNotesFormDataSchema>;

/** Type representing the raw form values for reservation note updates. */
export type UpdateReservationNotesFormValues = AnyValues<UpdateReservationNotesFormData>;