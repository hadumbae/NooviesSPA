/**
 * Mapping of seat layout type constants to human-readable labels.
 *
 * Converts the internal layout type values used in the system to
 * display-friendly strings for UI components, forms, and tables.
 *
 * @example
 * ```ts
 * const label = SeatLayoutTypeLabelMap["SEAT"]; // "Seat"
 * const label2 = SeatLayoutTypeLabelMap["AISLE"]; // "Aisle"
 * ```
 */
export default {
    "SEAT": "Seat",
    "AISLE": "Aisle",
    "STAIR": "Stair",
} as const;

