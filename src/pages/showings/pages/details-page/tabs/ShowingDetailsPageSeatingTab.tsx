import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatMapDetailsPanelContext} from "@/pages/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";
import simplifySeatMapDetails from "@/pages/seatmap/utilities/simplifySeatMapDetails.ts";
import SeatMapFormContextProvider from "@/pages/seatmap/context/seat-map-form-context/SeatMapFormContextProvider.tsx";
import ShowingDetailsPageSeatingTabContent
    from "@/pages/showings/pages/details-page/tabs/ShowingDetailsPageSeatingTabContent.tsx";

/**
 * @type TabProps
 * @description
 * Props for {@link ShowingDetailsPageSeatingTab}.
 */
type TabProps = {
    /**
     * Optional class name applied to the root container.
     */
    className?: string;
};

/**
 * @component ShowingDetailsPageSeatingTabContent
 * @description
 * Renders the seating tab content for the showing details admin page.
 *
 * Displays the full seat-map layout within a styled card container,
 * including accessible section headers and admin-oriented layout
 * components.
 */
const ShowingDetailsPageSeatingTab = ({className}: TabProps) => {
    // --- Access Seat Map ---
    const {seatMap} = useRequiredContext({context: SeatMapDetailsPanelContext});

    const simplifiedSeatMap = seatMap
        ? simplifySeatMapDetails(seatMap)
        : undefined;

    // --- Render ---
    return (
        <SeatMapFormContextProvider
            isPanel={true}
            editEntity={simplifiedSeatMap}
            disableFields={["seat"]}
        >
            <ShowingDetailsPageSeatingTabContent
                className={className}
                selectedSeatMap={seatMap}
            />
        </SeatMapFormContextProvider>
    );
};

export default ShowingDetailsPageSeatingTab;
