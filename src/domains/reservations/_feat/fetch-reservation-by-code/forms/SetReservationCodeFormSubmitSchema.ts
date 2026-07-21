/**
 * @fileoverview Zod validation schema for administrative reservation code lookups.
 *
 */

import {z} from "zod";
import {
    preprocessEmptyToUndefined
} from "@/common/_feat/validation-preprocessors";
import {ReservationUniqueCodeSchema} from "@/domains/reservations/_schema/model";
import {AnyValues} from "@/common/_types";

/**
 * Zod validation schema for the reservation lookup form.
 */
export const SetReservationCodeFormSubmitSchema = z.object({
    code: preprocessEmptyToUndefined(
        ReservationUniqueCodeSchema.optional(),
    ).optional(),
});

/** Data structure for the reservation code lookup form. */
export type SetReservationCodeFormData = z.infer<typeof SetReservationCodeFormSubmitSchema>;

/** Type representing the raw input values for the reservation code form. */
export type SetReservationCodeFormValues = AnyValues<SetReservationCodeFormData>;