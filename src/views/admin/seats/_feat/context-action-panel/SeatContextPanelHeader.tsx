/**
 * @fileoverview Header component for the seat-details panel.
 */

import {ReactElement} from "react";
import {SheetDescription, SheetHeader, SheetTitle} from "@/common/components/ui/sheet";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import {SeatLayoutTypeLabelMap, SeatTypeLabelMap, useSeatPanelStateContext} from "@/domains/seats";

/** Header component for the seat-details panel. */
export function SeatContextPanelHeader(): ReactElement {
    const {seat} = useSeatPanelStateContext();

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