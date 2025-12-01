import { z } from "zod";
import SeatLayoutTypeConstant from "@/pages/seats/constants/SeatLayoutTypeConstant.ts";

/**
 * ## SeatLayoutTypeEnumSchema
 *
 * Zod schema for validating seat layout types.
 * Ensures that a given value is one of the predefined constants
 * defined in {@link SeatLayoutTypeConstant}.
 *
 * @remarks
 * This schema is commonly used for:
 * - Form validation
 * - Type-safe assignment in UI components
 * - Integration with Mongoose models or Zod-based APIs
 *
 * ### Validation Behavior
 * - Accepts only values from {@link SeatLayoutTypeConstant}.
 * - Throws `required_error` if the value is missing.
 * - Throws `invalid_type_error` if the value is not valid.
 *
 * ### Layout Types
 * - `"SEAT"` — Standard bookable seat.
 * - `"AISLE"` — Non-seat spacing for rows/columns separation.
 * - `"STAIR"` — Passage section for stepping between rows.
 *
 * @example
 * ```ts
 * SeatLayoutTypeEnumSchema.parse("SEAT");   // ✅ Valid
 * SeatLayoutTypeEnumSchema.parse("AISLE");  // ✅ Valid
 * SeatLayoutTypeEnumSchema.parse("STAIR");  // ✅ Valid
 * SeatLayoutTypeEnumSchema.parse("BENCH");  // ❌ Throws "Must be: SEAT, AISLE, STAIR"
 * SeatLayoutTypeEnumSchema.parse(undefined); // ❌ Throws "Seat Layout is required."
 * ```
 */
export const SeatLayoutTypeEnumSchema = z.enum(SeatLayoutTypeConstant, {
    required_error: "Seat Layout is required.",
    invalid_type_error: `Must be: ${SeatLayoutTypeConstant.join(", ")}`,
});

/**
 * ## SeatLayoutType
 *
 * TypeScript type representing all valid seat layout types
 * defined in {@link SeatLayoutTypeConstant}.
 *
 * Equivalent to:
 * ```ts
 * type SeatLayoutType = "SEAT" | "AISLE" | "STAIR";
 * ```
 */
export type SeatLayoutType = z.infer<typeof SeatLayoutTypeEnumSchema>;
