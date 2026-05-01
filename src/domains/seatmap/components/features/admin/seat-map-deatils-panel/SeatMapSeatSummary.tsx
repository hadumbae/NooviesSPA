/**
 * @fileoverview Renders a summary section for a single physical seat within the SeatMap details context panel.
 */

import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import { cn } from "@/common/lib/utils.ts";
import { SeatTypeLabelMap } from "@/domains/seats/schema/fields";
import { RoundedBorderCSS } from "@/common/constants/css/ContainerCSS.ts";
import { SeatDetails } from "@/domains/seats/schema/model";
import { ReactElement } from "react";
import {formatSeatLabel} from "@/domains/seats/_feat/formatters";

/** Props for the SeatMapSeatSummary component. */
type SectionProps = {
    seat: Extract<SeatDetails, { layoutType: "SEAT" }>;
};

/** Renders a summary section for a single physical seat within the SeatMap details context panel. */
export const SeatMapSeatSummary = ({ seat }: SectionProps): ReactElement => {
    const { x, y, seatType } = seat;

    const seatIdentifier = formatSeatLabel(seat);
    const formattedXY = `X${x}, Y${y}`;
    const formattedSeatType = SeatTypeLabelMap[seatType];

    return (
        <section>
            <SectionHeader>Seat</SectionHeader>

            <div
                className={cn(
                    RoundedBorderCSS,
                    "space-y-1 py-2 px-5 flex justify-between items-center"
                )}
            >
                <DetailsCardSpan label="Seat" text={seatIdentifier} />
                <DetailsCardSpan label="Seat Type" text={formattedSeatType} />
                <DetailsCardSpan label="XY" text={formattedXY} />
            </div>
        </section>
    );
};