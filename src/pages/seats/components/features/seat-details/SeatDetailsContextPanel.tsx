import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {Sheet, SheetContent} from "@/common/components/ui/Sheet";
import SeatDetailsPanelSeatOnlySection
    from "@/pages/seats/components/features/seat-details/SeatDetailsPanelSeatOnlySection.tsx";
import SeatDetailsContextPanelHeader
    from "@/pages/seats/components/features/seat-details/SeatDetailsContextPanelHeader.tsx";
import SeatDetailsPanelRelatedSection
    from "@/pages/seats/components/features/seat-details/SeatDetailsPanelRelatedSection.tsx";
import SeatDetailsPanelOptionButtonsSection
    from "@/pages/seats/components/features/seat-details/SeatDetailsPanelOptionButtonsSection.tsx";
import SeatFormContextProvider from "@/pages/seats/context/form/SeatFormContextProvider.tsx";
import SeatSubmitFormContainer from "@/pages/seats/components/forms/submit-form/SeatSubmitFormContainer.tsx";
import simplifySeatDetails from "@/pages/seats/utilities/seat-details/simplifySeatDetails.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import SeatDeleteWarning from "@/pages/seats/components/features/delete-seats/SeatDeleteWarning.tsx";
import {SeatFormValues} from "@/pages/seats/schema/form/SeatFormValuesSchema.ts";

/**
 * Seat details context panel component.
 *
 * Renders the full seat details side panel, including:
 * - Seat metadata display
 * - Related theatre/screen info
 * - Edit form
 * - Delete confirmation
 * - Toggle/action buttons
 *
 * Panel state and values are provided by `SeatDetailsPanelContext`.
 *
 * @returns React component for the seat details panel.
 *
 * @example
 * <SeatDetailsContextPanel />
 */
const SeatDetailsContextPanel = () => {
    // --- Access Context ---
    const {
        seat,
        setSeat,
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

    // --- Validate Seat ---
    if (!seat) {
        throw new Error("Seat is required but undefined. Please ensure seat exists before rendering.");
    }

    // --- Render Panel ---
    const {layoutType} = seat;
    const isSeat = layoutType === "SEAT";

    // --- Form Configuration ---
    const simplifiedSeat = simplifySeatDetails(seat);
    const disableFields: (keyof SeatFormValues)[] = ["theatre", "screen"];

    const onSubmit = (seat: SeatDetails) => {
        setIsEditing(false);
        setSeat(seat);
    };

    // --- On Delete Mutation ---
    const onDelete = () => {
        setIsPanelOpen(false);
        setIsEditing(false);
        setShowDeleteWarning(false);
    };

    // --- Render ---

    return (
        <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
            <SheetContent className="flex flex-col">
                <SeatDetailsContextPanelHeader/>

                <ScrollArea className="flex-1 pt-5">
                    <div className="space-y-5">
                        {/* View Mode Sections */}
                        {!isEditing && (
                            <>
                                <SeatDetailsPanelRelatedSection/>
                                {isSeat && <SeatDetailsPanelSeatOnlySection/>}
                            </>
                        )}

                        {/* Edit Form */}
                        {isEditing && (
                            <SeatFormContextProvider isPanel={true} disableFields={["theatre", "screen"]}>
                                <div className="px-2">
                                    <SeatSubmitFormContainer
                                        className="border border-gray-200 dark:border-white p-3 rounded-xl"
                                        isEditing={true}
                                        entity={simplifiedSeat}
                                        onSubmitSuccess={onSubmit}
                                        disableFields={disableFields}
                                    />
                                </div>
                            </SeatFormContextProvider>
                        )}

                        {/* Delete Warning */}
                        {showDeleteWarning && (
                            <SeatDeleteWarning
                                seatID={seat._id}
                                className="border p-3 rounded-xl"
                                onDeleteSuccess={onDelete}
                            />
                        )}

                        {/* Action Buttons */}
                        <SeatDetailsPanelOptionButtonsSection/>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default SeatDetailsContextPanel;
