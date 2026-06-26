/**
 * @fileoverview Sliding details panel for inspecting and editing an individual seat map entry.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatMapDetailsPanelContext} from "@/domains/seatmap/context/details-panel-context/SeatMapDetailsPanelContext.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/common/components/ui/sheet";
import {formatSeatLabel} from "@/domains/seats/_feat/formatters";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
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
import {
    SeatMapSeatSummary
} from "@/domains/seatmap/components/features/admin/seat-map-deatils-panel/SeatMapSeatSummary.tsx";
import {ReactElement} from "react";
import {SeatTypeLabelMap} from "@/domains/seats";


/** Props for the SeatMapDetailsPanel component. */
type PanelProps = {
    showing: ShowingDetails;
};

/** Displays a details panel for a selected seat map entry. */
export function SeatMapDetailsPanel({showing}: PanelProps): ReactElement {
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
    const sheetTitle = formatSeatLabel(seat);
    const sheetDescription = `${formattedSeatType} • ${formattedStatus}`;

    // --- Form Context ---
    const {_id: seatMapShowing, screen: {_id: seatMapScreen}} = showing;
    const {options = {}} = useRequiredContext({context: SeatMapFormContext});

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
}