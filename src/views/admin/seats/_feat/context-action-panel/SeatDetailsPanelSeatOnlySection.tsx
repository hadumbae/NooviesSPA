/**
 * @fileoverview Renders the detailed seat-only information section inside the seat-details panel.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/domains/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {SeatTypeLabelMap} from "@/domains/seats/schema/fields";
import {ReactElement} from "react";

/** Seat information section for the seat-details panel. */
export function SeatDetailsPanelSeatOnlySection(): ReactElement {
    const {seat} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`."
    });

    if (!seat) throw new Error("Seat is missing in component.");
    if (seat.layoutType !== "SEAT") throw new Error("Seat must be of `SEAT` layout type.");

    const {row, x, y, seatNumber, seatType, priceMultiplier, isAvailable} = seat;

    return (
        <section className="space-y-4 p-2">
            <div className="grid grid-cols-3 gap-4 text-center">
                <DetailsCardSpan label="Row" text={row}/>
                <DetailsCardSpan label="Seat Number" text={seatNumber}/>
                <DetailsCardSpan label="Type" text={SeatTypeLabelMap[seatType]}/>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <DetailsCardSpan label="X, Y" text={`${x}, ${y}`}/>
                <DetailsCardSpan label="Price Multiplier" text={`x${priceMultiplier}`}/>
                <DetailsCardSpan label="Is Available?" text={isAvailable ? "Yes" : "No"}/>
            </div>
        </section>
    );
}