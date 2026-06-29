/**
 * @fileoverview Renders the seat-map layout for a single movie showing.
 */

import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

import {SeatMapDetails} from "@/domains/seatmaps";
import {generateSeatElementRenderKey, useOrganisedSeatingForLayout} from "@/domains/seats";
import {ShowingSeatMapElement} from "@/views/admin/seatmaps/_comp/showing-seat-map-layout/ShowingSeatMapElement.tsx";

/** Props for the ShowingSeatMapLayout component. */
type LayoutProps = {
    seating: SeatMapDetails[];
    className?: string;
};

/** Renders the seat-map layout for a single movie showing. */
export function ShowingSeatMapLayout({seating, className}: LayoutProps): ReactElement {
    const {seatRowEntries, layoutGridStyle} = useOrganisedSeatingForLayout({seating});

    return (
        <div className={cn("space-y-2", className)}>
            {seatRowEntries.map(([y, rowSeats]) => (
                <div style={layoutGridStyle} key={y}>
                    <ShowingSeatMapElement element={y}/>

                    {rowSeats.map((element, index) => (
                        <ShowingSeatMapElement
                            key={generateSeatElementRenderKey(element, index)}
                            element={element}
                        />
                    ))}

                    <ShowingSeatMapElement element={y}/>
                </div>
            ))}
        </div>
    );
}

