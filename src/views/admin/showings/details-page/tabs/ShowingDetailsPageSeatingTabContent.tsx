/**
 * @fileoverview Seating tab content for the Showing Details admin page.
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {cn} from "@/common/lib/utils.ts";
import {CardCSS} from "@/common/constants/css/ContainerCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {
    ShowingSeatMapLayout
} from "@/domains/seatmap/components/features/admin/seat-map-layout/ShowingSeatMapLayout.tsx";
import {
    SeatMapDetailsPanel
} from "@/domains/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapDetailsPanel.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatMapFormContext} from "@/domains/seatmap/context/seat-map-form-context/SeatMapFormContext.ts";
import {
    ShowingDetailsPageContext
} from "@/domains/showings/context/showing-details-page-context/ShowingDetailsPageContext.ts";
import {ReactElement} from "react";

/** Props for the ShowingDetailsPageSeatingTabContent component. */
type ContentProps = {
    className?: string;
    selectedSeatMap?: SeatMapDetails | null;
};

/** Renders the seating tab content for a showing. */
export function ShowingDetailsPageSeatingTabContent(props: ContentProps): ReactElement {
    const {className, selectedSeatMap} = props;

    const {showing, seating} = useRequiredContext({context: ShowingDetailsPageContext});
    useRequiredContext({context: SeatMapFormContext});

    return (
        <TabsContent value="seating-tab" className={className}>
            <PrimaryHeaderText>Seating</PrimaryHeaderText>

            <section className={cn(CardCSS, "p-3")}>
                <SectionHeader srOnly>Seat Map Layout</SectionHeader>
                <ShowingSeatMapLayout seating={seating}/>
            </section>

            {selectedSeatMap && (
                <SeatMapDetailsPanel showing={showing}/>
            )}
        </TabsContent>
    );
}

