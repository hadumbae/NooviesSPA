import {z} from "zod";
import {SeatFormSchema} from "@/pages/seats/schema/form/SeatForm.schema.ts";

/**
 * Type representing a **fully validated seat**.
 *
 * Uses `SeatFormSchema` as the source of truth.
 * All fields are validated according to their strict types (IDs, positive numbers, enums, etc.).
 */
export type SeatForm = z.infer<typeof SeatFormSchema>;

