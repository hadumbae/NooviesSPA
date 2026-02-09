/**
 * @file organiseSeatsForLayout.ts
 *
 * Normalizes a flat seat list into a 2D grid for layout rendering.
 *
 * Responsibilities:
 * - Groups seats by row (`y`) and orders by column (`x`)
 * - Normalizes row widths using `null` placeholders
 * - Optionally prepends a numeric column-label row at `y = 0`
 *
 * Intended for grid-based seat map UIs.
 */

import {GridPositionedSeat} from "@/pages/seats/types/GridPositionedSeat.ts";

/**
 * Parameters for {@link organiseSeatsForLayout}.
 */
type SortParams<TSeat extends GridPositionedSeat> = {
    /** Flat list of positioned seats */
    seats: TSeat[];

    /** Whether to include a numeric column-label row */
    includeLabels?: boolean;
};

/**
 * Return shape of {@link organiseSeatsForLayout}.
 */
type SortReturns<TSeat extends GridPositionedSeat> = {
    /**
     * Row-indexed seat grid.
     *
     * @remarks
     * - Keys represent `y` coordinates (descending)
     * - Rows are ordered by `x`
     * - Missing positions are filled with `null`
     * - Row `0` contains numeric column labels (`1..maxX`) when enabled
     */
    sortedSeats: Map<number, (TSeat | number | null)[]>;

    /** Maximum column index (`x`) */
    maxX: number;

    /** Maximum row index (`y`) */
    maxY: number;
};

/**
 * Organizes seats into a normalized 2D grid.
 *
 * Useful for UI components that require consistent row/column
 * alignment (e.g. seat maps, screen layouts).
 *
 * @param params - Seat list and layout options
 * @returns Normalized seat grid with computed bounds
 *
 * @example
 * ```ts
 * const { sortedSeats, maxX, maxY } =
 *   organiseSeatsForLayout({ seats });
 *
 * const row = sortedSeats.get(5);
 * ```
 */
export default function organiseSeatsForLayout<TSeat extends GridPositionedSeat>(
    {seats, includeLabels = true}: SortParams<TSeat>
): SortReturns<TSeat> {
    if (!seats.length) {
        return {
            sortedSeats: new Map<number, (TSeat | number | null)[]>(),
            maxX: 0,
            maxY: 0,
        };
    }

    const maxCount: Record<"x" | "y", number> = {x: 0, y: 0};
    const seatMapLookup: Record<string, TSeat> = {};
    const rows = new Map<number, (TSeat | number | null)[]>();

    for (const seat of seats) {
        const {x, y} = seat;

        if (x > maxCount.x) maxCount.x = x;
        if (y > maxCount.y) maxCount.y = y;

        seatMapLookup[`${x}-${y}`] = seat;
    }

    for (let y = maxCount.y; y >= 1; y--) {
        const row = Array.from({length: maxCount.x}, (_, i) => {
            const x = i + 1;
            return seatMapLookup[`${x}-${y}`] ?? null;
        });

        rows.set(y, row);
    }

    if (includeLabels) {
        rows.set(0, Array.from({length: maxCount.x}, (_, i) => i + 1));
    }

    return {
        sortedSeats: rows,
        maxX: maxCount.x,
        maxY: maxCount.y,
    };
}