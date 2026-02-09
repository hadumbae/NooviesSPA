/**
 * @file useOrganisedSeatingForLayout.ts
 *
 * React hook for preparing seat data for grid-based layout rendering.
 *
 * Responsibilities:
 * - Normalizes seating into a 2D grid structure
 * - Memoizes derived row entries for efficient rendering
 * - Computes CSS Grid styles from grid dimensions
 *
 * Intended for admin-facing screen and seat layout components.
 */

import organiseSeatsForLayout from "@/pages/seats/hooks/features/admin/screen-seat-layout/organiseSeatsForLayout.ts";
import {useMemo} from "react";
import {GridPositionedSeat} from "@/pages/seats/types/GridPositionedSeat.ts";

/**
 * Parameters for {@link useOrganisedSeatingForLayout}.
 */
type SeatProps<TSeat extends GridPositionedSeat> = {
    /** Flat list of seats with grid positioning data */
    seating: TSeat[];

    /** Whether to include a numeric column-label row */
    includeLabels?: boolean;
};

/**
 * Prepares seat data for grid-based layout rendering.
 *
 * @remarks
 * - Delegates grid normalization to {@link organiseSeatsForLayout}
 * - Memoizes all derived values to avoid unnecessary recalculation
 * - Generates CSS Grid styles based on computed bounds
 *
 * @param params - Seating data and layout options
 * @returns Normalized grid data and layout helpers
 *
 * @example
 * ```ts
 * const {
 *   seatRowEntries,
 *   layoutGridStyle
 * } = useOrganisedSeatingForLayout({ seating });
 * ```
 */
export default function useOrganisedSeatingForLayout<
    TSeat extends GridPositionedSeat
>({seating, includeLabels = true}: SeatProps<TSeat>) {
    const {sortedSeats, maxX, maxY} = useMemo(
        () => organiseSeatsForLayout({seats: seating, includeLabels}),
        [seating, includeLabels],
    );

    const seatRowEntries = useMemo(
        () => Array.from(sortedSeats),
        [sortedSeats]
    );

    const layoutGridStyle = useMemo(
        () => ({
            display: "grid",
            gridTemplateColumns: `0.5fr repeat(${maxX + 1}, 1fr)`,
            gap: "0.25rem",
        }),
        [maxX]
    );

    return {
        maxX,
        maxY,
        sortedSeats,
        seatRowEntries,
        layoutGridStyle,
    };
}
