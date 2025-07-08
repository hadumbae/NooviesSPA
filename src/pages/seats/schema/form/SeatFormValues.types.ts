import {z} from "zod";
import {SeatFormValuesSchema, SeatsByRowFormValuesSchema} from "@/pages/seats/schema/form/SeatFormValues.schema.ts";

/**
 * Type representing the form values for a single seat.
 * Inferred from {@link SeatFormValuesSchema}.
 */
export type SeatFormValues = z.infer<typeof SeatFormValuesSchema>;

/**
 * Type representing the form values for a group of seats in a row.
 * Inferred from {@link SeatsByRowFormValuesSchema}.
 */
export type SeatsByRowFormValues = z.infer<typeof SeatsByRowFormValuesSchema>;