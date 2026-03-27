/**
 * @file Zod schema for React Hook Form values targeting the reservation lookup.
 * @filename SetReservationUniqueCodeFormValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {
    SetReservationCodeFormSubmitSchema
} from "@/domains/reservation/views/admin/reservation-by-code/schemas/SetReservationCodeFormSubmitSchema.ts";
import {z} from "zod";

/**
 * Transforms the base form schema into a structure optimized for React Hook Form state.
 */
export const SetReservationCodeFormValuesSchema = generateFormValueSchema(SetReservationCodeFormSubmitSchema);

/**
 * TypeScript type inferred from {@link SetReservationCodeFormValuesSchema}.
 */
export type SetReservationCodeFormValues = z.infer<typeof SetReservationCodeFormValuesSchema>;