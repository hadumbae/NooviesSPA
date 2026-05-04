/**
 * @fileoverview Renders a structured grid of theatre seats with axis labels.
 */

import {memo, ReactElement, useMemo} from "react";
import {buildSeatLayoutMap, generateSeatElementRenderKey} from "@/domains/seats/_feat/handle-seat-layout";
import ScreenSeatLayoutElement from "@/domains/seats/components/features/screen-seats/ScreenSeatLayoutElement.tsx";

import {SeatDetails} from "@/domains/seats/schema/model";

/** Props for the ScreenSeatLayout component. */
type GridProps = {
    seating: SeatDetails[];
};

/**
 * Displays a dynamic seating map organized by row and column coordinates.
 */
const ScreenSeatLayout = ({seating}: GridProps): ReactElement => {
    const {sortedSeats, maxX} = buildSeatLayoutMap({seating});
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
};

export default memo(ScreenSeatLayout);