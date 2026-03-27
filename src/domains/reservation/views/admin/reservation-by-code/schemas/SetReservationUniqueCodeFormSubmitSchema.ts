/**
 * @file Zod schema for administrative search inputs targeting specific reservation codes.
 * @filename SetReservationUniqueCodeFormSubmitSchema.ts
 */

import {z} from "zod";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {ReservationUniqueCodeSchema} from "@/domains/reservation/schema/model";

/**
 * Validation schema for the reservation lookup form.
 */
export const SetReservationUniqueCodeFormSubmitSchema = z.object({
    /** The verification string provided by the user. */
    code: preprocessEmptyStringToUndefined(
        ReservationUniqueCodeSchema.optional(),
    ).optional(),
});

/**
 * TypeScript type inferred from {@link SetReservationUniqueCodeFormSubmitSchema}.
 */
export type SetReservationUniqueCodeForm = z.infer<typeof SetReservationUniqueCodeFormSubmitSchema>;