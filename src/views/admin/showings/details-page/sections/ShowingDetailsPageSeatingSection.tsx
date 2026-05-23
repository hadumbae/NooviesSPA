/**
 * @fileoverview Seating section for the showing details page that displays the seat map layout and details panel.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {
    SeatMapDetailsPanelContext
} from "@/domains/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";
import simplifySeatMapDetails from "@/domains/seatmap/utilities/simplifySeatMapDetails.ts";
import SeatMapFormContextProvider from "@/domains/seatmap/context/seat-map-form-context/SeatMapFormContextProvider.tsx";
import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import {cn} from "@/common/lib/utils.ts";
import {CardCSS} from "@/common/constants/css/ContainerCSS.ts";
import {
    SeatMapDetailsPanel
} from "@/domains/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapDetailsPanel.tsx";
import {
    ShowingSeatMapLayout
} from "@/domains/seatmap/components/features/admin/seat-map-layout/ShowingSeatMapLayout.tsx";
import {ShowingDetails} from "@/domains/showings/schema/showing";

/** Props for the ShowingDetailsPageSeatingSection component. */
type SectionProps = {
    className?: string;
    showing: ShowingDetails;
    seating: SeatMapDetails[];
};

/**
 * Displays the interactive seat map and management panel for a specific showing.
 */
export function ShowingDetailsPageSeatingSection(
    {showing, seating, className}: SectionProps
): ReactElement {
    const {seatMap} = useRequiredContext({context: SeatMapDetailsPanelContext});

    const simplifiedSeatMap = seatMap
        ? simplifySeatMapDetails(seatMap)
        : undefined;

    return (
        <section className="space-y-3">
            <PageSectionHeader text="Seating"/>

            <SeatMapFormContextProvider
                isPanel={true}
                editEntity={simplifiedSeatMap}
                disableFields={["seat"]}
            >
                <div className={cn(CardCSS, "p-3")}>
                    <ShowingSeatMapLayout
                        seating={seating}
                        className={className}
                    />
                </div>

                {
                    seatMap && (
                        <SeatMapDetailsPanel showing={showing}/>
                    )
                }
            </SeatMapFormContextProvider>
        </section>
    );
}
