/**
 * @fileoverview Slide-over panel component that orchestrates seat detail visualization, editing via SeatSubmitForm,
 * and deletion workflows using shared context.
 */

import {ReactElement} from "react";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/domains/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {Sheet, SheetContent} from "@/common/components/ui/Sheet";
import SeatDetailsPanelSeatOnlySection
    from "@/views/admin/seats/_feat/context-action-panel/SeatDetailsPanelSeatOnlySection.tsx";
import SeatDetailsContextPanelHeader
    from "@/views/admin/seats/_feat/context-action-panel/SeatDetailsContextPanelHeader.tsx";
import SeatDetailsPanelRelatedSection
    from "@/views/admin/seats/_feat/context-action-panel/SeatDetailsPanelRelatedSection.tsx";
import SeatDetailsPanelOptionButtonsSection
    from "@/views/admin/seats/_feat/context-action-panel/SeatDetailsPanelOptionButtonsSection.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import SeatDeleteWarning from "@/domains/seats/components/features/delete-seats/SeatDeleteWarning.tsx";

/**
 * Displays and manages the lifecycle of seat information within a slide-over panel.
 * Toggles between read-only metadata sections and an active SeatSubmitForm for updates.
 */
export function SeatDetailsContextPanel(): ReactElement {
    const {
        seat,
        isPanelOpen,
        setIsPanelOpen,
        isEditing,
        setIsEditing,
        showDeleteWarning,
        setShowDeleteWarning,
    } = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`."
    });

    if (!seat) {
        throw new Error("Seat is required but undefined. Please ensure seat exists before rendering.");
    }

    const {layoutType} = seat;
    const isSeat = layoutType === "SEAT";

    // const disableFields: Partial<Record<keyof SeatFormValues, boolean>> = {theatre: true, screen: true};
    //
    // const handleUpdateSuccess = (updatedSeat: SeatDetails) => {
    //     setIsEditing(false);
    //
    //     const simplifiedSeat = simplifySeatDetails(updatedSeat);
    //     setSeat(simplifiedSeat);
    // };

    const handleDeleteSuccess = () => {
        setIsPanelOpen(false);
        setIsEditing(false);
        setShowDeleteWarning(false);
    };

    return (
        <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
            <SheetContent className="flex flex-col">
                <SeatDetailsContextPanelHeader/>

                <ScrollArea className="flex-1 pt-5">
                    <div className="space-y-5">
                        {!isEditing && (
                            <>
                                <SeatDetailsPanelRelatedSection/>
                                {isSeat && <SeatDetailsPanelSeatOnlySection/>}
                            </>
                        )}

                        {/*{isEditing && (*/}
                        {/*    // Form*/}
                        {/*)}*/}

                        {showDeleteWarning && (
                            <SeatDeleteWarning
                                seatID={seat._id}
                                className="border p-4 rounded-xl bg-destructive/5"
                                onDeleteSuccess={handleDeleteSuccess}
                            />
                        )}

                        <SeatDetailsPanelOptionButtonsSection/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}