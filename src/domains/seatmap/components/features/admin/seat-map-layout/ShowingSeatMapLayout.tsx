/**
 * @fileoverview Renders the seat-map layout for a single movie showing.
 */

import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import {useOrganisedSeatingForLayout} from "@/domains/seats/_feat/handle-seat-layout/useOrganisedSeatingForLayout.ts";
import {generateSeatElementRenderKey} from "@/domains/seats/_feat/handle-seat-layout";
import {
    ShowingSeatMapElement
} from "@/domains/seatmap/components/features/admin/seat-map-layout/ShowingSeatMapElement.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

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

