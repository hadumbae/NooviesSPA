/**
 * @fileoverview Zod schema for validating system-generated reservation verification codes.
 */

import {StringValueSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating the unique reservation identifier format. */
export const ReservationUniqueCodeSchema = StringValueSchema.regex(
    /^RES-[A-Z0-9]{5}-[A-Z0-9]{5}$/,
    {message: "Invalid format. Expected RES-XXXXX-XXXXX (e.g., RES-K9P2W-LM4X1)"},
);

/** TypeScript type inferred from ReservationUniqueCodeSchema. */
export type ReservationUniqueCode = z.infer<typeof ReservationUniqueCodeSchema>;