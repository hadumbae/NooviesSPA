/**
 * @file SeatLayoutIconConstant
 * @description
 * Maps seat layout types to their corresponding Lucide icons for use within
 * the screen seat layout UI.
 *
 * This constant provides a strongly-typed lookup object that ensures
 * each `layoutType` (e.g., `"SEAT"`, `"STAIR"`, `"AISLE"`) matches a specific
 * icon component from `lucide-react`.
 *
 * Intended for use in rendering visual elements inside
 * {@link ScreenSeatLayoutElement}, where each seat or layout tile displays
 * an appropriate icon.
 */

import { Footprints, Sofa, SquareChevronUp } from "lucide-react";

/**
 * A mapping between seat layout classification strings and the Lucide icons
 * used to represent them visually.
 *
 * @remarks
 * The keys correspond directly to the `layoutType` values used in
 * {@link SeatDetails} or {@link Seat}.
 *
 * - `"SEAT"` → A sofa icon
 * - `"STAIR"` → An upward chevron block icon
 * - `"AISLE"` → A footprints icon
 *
 * @example
 * ```tsx
 * import SeatLayoutIconConstant from "@/path/to/SeatLayoutIconConstant";
 *
 * const Icon = SeatLayoutIconConstant["SEAT"];
 *
 * return <Icon className="w-5 h-5" />;
 * ```
 */
const SeatLayoutIconConstant = {
    SEAT: Sofa,
    STAIR: SquareChevronUp,
    AISLE: Footprints,
} as const;

export default SeatLayoutIconConstant;
