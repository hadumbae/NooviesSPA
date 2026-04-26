/**
 * @fileoverview Renders a structured grid of theatre seats with axis labels.
 */

import { memo, ReactElement, useMemo } from "react";
import organiseSeatsForLayout from "@/domains/seats/_feat/handle-seat-layout/organiseSeatsForLayout.ts";
import ScreenSeatLayoutElement from "@/domains/seats/components/features/screen-seats/ScreenSeatLayoutElement.tsx";
import keyForSeatElement from "@/domains/seats/utilities/screen-seats/keyForSeatElement.ts";
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";

/** Props for the ScreenSeatLayout component. */
type GridProps = {
    seats: Seat[];
};

/**
 * Displays a dynamic seating map organized by row and column coordinates.
 */
const ScreenSeatLayout = ({ seats }: GridProps): ReactElement => {
    const { sortedSeats, maxX } = organiseSeatsForLayout({ seats });
    const seatEntries = useMemo(() => Array.from(sortedSeats), [sortedSeats]);

    const gridStyle = useMemo(
        () => ({
            display: "grid",
            gridTemplateColumns: `0.5fr repeat(${maxX + 1}, 1fr)`,
            gap: "0.25rem",
        }),
        [maxX]
    );

    return (
        <div className="space-y-2">
            {seatEntries.map(([y, rowSeats]) => (
                <div style={gridStyle} key={y}>
                    <ScreenSeatLayoutElement element={y} />

                    {rowSeats.map((element, index) => (
                        <ScreenSeatLayoutElement
                            key={keyForSeatElement(element, index)}
                            element={element}
                        />
                    ))}

                    <ScreenSeatLayoutElement element={y} />
                </div>
            ))}
        </div>
    );
};

export default memo(ScreenSeatLayout);