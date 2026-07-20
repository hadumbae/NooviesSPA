/**
 * @fileoverview Seating section for the showing details page that displays the seat map layout and details panel.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {useRequiredContext} from "@/common/_feat/use-context/useRequiredContext.ts";
import {
    SeatMapDetailsPanelStateContext
} from "@/domains/seatmaps/_ctx/details-panel-context/SeatMapDetailsPanelStateContext.ts";

import {ShowingDetails} from "@/domains/showings";
import {SeatMapDetails} from "@/domains/seatmaps";
import {SeatMapDetailsPanel, ShowingSeatMapLayout} from "@/views/admin/seatmaps";

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
    const {seatMap} = useRequiredContext({context: SeatMapDetailsPanelStateContext});

    return (
        <section className="space-y-3">
            <PageSectionHeader text="Seating"/>

            <div className="default-card p-3">
                <ShowingSeatMapLayout seating={seating} className={className}/>
            </div>

            {seatMap && <SeatMapDetailsPanel showing={showing}/>}
        </section>
    );
}
