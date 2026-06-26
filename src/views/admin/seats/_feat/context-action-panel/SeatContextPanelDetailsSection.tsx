/**
 * @fileoverview Renders the related navigation section inside the Seat Details Context Panel.
 */

import {ReactElement} from "react";
import {Theater, TvMinimal} from "lucide-react";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import StackedIconCardLink from "@/common/components/navigation/logged-link/StackedIconCardLink.tsx";
import {SeatDetails, SeatTypeLabelMap} from "@/domains/seats";

/** Props for the SeatContextPanelDetailsSection component. */
type SectionProps = {
    seat: SeatDetails;
    closePanel: () => void;
};

/** Renders navigation links to the theatre and screen, and displays seat metadata if applicable. */
export function SeatContextPanelDetailsSection(
    {seat, closePanel}: SectionProps
): ReactElement {
    const {
        screen: {slug: screenSlug, name: screenName},
        theatre: {slug: theatreSlug, name: theatreName},
    } = seat;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 w-full">
                <StackedIconCardLink
                    to={`/admin/theatres/get/${theatreSlug}`}
                    icon={Theater}
                    text={theatreName}
                />

                <StackedIconCardLink
                    to={`/admin/theatres/get/${theatreSlug}/screen/${screenSlug}`}
                    onClick={() => closePanel()}
                    icon={TvMinimal}
                    text={screenName}
                />
            </div>

            {
                seat.layoutType === "SEAT" && (
                    <section className="space-y-4 p-2">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <DetailsCardSpan label="Row" text={seat.row}/>
                            <DetailsCardSpan label="Seat Number" text={seat.seatNumber}/>
                            <DetailsCardSpan label="Type" text={SeatTypeLabelMap[seat.seatType]}/>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <DetailsCardSpan label="X, Y" text={`${seat.x}, ${seat.y}`}/>
                            <DetailsCardSpan label="Price Multiplier" text={`x${seat.priceMultiplier}`}/>
                            <DetailsCardSpan label="Is Available?" text={seat.isAvailable ? "Yes" : "No"}/>
                        </div>
                    </section>
                )
            }
        </div>
    );
}