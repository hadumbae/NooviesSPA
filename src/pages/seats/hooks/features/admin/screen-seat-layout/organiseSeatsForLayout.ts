/**
 * @file organiseSeatsForLayout
 * @summary
 * Transforms a flat list of seats into a normalized 2D seat grid.
 *
 * @remarks
 * - Groups seats by `y` (rows) and orders them by `x` (columns)
 * - Normalizes all rows to equal width using `null` placeholders
 * - Adds a numeric column-label row at `y = 0`
 *
 * Intended for grid-based seat layout rendering.
 */

import { GridPositionedSeat } from "@/pages/seats/types/GridPositionedSeat.ts";

/**
 * @summary
 * Parameters for seat grid organization.
 */
type SortParams<TSeat extends GridPositionedSeat> = {
    /** Flat list of seat objects */
    seats: TSeat[];
};

/**
 * @summary
 * Result of seat grid organization.
 */
type SortReturns<TSeat extends GridPositionedSeat> = {
    /**
     * Row-indexed seat grid.
     *
     * @remarks
     * - Keys represent `y` coordinates (descending order)
     * - Values are row arrays ordered by `x`
     * - Missing positions are represented as `null`
     * - Row `0` contains numeric column labels (`1..maxX`)
     */
    sortedSeats: Map<number, (TSeat | number | null)[]>;
    /** Maximum column index */
    maxX: number;
    /** Maximum row index */
    maxY: number;
};

/**
 * @summary
 * Organizes seats into a normalized 2D grid for layout rendering.
 *
 * @remarks
 * Useful for UI components that require consistent row/column
 * alignment (e.g. seat maps, screen layouts).
 *
 * @param params
 * Seat list to organize.
 *
 * @returns
 * Structured seat grid with computed bounds.
 *
 * @example
 * const result = organiseSeatsForLayout({ seats });
 *
 * const row5 = result.sortedSeats.get(5);
 *
 * for (const [y, row] of result.sortedSeats) {
 *   console.log("Row", y, row);
 * }
 */
export default function organiseSeatsForLayout<TSeat extends GridPositionedSeat>(
    { seats }: SortParams<TSeat>
): SortReturns<TSeat> {
    if (!seats.length) {
        return {
            sortedSeats: new Map<number, TSeat[]>(),
            maxX: 0,
            maxY: 0,
        };
    }

    let maxX = 0;
    let maxY = 0;

    for (const seat of seats) {
        if (seat.x > maxX) maxX = seat.x;
        if (seat.y > maxY) maxY = seat.y;
    }

    const rows = new Map<number, TSeat[]>();

    for (let y = 1; y <= maxY; y++) {
        rows.set(y, []);
    }

    for (const seat of seats) {
        rows.get(seat.y)!.push(seat);
    }

    const sortedSeats = new Map<number, (TSeat | number | null)[]>();
    const reversedY = Array.from(rows.keys()).sort((a, b) => b - a);

    for (const y of reversedY) {
        const seatRow: (TSeat | null)[] = Array.from(
            { length: maxX },
            () => null
        );

        for (const seat of rows.get(y)!) {
            seatRow[seat.x - 1] = seat;
        }

        sortedSeats.set(y, seatRow);
    }

    sortedSeats.set(0, Array.from({ length: maxX }, (_, i) => i + 1));

    return {
        sortedSeats,
        maxX,
        maxY,
    };
}
