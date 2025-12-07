import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {Sheet, SheetContent} from "@/common/components/ui/Sheet";
import SeatDetailsPanelSeatOnlySection
    from "@/pages/seats/components/features/seat-details/SeatDetailsPanelSeatOnlySection.tsx";
import SeatDetailsContextPanelHeader
    from "@/pages/seats/components/features/seat-details/SeatDetailsContextPanelHeader.tsx";
import SeatDetailsPanelRelatedSection
    from "@/pages/seats/components/features/seat-details/SeatDetailsPanelRelatedSection.tsx";

const SeatDetailsContextPanel = () => {
    // ⚡ Access Context ⚡
    const {seat, isPanelOpen, setIsPanelOpen} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`."
    });

    // ⚡ Validate Seat ⚡
    if (!seat) {
        throw new Error("Seat is required but undefined. Please ensure seat exists before rendering.");
    }

    // ⚡ Render Panel ⚡
    const {layoutType} = seat;
    const isSeat = layoutType === "SEAT";

    return (
        <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
            <SheetContent>
                <SeatDetailsContextPanelHeader />

                <div className="space-y-5 pt-5">
                    <SeatDetailsPanelRelatedSection />
                    {isSeat && <SeatDetailsPanelSeatOnlySection/>}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SeatDetailsContextPanel;
