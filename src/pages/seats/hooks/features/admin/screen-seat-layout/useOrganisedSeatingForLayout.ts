import organiseSeatsForLayout from "@/pages/seats/hooks/features/admin/screen-seat-layout/organiseSeatsForLayout.ts";
import {useMemo} from "react";
import {GridPositionedSeat} from "@/pages/seats/types/GridPositionedSeat.ts";

/**
 * @summary
 * Parameters for organizing seating into a layout-ready grid.
 */
type SeatProps<TSeat extends GridPositionedSeat> = {
    /** Flat list of seats with grid positioning data */
    seating: TSeat[];
};

/**
 * @summary
 * Prepares seat data for grid-based layout rendering.
 *
 * @remarks
 * - Organizes seats into a normalized 2D structure
 * - Memoizes derived row entries for efficient rendering
 * - Computes CSS Grid styles based on grid dimensions
 *
 * Intended for admin-facing screen and seat layout components.
 *
 * @param params
 * Seating data to organize.
 *
 * @returns
 * Organized seat grid, grid bounds, row entries, and layout styles.
 */
export default function useOrganisedSeatingForLayout<
    TSeat extends GridPositionedSeat
>(params: SeatProps<TSeat>) {
    const {seating} = params;

    // --- Get Sorted Seats ---
    const {sortedSeats, maxX, maxY} = useMemo(
        () => organiseSeatsForLayout({seats: seating}),
        [seating],
    );

    const seatRowEntries = useMemo(
        () => Array.from(sortedSeats),
        [sortedSeats]
    );

    // --- Grid Styling ---
    const layoutGridStyle = useMemo(
        () => ({
            display: "grid",
            gridTemplateColumns: `0.5fr repeat(${maxX + 1}, 1fr)`,
            gap: "0.25rem",
        }),
        [maxX]
    );

    return {
        sortedSeats,
        seatRowEntries,
        maxX,
        maxY,
        layoutGridStyle,
    };
}
