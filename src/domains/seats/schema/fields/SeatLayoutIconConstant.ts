/**
 * @fileoverview Map of seat layout types to their corresponding Lucide icons.
 */

import { Footprints, Sofa, SquareChevronUp } from "lucide-react";

/** A mapping between seat layout classification strings and the Lucide icons used to represent them visually. */
export const SeatLayoutIconConstant = {
    SEAT: Sofa,
    STAIR: SquareChevronUp,
    AISLE: Footprints,
} as const;