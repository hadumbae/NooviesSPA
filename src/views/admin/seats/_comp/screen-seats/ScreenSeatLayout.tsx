/**
 * @fileoverview Renders a structured grid of theatre seats with axis labels.
 */

import {ReactElement, useMemo} from "react";
import {buildSeatLayoutMap, generateSeatElementRenderKey, SeatDetails} from "@/domains/seats";
import {ScreenSeatLayoutElement} from "@/views/admin/seats/_comp/screen-seats/ScreenSeatLayoutElement.tsx";

/** Props for the ScreenSeatLayout component. */
type GridProps = {
    seating: SeatDetails[];
};

/**
 * Displays a dynamic seating map organised by row and column coordinates.
 */
export function ScreenSeatLayout(
    {seating}: GridProps
): ReactElement {
    const {sortedSeats, maxX} = useMemo(
        () => buildSeatLayoutMap({seating}),
        [seating],
    );

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
                    <ScreenSeatLayoutElement element={y}/>

                    {rowSeats.map((element, index) => (
                        <ScreenSeatLayoutElement
                            key={generateSeatElementRenderKey(element, index)}
                            element={element}
                        />
                    ))}

                    <ScreenSeatLayoutElement element={y}/>
                </div>
            ))}
        </div>
    );
}