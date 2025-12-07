/**
 * @file organiseScreenSeatMap
 * @description
 * Utility for transforming a flat list of {@link SeatDetails} objects into a
 * **2D seat map structure** grouped by rows (`y`) and columns (`x`), suitable
 * for rendering seat layouts in grid-based UI components.
 *
 * The function normalizes seat rows so each row has an equal length, filling
 * missing seat positions with `null` to maintain grid alignment. A special
 * **label row (y = 0)** is added at the top, containing numeric column
 * indices for UI display.
 *
 * Returns an object describing:
 * - `sortedSeats`: A `Map<y, row[]>` where each row is ordered by `x`
 * - `maxX`: The maximum column index found
 * - `maxY`: The maximum row index found
 */

import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";

type SortParams = {
    /** Flat list of seat objects to be organized into a grid */
    seats: SeatDetails[];
};

type SortReturns = {
    /**
     * A mapping of row index (`y`) to an array of seats.
     *
     * - Rows are sorted **descending by y** (top row = highest y).
     * - Missing positions are represented as `null`.
     * - A label row is included at `y = 0`, containing numbers `1..maxX`.
     */
    sortedSeats: Map<number, (SeatDetails | number | null)[]>;
    /** Largest `x` coordinate among all seats */
    maxX: number;
    /** Largest `y` coordinate among all seats */
    maxY: number;
};

/**
 * Organizes a flat list of seats into a **normalized 2D row-based map**.
 *
 * The resulting map:
 * - Groups seats by their `y` coordinate
 * - Orders each row by `x`
 * - Normalizes each row length to `maxX` via `null` placeholders
 * - Adds a numeric label row at index `0`
 *
 * Useful for layout components such as `ScreenSeatLayout`, where consistent
 * row/column structure is required to render a visual seat chart.
 *
 * @param {SortParams} params
 * The list of seats to process.
 *
 * @returns {SortReturns}
 * A structured seat map, along with maximum grid bounds.
 *
 * @example
 * ```ts
 * const result = organiseScreenSeatMap({ seats });
 *
 * // Access a specific row:
 * const row5 = result.sortedSeats.get(5);
 *
 * // Render rows in order:
 * for (const [y, row] of result.sortedSeats) {
 *   console.log("Row", y, row);
 * }
 * ```
 */
export default function organiseScreenSeatMap({seats}: SortParams): SortReturns {
    if (!seats.length) {
        return {
            sortedSeats: new Map<number, SeatDetails[]>(),
            maxX: 0,
            maxY: 0,
        };
    }

    // ⚡ Get Max Values ⚡
    let maxX = 0;
    let maxY = 0;

    for (const seat of seats) {
        if (seat.x > maxX) maxX = seat.x;
        if (seat.y > maxY) maxY = seat.y;
    }

    // ⚡ Build Initial Row Buckets ⚡
    const rows = new Map<number, SeatDetails[]>();

    for (let y = 1; y <= maxY; y++) {
        rows.set(y, []);
    }

    // ⚡ Place Seats Into Rows ⚡
    for (const seat of seats) {
        rows.get(seat.y)!.push(seat);
    }

    // ⚡ Normalize Row Lengths ⚡
    const sortedSeats = new Map<number, (SeatDetails | number | null)[]>();
    const reversedY = Array.from(rows.keys()).sort((a, b) => b - a);

    for (const y of reversedY) {
        const row = rows.get(y);
        const seatRow: (SeatDetails | null)[] = Array.from({length: maxX}, () => null);

        for (const seat of row!) {
            seatRow[seat.x - 1] = seat;
        }

        sortedSeats.set(y, seatRow);
    }

    // ⚡ Add Column Label Row ⚡
    sortedSeats.set(0, Array.from({length: maxX}, (_, i) => i + 1));

    return {
        sortedSeats,
        maxX,
        maxY,
    };
}
