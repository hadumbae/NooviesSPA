/**
 * @fileoverview Slide-over panel component that orchestrates seat detail visualization, editing via SeatSubmitForm,
 * and deletion workflows using shared context.
 */

import {Dispatch, ReactElement, SetStateAction, useState} from "react";
import {Sheet, SheetContent} from "@/common/components/ui/Sheet";
import SeatDetailsContextPanelHeader
    from "@/views/admin/seats/_feat/context-action-panel/SeatDetailsContextPanelHeader.tsx";
import {SeatContextPanelOptionButtonsSection} from "./SeatContextPanelOptionButtonsSection.tsx";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {SeatDeleteWarning} from "@/domains/seats/components/features/delete-seats/SeatDeleteWarning.tsx";
import {UIOpenStateProps} from "@/common/types";
import {SeatDetails} from "@/domains/seats/schema/model";
import {
    SeatContextPanelDetailsSection
} from "@/views/admin/seats/_feat/context-action-panel/SeatContextPanelDetailsSection.tsx";
import {simplifySeatDetails} from "@/domains/seats/_feat/formatters";
import {SeatSubmitForm} from "@/views/admin/seats/_feat/submit-data";
import {SeatContextPanelFormView} from "@/views/admin/seats/_feat/context-action-panel/SeatContextPanelFormView.tsx";

type PanelProps = UIOpenStateProps & {
    seat: SeatDetails
    setSeat: Dispatch<SetStateAction<SeatDetails | null>>;
}

/**
 * Displays and manages the lifecycle of seat information within a slide-over panel.
 * Toggles between read-only metadata sections and an active SeatSubmitForm for updates.
 */
export function SeatDetailsContextPanel(
    {isOpen, setIsOpen, seat, setSeat}: PanelProps): ReactElement {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);

    const handleUpdateSuccess = (updatedSeat: SeatDetails) => {
        setIsEditing(false);
        setSeat(updatedSeat);
    };

    const closePanel = () => setIsOpen(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="flex flex-col">
                <SeatDetailsContextPanelHeader/>

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
                                seatID={seat._id}
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