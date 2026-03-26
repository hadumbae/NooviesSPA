/**
 * @file Zod schema for React Hook Form values targeting the reservation lookup.
 * @filename SetReservationUniqueCodeFormValuesSchema.ts
 */

import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {
    SetReservationUniqueCodeFormSchema
} from "@/domains/reservation/views/admin/reservation-by-code/schemas/SetReservationUniqueCodeFormSchema.ts";
import {z} from "zod";

/**
 * Transforms the base form schema into a structure optimized for React Hook Form state.
 */
export const SetReservationUniqueCodeFormValuesSchema = generateFormValueSchema(SetReservationUniqueCodeFormSchema);

/**
 * TypeScript type inferred from {@link SetReservationUniqueCodeFormValuesSchema}.
 */
export type SetReservationUniqueCodeFormValues = z.infer<typeof SetReservationUniqueCodeFormValuesSchema>;