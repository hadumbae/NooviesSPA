/**
 * ## SeatTypeLabelMap
 *
 * A human-readable label map for seat types defined in `SeatTypeConstant`.
 *
 * This object converts internal, machine-friendly seat type identifiers
 * (e.g., `"EXTRA-LEGROOM"`, `"D-BOX"`, `"ACCESSIBLE"`) into user-friendly
 * display labels suitable for UI components, dropdowns, tables, and public-facing
 * interfaces.
 *
 * ### Purpose
 * - Decouples internal constant values from UI display text.
 * - Ensures consistent labeling across all frontend components.
 * - Prevents duplication of label definitions in multiple files.
 *
 * ### Example Usage
 * ```ts
 * import SeatTypeLabelMap from "@/pages/seats/constants/SeatTypeLabelMap";
 *
 * const seatType = "EXTRA-LEGROOM";
 * const label = SeatTypeLabelMap[seatType];
 * // "Extra-Legroom"
 * ```
 *
 * ### Notes
 * - Defined as `as const` to preserve literal types for keys and values.
 * - Keys correspond directly to entries in `SeatTypeConstant`.
 * - Values are the canonical human-readable text strings.
 */
export default {
    "REGULAR": "Regular",
    "PREMIUM": "Premium",
    "VIP": "VIP",
    "RECLINER": "Recliner",
    "LOVESEAT": "Loveseat",
    "ACCESSIBLE": "Accessible",
    "COMPANION": "Companion",
    "D-BOX": "D-Box",
    "HAPTIC": "Haptic",
    "EXTRA-LEGROOM": "Extra-Legroom",
    "BALCONY": "Balcony",
    "CUDDLE COUCH": "Cuddle Couch",
    "POD": "Pod",
    "BOX": "Box",
    "BEAN BAG": "Bean Bag",
    "FLOOR": "Floor",
    "BUDGET": "Budget",
    "STANDING SPACE": "Standing Space",
} as const;
