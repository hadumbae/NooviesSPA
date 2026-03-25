/**
 * @file Zod schema for validating system-generated reservation verification codes.
 * @filename ReservationUniqueCodeSchema.ts
 */

import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {z} from "zod";

/**
 * Validates the unique ticket identifier against the standard system format.
 * * **Example:** `RES-K9P2W-LM4X1`
 */
export const ReservationUniqueCodeSchema = StringValueSchema.regex(
    /^RES-[A-Z0-9]{5}-[A-Z0-9]{5}$/,
    {message: "Invalid format. Expected RES-XXXXX-XXXXX (e.g., RES-K9P2W-LM4X1)"},
);

/**
 * TypeScript type inferred from {@link ReservationUniqueCodeSchema}.
 */
export type ReservationUniqueCode = z.infer<typeof ReservationUniqueCodeSchema>;