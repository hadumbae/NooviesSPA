import { z } from "zod";
import {
    SeatFormSchema,
    SeatFormValuesSchema,
    SeatsByRowFormSchema,
    SeatsByRowFormValuesSchema
} from "@/pages/seats/schema/form/SeatForm.schema.ts";

/**
 * Type representing the **starter/default values** for a single seat form.
 *
 * Uses `SeatFormValuesSchema` as the source of truth.
 * Typically used for form initialization where some fields may be empty.
 */
export type SeatFormValues = z.infer<typeof SeatFormValuesSchema>;

/**
 * Type representing a **fully validated seat**.
 *
 * Uses `SeatFormSchema` as the source of truth.
 * All fields are validated according to their strict types (IDs, positive numbers, enums, etc.).
 */
export type SeatForm = z.infer<typeof SeatFormSchema>;

/**
 * Type representing the **starter/default values** when creating a row of seats.
 *
 * Based on `SeatsByRowFormValuesSchema`.
 * Omits individual seat-specific fields and adds `numberOfSeats` for bulk creation.
 */
export type SeatsByRowFormValues = z.infer<typeof SeatsByRowFormValuesSchema>;

/**
 * Type representing a **fully validated row of seats**.
 *
 * Based on `SeatsByRowFormSchema`.
 * Seat-specific fields are omitted and `numberOfSeats` is strictly validated as a positive number.
 */
export type SeatsByRowForm = z.infer<typeof SeatsByRowFormSchema>;
