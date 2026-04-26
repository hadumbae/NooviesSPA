/**
 * @fileoverview React hook for transforming flat seating arrays into memoized 2D grid structures and CSS styles.
 */

import organiseSeatsForLayout from "@/domains/seats/_feat/handle-seat-layout/organiseSeatsForLayout.ts";
import {useMemo} from "react";
import {GridPositionedSeat} from "@/domains/seats/types/GridPositionedSeat.ts";

/** Parameters for the useOrganisedSeatingForLayout hook. */
type SeatProps<TSeat extends GridPositionedSeat> = {
    seating: TSeat[];
    includeLabels?: boolean;
};

/**
 * Normalizes seating data into a row-indexed map and generates corresponding CSS grid configurations.
 */
export function useOrganisedSeatingForLayout<TSeat extends GridPositionedSeat>(
    {seating, includeLabels = true}: SeatProps<TSeat>
) {
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

export default useOrganisedSeatingForLayout;