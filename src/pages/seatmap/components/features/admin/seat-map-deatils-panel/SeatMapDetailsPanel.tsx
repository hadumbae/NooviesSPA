import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatMapDetailsPanelContext} from "@/pages/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/common/components/ui/Sheet";
import getSeatIdentifier from "@/pages/seats/utilities/formatters/get-seat-identifier/getSeatIdentifier.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import SeatTypeLabelMap from "@/pages/seats/constants/SeatTypeLabelMap.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import SeatMapSeatSummary
    from "@/pages/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapSeatSummary.tsx";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import SeatMapDetailsReferenceLinks
    from "@/pages/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapDetailsReferenceLinks.tsx";
import SeatMapDetailsSummary
    from "@/pages/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapDetailsSummary.tsx";
import SeatMapEditFormSelector
    from "@/pages/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapEditFormSelector.tsx";
import SeatMapFormContainer from "@/pages/seatmap/components/forms/seat-map-form/SeatMapFormContainer.tsx";
import {SeatMapFormContext} from "@/pages/seatmap/context/seat-map-form-context/SeatMapFormContext.ts";
import {cn} from "@/common/lib/utils.ts";
import {CardCSS} from "@/common/constants/css/ContainerCSS.ts";
import {SeatMapDetails} from "@/pages/seatmap/schema/model/SeatMap.types.ts";

type PanelProps = {
    showing: ShowingDetails;
}

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

    // --- No Seat Map, Should Not Show ---
    if (!seatMap) {
        throw new Error("Required seat map not found for `SeatMapDetailsContextPanel`.");
    }

    if (seatMap.seat.layoutType !== "SEAT") {
        throw new Error(`Seat Map has seat of invalid layout type. Type received: ${seatMap.seat.layoutType}`);
    }

    // --- Seat Map Details ---
    const {seat, status} = seatMap;
    const {seatType} = seat;

    const formattedStatus = convertToTitleCase(status);
    const formattedSeatType = SeatTypeLabelMap[seatType];

    // --- Sheet Metadata ---
    const sheetTitle = getSeatIdentifier(seat);
    const sheetDescription = `${formattedSeatType} • ${formattedStatus}`;

    // --- Form ---
    const {_id: seatMapShowing, screen: {_id: seatMapScreen}} = showing;
    const {options = {}} = useRequiredContext({context: SeatMapFormContext});

    const onSuccess = (seatMap: SeatMapDetails) => {
        setSeatMap(seatMap);
        setIsEditing(false);
    }

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
                        {
                            isEditing &&
                            <SeatMapFormContainer
                                className={cn(CardCSS, "p-4")}
                                seatMapShowing={seatMapShowing}
                                seatMapScreen={seatMapScreen}
                                onSubmitSuccess={onSuccess}
                                {...options}
                            />
                        }

                        {!isEditing && <>
                            <SeatMapDetailsReferenceLinks showing={showing}/>
                            <SeatMapSeatSummary seat={seat}/>
                            <SeatMapDetailsSummary seatMap={seatMap}/>
                        </>}

                        <SeatMapEditFormSelector/>
                    </div>
                </ScrollArea>
            </SheetContent>

        </Sheet>
    );
};

export default SeatMapDetailsPanel;
