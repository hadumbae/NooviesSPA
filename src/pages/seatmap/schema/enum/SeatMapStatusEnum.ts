import { z } from "zod";
import SeatMapStatusConstant from "@/pages/seatmap/constants/SeatMapStatusConstant.ts";

/**
 * Zod schema representing all valid SeatMap status values.
 *
 * Uses `SeatMapStatusConstant` as the source of allowed values.
 *
 * Validation:
 * - Required: Field must be present.
 * - Must be one of the predefined SeatMap status constants.
 *
 * @example
 * ```ts
 * import { SeatMapStatusEnum } from './SeatMapStatusEnum';
 *
 * const status = SeatMapStatusEnum.parse("AVAILABLE"); // Valid
 * const invalid = SeatMapStatusEnum.parse("INVALID"); // Throws ZodError
 * ```
 */
export const SeatMapStatusEnum = z.enum(
    SeatMapStatusConstant,
    {
        required_error: "Required.",
        invalid_type_error: `Invalid value. Must be: ${SeatMapStatusConstant.join(", ")}`,
    },
);

/**
 * TypeScript type representing all possible SeatMap status values.
 *
 * Equivalent to `typeof SeatMapStatusEnum[number]`.
 */
export type SeatMapStatus = z.infer<typeof SeatMapStatusEnum>;
