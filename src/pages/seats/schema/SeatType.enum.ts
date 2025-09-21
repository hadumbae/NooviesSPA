import { z } from "zod";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";

/**
 * Zod schema for validating seat types.
 *
 * Ensures the value is one of the predefined constants
 * from {@link SeatTypeConstant}.
 *
 * ### Example
 * ```ts
 * SeatTypeEnum.parse("VIP"); // ✅
 * SeatTypeEnum.parse("Invalid"); // ❌ "Must be a valid seat type."
 * SeatTypeEnum.parse(undefined); // ❌ "Required."
 * ```
 */
export const SeatTypeEnum = z.enum(SeatTypeConstant, {
    required_error: "Required.",
    invalid_type_error: "Must be a valid seat type.",
    description: "The seat type of a seat.",
});

/**
 * Type representing all valid seat types defined in {@link SeatTypeConstant}.
 */
export type SeatType = z.infer<typeof SeatTypeEnum>;
