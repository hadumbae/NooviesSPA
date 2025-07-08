import {z} from "zod";
import {SeatFormSchema, SeatsByRowFormSchema} from "@/pages/seats/schema/form/SeatForm.schema.ts";

/**
 * Type representing a validated individual seat form.
 *
 * Inferred from {@link SeatFormSchema}.
 * Includes all fields required for defining a single seat.
 */
export type SeatForm = z.infer<typeof SeatFormSchema>;

/**
 * Type representing a validated seat-by-row form.
 *
 * Inferred from {@link SeatsByRowFormSchema}.
 * Includes all fields required for defining a row of seats.
 */
export type SeatsByRowForm = z.infer<typeof SeatsByRowFormSchema>;