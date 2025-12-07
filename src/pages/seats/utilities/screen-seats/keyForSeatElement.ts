/**
 * @file keyForSeatElement
 * @description
 * Utility function for generating stable React `key` values for elements
 * rendered in the seat layout grid.
 *
 * The function accepts:
 * - A **seat object** (`Seat` or `SeatDetails`) → keyed by its `_id`.
 * - A **number** → typically used for axis labels, keyed by value + index.
 * - **null** → placeholder cells, keyed uniquely by index.
 *
 * This ensures React receives predictable and collision-free keys.
 */

import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import { SeatDetails } from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * Generates a unique, stable key string for a seat layout element.
 *
 * @param element
 * The element to generate a key for. Can be:
 * - `Seat` or `SeatDetails` — uses the seat's `_id`.
 * - `number` — combines value + index to ensure uniqueness.
 * - `null` — uses a consistent placeholder prefix.
 *
 * @param index
 * A fallback index used for cases where the element does not contain inherent
 * identity (numbers and `null`).
 *
 * @example
 * ```ts
 * keyForSeatElement(null, 0);               // "null-0"
 * keyForSeatElement(3, 1);                  // "num-3-1"
 * keyForSeatElement(seat, 5);               // "seat-64f1c0c8ab12..."
 * ```
 *
 * @returns A unique string suitable for use as a React `key`.
 */
export default function keyForSeatElement(
    element: Seat | SeatDetails | number | null,
    index: number
): string {
    if (element === null) {
        return `null-${index}`;
    }

    if (typeof element === "number") {
        return `num-${element}-${index}`;
    }

    return `seat-${String(element._id)}`;
}
