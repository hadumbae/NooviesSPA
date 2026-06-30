/**
 * @fileoverview Renders a summary section for a single physical seat within the SeatMap details context panel.
 */

import {ReactElement} from "react";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {SectionTitle} from "@/views/common/_comp";
import {formatSeatLabel, SeatDetails, SeatTypeLabelMap} from "@/domains/seats";

/** Props for the SeatMapSeatSummary component. */
type SectionProps = {
    seat: Extract<SeatDetails, { layoutType: "SEAT" }>;
};

/** Renders a summary section for a single physical seat within the SeatMap details context panel. */
export const SeatMapSeatSummary = ({seat}: SectionProps): ReactElement => {
    const {x, y, seatType} = seat;

    const seatIdentifier = formatSeatLabel(seat);
    const formattedXY = `X${x}, Y${y}`;
    const formattedSeatType = SeatTypeLabelMap[seatType];

    return (
        <section>
            <SectionTitle>Seat</SectionTitle>

            <div className="rounded-container-border space-y-1 py-2 px-5 flex justify-between items-center">
                <DetailsCardSpan label="Seat" text={seatIdentifier}/>
                <DetailsCardSpan label="Seat Type" text={formattedSeatType}/>
                <DetailsCardSpan label="XY" text={formattedXY}/>
            </div>
        </section>
    );
};