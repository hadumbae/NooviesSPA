/**
 * @fileoverview Sliding details panel for inspecting and editing an individual seat map entry.
 */

import {useRequiredContext} from "@/common/_feat/use-context/useRequiredContext.ts";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,} from "@/views/common/_comp/ui/sheet";
import {formatSeatLabel} from "@/domains/seats/_feat/formatters";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {ScrollArea} from "@/views/common/_comp/ui/scroll-area.tsx";
import {ShowingDetails} from "@/domains/showings/_schema/showing/ShowingDetailsSchema.ts";
import {ReactElement} from "react";
import {SeatTypeLabelMap} from "@/domains/seats";

import {SeatMapDetails} from "@/domains/seatmaps/_schema/model/SeatMapDetailsSchema";
import {
    SeatMapDetailsPanelSetterContext,
    SeatMapDetailsPanelStateContext,
    simplifySeatMapDetails
} from "@/domains/seatmaps";
import {SeatMapEditFormSelector,} from "@/views/admin/seatmaps/_comp/seat-map-deatils-panel/form";
import {
    SeatMapDetailsReferenceLinks,
    SeatMapDetailsSummary,
    SeatMapSeatSummary
} from "@/views/admin/seatmaps/_comp/seat-map-deatils-panel/details";
import {SeatMapSubmitForm, SeatMapSubmitFormView} from "@/views/admin/seatmaps/_feat";


/** Props for the SeatMapDetailsPanel component. */
type PanelProps = {
    showing: ShowingDetails;
};

/** Displays a details panel for a selected seat map entry. */
export function SeatMapDetailsPanel({showing}: PanelProps): ReactElement {
    const {seatMap, isPanelOpen, isEditing} = useRequiredContext({context: SeatMapDetailsPanelStateContext});
    const {setSeatMap, setIsPanelOpen, setIsEditing,} = useRequiredContext({context: SeatMapDetailsPanelSetterContext});

    if (!seatMap) {
        throw new Error("Required seat map not found for `SeatMapDetailsContextPanel`.");
    }

    if (seatMap.seat.layoutType !== "SEAT") {
        throw new Error(`Seat Map has seat of invalid layout type. Type received: ${seatMap.seat.layoutType}`);
    }

    const {seat, status} = seatMap;
    const {seatType} = seat;
    const editEntity = simplifySeatMapDetails(seatMap);

    const formattedStatus = convertToTitleCase(status);
    const formattedSeatType = SeatTypeLabelMap[seatType];

    const sheetTitle = formatSeatLabel(seat);
    const sheetDescription = `${formattedSeatType} • ${formattedStatus}`;

    const {_id: showingID, screen: {_id: seatMapScreen}} = showing;

    const onSuccess = (seatMap: SeatMapDetails) => {
        setSeatMap(seatMap);
        setIsEditing(false);
    };

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
                            <SeatMapSubmitForm
                                formConfig={{editEntity, presetValues: {showing: showingID}}}
                                onSubmitSuccess={onSuccess}
                            >
                                <SeatMapSubmitFormView
                                    className="p-4 default-card"
                                    screenForSeats={seatMapScreen}
                                />
                            </SeatMapSubmitForm>
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