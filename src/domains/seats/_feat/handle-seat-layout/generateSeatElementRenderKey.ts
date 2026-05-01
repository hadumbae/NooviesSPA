/**
 * @fileoverview Utility function for generating stable React key values for elements rendered in the seat layout grid.
 */

import {GridPositionedSeat} from "./GridPositionedSeat.ts";

/** Generates a stable and unique React key for an element in the seat layout grid. */
export function generateSeatElementRenderKey<TElement extends GridPositionedSeat>(
    element: TElement | number | null,
    index: number
): string {
    if (element === null) return `null-${index}`;
    if (typeof element === "number") return `num-${element}-${index}`;
    return `seat-${String(element._id)}`;
}