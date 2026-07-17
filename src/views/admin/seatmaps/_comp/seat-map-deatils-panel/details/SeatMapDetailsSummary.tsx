/**
 * @fileoverview Summary section for displaying seat map pricing and status metadata.
 */

import {ReactElement} from "react";
import {DetailsCardSpan} from "@/common/components/text/DetailsCardSpan.tsx";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {SeatMapDetails} from "@/domains/seatmaps";
import {SectionTitle} from "@/views/common/_comp";

/** Props for the SeatMapDetailsSummary component. */
type SectionProps = {
    seatMap: SeatMapDetails;
};

/**
 * Displays a summary of seat map pricing details and current status.
 */
export function SeatMapDetailsSummary(
    {seatMap}: SectionProps
): ReactElement {
    const {basePrice, priceMultiplier, overridePrice, finalPrice, status} = seatMap;

    const formattedPrice = overridePrice ?? "None";
    const formattedStatus = convertToTitleCase(status);

    return (
        <section>
            <SectionTitle>Seat Map</SectionTitle>

            <div className="rounded-container-border space-y-1 py-2 px-5">
                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Base Price" text={basePrice}/>
                    <DetailsCardSpan label="x Price" text={`x${priceMultiplier}`}/>
                    <DetailsCardSpan label="Override" text={formattedPrice}/>
                </div>

                <div className="flex justify-center items-center space-x-10">
                    <DetailsCardSpan label="Final Price" text={finalPrice}/>
                    <DetailsCardSpan label="Status" text={formattedStatus}/>
                </div>
            </div>
        </section>
    );
}
