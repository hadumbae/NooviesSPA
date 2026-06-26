/**
 * @fileoverview Slide-over panel component that orchestrates seat detail visualization, editing via SeatSubmitForm,
 * and deletion workflows using shared context.
 */

import {ReactElement, useState} from "react";
import {ScrollArea, Sheet, SheetContent} from "@/common/components/ui";

import {SeatDetails, simplifySeatDetails, useSeatPanelSetterContext, useSeatPanelStateContext} from "@/domains/seats";
import {SeatSubmitForm} from "@/views/admin/seats/_feat/submit-data";
import {SeatDeleteWarning} from "@/views/admin/seats/_feat/delete-seats";
import {SeatContextPanelFormView} from "@/views/admin/seats/_feat/context-action-panel/SeatContextPanelFormView.tsx";
import {SeatContextPanelHeader} from "@/views/admin/seats/_feat/context-action-panel/SeatContextPanelHeader.tsx";
import {
    SeatContextPanelOptionButtonsSection
} from "@/views/admin/seats/_feat/context-action-panel/SeatContextPanelOptionButtonsSection.tsx";
import {
    SeatContextPanelDetailsSection
} from "@/views/admin/seats/_feat/context-action-panel/SeatContextPanelDetailsSection.tsx";

/**
 * Displays and manages the lifecycle of seat information within a slide-over panel.
 */
export function SeatContextPanel(): ReactElement | null {
    const {isPanelOpen, seat} = useSeatPanelStateContext();
    const {setIsPanelOpen, setSeat} = useSeatPanelSetterContext();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    const closePanel = () => setIsPanelOpen(false);
    const handleUpdateSuccess = (updatedSeat: SeatDetails) => {
        setIsEditing(false);
        setSeat(updatedSeat);
    };


    if (!seat) return null;

    return (
        <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
            <SheetContent className="flex flex-col">
                <SeatContextPanelHeader/>

                <ScrollArea className="flex-1 pt-5">
                    <div className="space-y-5">
                        {
                            !isEditing && (
                                <SeatContextPanelDetailsSection
                                    seat={seat}
                                    closePanel={closePanel}
                                />
                            )
                        }

                        {isEditing && (
                            <SeatSubmitForm
                                editEntity={simplifySeatDetails(seat)}
                                onSubmitSuccess={handleUpdateSuccess}
                                successMessage="Updated."
                            >
                                <SeatContextPanelFormView/>
                            </SeatSubmitForm>
                        )}

                        {showDeleteWarning && (
                            <SeatDeleteWarning
                                _id={seat._id}
                                className="border p-4 rounded-xl bg-destructive/5"
                                onSubmitSuccess={closePanel}
                            />
                        )}

                        <SeatContextPanelOptionButtonsSection
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            showDeleteWarning={showDeleteWarning}
                            setShowDeleteWarning={setShowDeleteWarning}
                        />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}