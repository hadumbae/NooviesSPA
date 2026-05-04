/**
 * @fileoverview Logic for transforming a flat array of seats into a structured 2D grid for layout rendering.
 */

import {GridPositionedSeat} from "./GridPositionedSeat.ts";

/** Parameters for organizing seats into a grid layout. */
type SortParams<TSeat extends GridPositionedSeat> = {
    seating: TSeat[];
    includeLabels?: boolean;
};

/** The resulting grid structure and calculated layout dimensions. */
type SortReturns<TSeat extends GridPositionedSeat> = {
    sortedSeats: Map<number, (TSeat | number | null)[]>;
    maxX: number;
    maxY: number;
};

/**
 * Organizes seats into a normalized 2D grid by coordinate mapping and placeholder insertion.
 */
export function buildSeatLayoutMap<TSeat extends GridPositionedSeat>(
    {seating, includeLabels = true}: SortParams<TSeat>
): SortReturns<TSeat> {
    if (!seating.length) {
        return {
            sortedSeats: new Map<number, (TSeat | number | null)[]>(),
            maxX: 0,
            maxY: 0,
        };
    }

    const maxCount: Record<"x" | "y", number> = {x: 0, y: 0};
    const seatMapLookup: Record<string, TSeat> = {};
    const rows = new Map<number, (TSeat | number | null)[]>();

    for (const seat of seating) {
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

