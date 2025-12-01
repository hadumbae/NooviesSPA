import { z } from "zod";
import SeatTypeConstant from "@/pages/seats/constants/SeatTypeConstant.ts";

/**
 * ## SeatTypeEnum
 *
 * Zod schema for validating seat types.
 * Ensures that a given value is one of the predefined constants
 * defined in {@link SeatTypeConstant}.
 *
 * @remarks
 * This schema is commonly used for:
 * - Form validation
 * - Type-safe assignment in UI components
 * - Integration with Mongoose models or Zod-based APIs
 *
 * ### Validation Behavior
 * - Accepts only values from {@link SeatTypeConstant}.
 * - Throws `required_error` if the value is missing.
 * - Throws `invalid_type_error` if the value is not valid.
 *
 * @example
 * ```ts
 * SeatTypeEnum.parse("VIP");      // ✅ Valid
 * SeatTypeEnum.parse("REGULAR");  // ✅ Valid
 * SeatTypeEnum.parse("Invalid");  // ❌ Throws "Must be a valid seat type."
 * SeatTypeEnum.parse(undefined);  // ❌ Throws "Required."
 * ```
 */
export const SeatTypeEnum = z.enum(SeatTypeConstant, {
    required_error: "Required.",
    invalid_type_error: "Must be a valid seat type.",
    description: "The seat type of a seat.",
});

/**
 * ## SeatType
 *
 * TypeScript type representing all valid seat types
 * defined in {@link SeatTypeConstant}.
 *
 * Equivalent to:
 * ```ts
 * type SeatType = "REGULAR" | "PREMIUM" | "VIP" | "RECLINER" | ... | "STANDING SPACE";
 * ```
 */
export type SeatType = z.infer<typeof SeatTypeEnum>;
