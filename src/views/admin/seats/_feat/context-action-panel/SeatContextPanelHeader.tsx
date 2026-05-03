/**
 * @fileoverview Header component for the seat-details panel.
 */

import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {SeatPanelContext} from "@/domains/seats/context/seat-details-context";
import {SheetDescription, SheetHeader, SheetTitle} from "@/common/components/ui/Sheet";
import {SeatLayoutTypeLabelMap, SeatTypeLabelMap} from "@/domains/seats/schema/fields";
import buildString from "@/common/utility/buildString.ts";
import {ReactElement} from "react";

/** Header component for the seat-details panel. */
export function SeatContextPanelHeader(): ReactElement {
    const {seat} = useRequiredContext({
        context: SeatPanelContext,
        message: "Must be used within provider for `SeatDetailsPanelContext`.",
    });

    if (!seat) throw new Error("Seat missing in component.");

    const {row, x, y, layoutType} = seat;

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

    const {seatNumber, seatType, seatLabel} = seat;
    const titleString = `${row}${seatNumber}`;
    const descString = buildString([SeatTypeLabelMap[seatType], `XY ${x},${y}`, seatLabel && `${seatLabel}`], " • ");

    return (
        <SheetHeader className="space-y-0">
            <SheetTitle className="text-[45px]">{titleString}</SheetTitle>
            <SheetDescription>{descString}</SheetDescription>
        </SheetHeader>
    );
}