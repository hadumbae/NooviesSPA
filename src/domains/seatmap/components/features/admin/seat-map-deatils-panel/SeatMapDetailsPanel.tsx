/**
 * @file SeatMapDetailsPanel.tsx
 *
 * @summary
 * Sliding details panel for inspecting and editing an individual seat map entry.
 *
 * @description
 * Renders a side sheet displaying detailed information about a selected seat map,
 * including seat metadata, status, references, and an optional edit form.
 *
 * The panel is fully controlled by {@link SeatMapDetailsPanelContext} and assumes
 * a valid seat map is present when rendered.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatMapDetailsPanelContext} from "@/domains/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/common/components/ui/Sheet";
import getSeatIdentifier from "@/domains/seats/utilities/formatters/get-seat-identifier/getSeatIdentifier.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import SeatTypeLabelMap from "@/domains/seats/constants/SeatTypeLabelMap.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import SeatMapSeatSummary
    from "@/domains/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapSeatSummary.tsx";
import SeatMapDetailsReferenceLinks
    from "@/domains/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapDetailsReferenceLinks.tsx";
import SeatMapDetailsSummary
    from "@/domains/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapDetailsSummary.tsx";
import SeatMapEditFormSelector
    from "@/domains/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapEditFormSelector.tsx";
import SeatMapFormContainer from "@/domains/seatmap/components/forms/seat-map-form/SeatMapFormContainer.tsx";
import {SeatMapFormContext} from "@/domains/seatmap/context/seat-map-form-context/SeatMapFormContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {CardCSS} from "@/common/constants/css/ContainerCSS.ts";
import {SeatMapDetails} from "@/domains/seatmap/schema/model/SeatMap.types.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";

/**
 * Props for {@link SeatMapDetailsPanel}.
 */
type PanelProps = {
    /**
     * The showing associated with the current seat map.
     *
     * Used to derive screen and showing identifiers for form submissions
     * and reference links.
     */
    showing: ShowingDetails;
};

/**
 * Displays a details panel for a selected seat map entry.
 *
 * @remarks
 * - Requires {@link SeatMapDetailsPanelContext} to be present
 * - Throws if no seat map is available or if the seat layout type is invalid
 * - Supports read-only and edit modes via internal context state
 *
 * @returns
 * A controlled {@link Sheet} component containing seat map details and editing UI.
 */
const SeatMapDetailsPanel = ({showing}: PanelProps) => {
    // --- Access Context ---
    const {
        seatMap,
        setSeatMap,
        isPanelOpen,
        setIsPanelOpen,
        isEditing,
        setIsEditing,
    } = useRequiredContext({context: SeatMapDetailsPanelContext});

    // --- Guard: Seat Map Required ---
    if (!seatMap) {
        throw new Error("Required seat map not found for `SeatMapDetailsContextPanel`.");
    }

    if (seatMap.seat.layoutType !== "SEAT") {
        throw new Error(
            `Seat Map has seat of invalid layout type. Type received: ${seatMap.seat.layoutType}`
        );
    }

    // --- Seat Map Details ---
    const {seat, status} = seatMap;
    const {seatType} = seat;

    const formattedStatus = convertToTitleCase(status);
    const formattedSeatType = SeatTypeLabelMap[seatType];

    // --- Sheet Metadata ---
    const sheetTitle = getSeatIdentifier(seat);
    const sheetDescription = `${formattedSeatType} • ${formattedStatus}`;

    // --- Form Context ---
    const {_id: seatMapShowing, screen: {_id: seatMapScreen}} = showing;
    const {options = {}} = useRequiredContext({context: SeatMapFormContext});

    /**
     * Handles successful seat map updates from the edit form.
     *
     * @param seatMap - The updated seat map details.
     */
    const onSuccess = (seatMap: SeatMapDetails) => {
        setSeatMap(seatMap);
        setIsEditing(false);
    };

    // --- Render ---
    return (
        <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle className="text-[30px]">{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    <div className="space-y-5">
                        {isEditing && (
                            <SeatMapFormContainer
                                className={cn(CardCSS, "p-4")}
                                seatMapShowing={seatMapShowing}
                                seatMapScreen={seatMapScreen}
                                onSubmitSuccess={onSuccess}
                                {...options}
                            />
                        )}

                        {!isEditing && (
                            <>
                                <SeatMapDetailsReferenceLinks showing={showing}/>
                                <SeatMapSeatSummary seat={seat}/>
                                <SeatMapDetailsSummary seatMap={seatMap}/>
                            </>
                        )}

                        <SeatMapEditFormSelector/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SeatMapDetailsPanel;
