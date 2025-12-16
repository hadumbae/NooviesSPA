/**
 * @file ShowingDetailsPageSeatingTabContent.tsx
 *
 * @summary
 * Seating tab content for the Showing Details admin page.
 *
 * @description
 * Renders the seating overview for a showing, including:
 * - The full seat map layout for the selected showing
 * - An optional seat map details panel when a seat map is selected
 *
 * This component consumes data from:
 * - {@link ShowingDetailsPageContext} for showing and seating data
 * - {@link SeatMapFormContext} for seat-map form and panel configuration
 */

import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {cn} from "@/common/lib/utils.ts";
import {CardCSS} from "@/common/constants/css/ContainerCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import ShowingSeatMapLayout from "@/pages/seatmap/components/features/admin/seat-map-layout/ShowingSeatMapLayout.tsx";
import SeatMapDetailsPanel
    from "@/pages/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapDetailsPanel.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatMapFormContext} from "@/pages/seatmap/context/seat-map-form-context/SeatMapFormContext.ts";
import {
    ShowingDetailsPageContext
} from "@/pages/showings/context/showing-details-page-context/ShowingDetailsPageContext.ts";

/**
 * Props for {@link ShowingDetailsPageSeatingTabContent}.
 */
type ContentProps = {
    /**
     * Optional class name applied to the tab container.
     */
    className?: string;

    /**
     * The currently selected seat map, if any.
     *
     * When provided, the seat map details panel is rendered.
     */
    selectedSeatMap?: SeatMapDetails | null;
};

/**
 * Renders the seating tab content for a showing.
 *
 * @remarks
 * - Always displays the seat map layout for the showing
 * - Conditionally displays {@link SeatMapDetailsPanel} when a seat map is selected
 * - Relies on required page- and form-level contexts for data and configuration
 *
 * @returns
 * The seating tab content wrapped in a {@link TabsContent} container.
 */
const ShowingDetailsPageSeatingTabContent = (props: ContentProps) => {
    const {className, selectedSeatMap} = props;

    // --- Access Page Context ---
    const {showing, seating} = useRequiredContext({context: ShowingDetailsPageContext});

    // --- Access Form Context ---
    const {options = {}} = useRequiredContext({context: SeatMapFormContext});

    return (
        <TabsContent value="seating-tab" className={className}>
            <PrimaryHeaderText>Seating</PrimaryHeaderText>

            <section className={cn(CardCSS, "p-3")}>
                <SectionHeader srOnly>Seat Map Layout</SectionHeader>
                <ShowingSeatMapLayout seating={seating}/>
            </section>

            {selectedSeatMap && (
                <SeatMapDetailsPanel {...options} showing={showing}/>
            )}
        </TabsContent>
    );
};

export default ShowingDetailsPageSeatingTabContent;
