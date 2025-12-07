/**
 * @file SeatDetailsContextPanelHeader.tsx
 * @description
 * Renders the header section of the seat-details side panel.
 *
 * This component consumes {@link SeatDetailsPanelContext} to display
 * information about the currently selected seat or layout element.
 *
 * Features:
 * - Throws an error if no seat is available in context.
 * - Dynamically adjusts content based on whether the element is a standard seat or a non-seat structural layout element.
 * - For seats: displays row, seat number, optional label, type, and coordinates.
 * - For non-seat elements: displays element type and coordinates.
 *
 * @example
 * ```tsx
 * <SeatDetailsPanelContextProvider>
 *   <SeatDetailsContextPanelHeader />
 * </SeatDetailsPanelContextProvider>
 * ```
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatDetailsPanelContext} from "@/pages/seats/context/seat-details-context/SeatDetailsPanelContext.ts";
import {SheetDescription, SheetHeader, SheetTitle} from "@/common/components/ui/Sheet";
import SeatLayoutTypeLabelMap from "@/pages/seats/constants/SeatLayoutTypeLabelMap.ts";
import SeatTypeLabelMap from "@/pages/seats/constants/SeatTypeLabelMap.ts";
import buildString from "@/common/utility/buildString.ts";

/**
 * Header component for the seat-details panel.
 *
 * Extracts the currently selected seat from {@link SeatDetailsPanelContext} and
 * renders an appropriate header. Differentiates between standard seats
 * (`layoutType === "SEAT"`) and non-seat layout elements.
 *
 * @throws {Error}
 * Throws if no seat is found in context.
 *
 * @returns {JSX.Element} A `SheetHeader` displaying seat or layout metadata.
 */
const SeatDetailsContextPanelHeader = () => {
    // ⚡ Access Context ⚡

    const {seat} = useRequiredContext({
        context: SeatDetailsPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`.",
    });

    // ⚡ Throw On Missing Seat ⚡

    if (!seat) throw new Error("Seat missing in component.");

    const {row, x, y, layoutType} = seat;

    // ⚡ Render Non-Seat Structure ⚡

    if (layoutType !== "SEAT") {
        return (
            <SheetHeader className="space-y-0">
                <SheetTitle className="text-[45px]">Row {row}</SheetTitle>
                <SheetDescription>
                    {SeatLayoutTypeLabelMap[layoutType]} • XY {x},{y}
                </SheetDescription>
            </SheetHeader>
        );
    }

    // ⚡ Render Seat ⚡

    const {seatNumber, seatType, seatLabel} = seat;
    const titleString = `${row}${seatNumber}`;
    const descString = buildString([SeatTypeLabelMap[seatType], `XY ${x},${y}`, seatLabel && `${seatLabel}`], " • ");

    return (
        <SheetHeader className="space-y-0">
            <SheetTitle className="text-[45px]">{titleString}</SheetTitle>
            <SheetDescription>{descString}</SheetDescription>
        </SheetHeader>
    );
};

export default SeatDetailsContextPanelHeader;
