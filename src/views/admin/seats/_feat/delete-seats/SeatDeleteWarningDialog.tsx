/**
 * @fileoverview Seat-specific confirmation dialog for deleting seats or layout elements with dynamic title generation.
 */

import {ReactElement, ReactNode} from 'react';
import {
    EntityDeleteWarningDialog
} from "@/views/common/_feat/dialog/EntityDeleteWarningDialog.tsx";
import {buildString, MutationResponseConfig} from "@/common/_feat";
import {SeatLayoutTypeLabelMap} from "@/domains/seats";
import {Seat, SeatDetails} from "@/domains/seats";
import {useDeleteSeatSubmitHandler} from "@/domains/seats";
import {UIOpenStateProps} from "@/common/_types";
import {ObjectId} from "@/common/_schemas";

/** Props for the SeatDeleteWarningDialog component. */
type WarningProps = MutationResponseConfig<void, { _id: ObjectId }> & UIOpenStateProps & {
    children: ReactNode;
    seat: Seat | SeatDetails;
};

/**
 * Renders a confirmation dialog that triggers a seat deletion mutation upon user approval.
 */
export function SeatDeleteWarningDialog(
    {children, seat, isOpen, setIsOpen, ...submitConfig}: WarningProps
): ReactElement {
    const {_id, row, layoutType, x, y} = seat;
    const {deleteSeat} = useDeleteSeatSubmitHandler({_id, ...submitConfig});

    const isSeat = layoutType === "SEAT";
    const layoutLabel = SeatLayoutTypeLabelMap[layoutType];

    const label = buildString([
        isSeat
            ? `${row}${seat.seatNumber}`
            : `${row} • ${layoutLabel} • X${x}, Y${y}`,
        (isSeat && seat.seatLabel) && `[${seat.seatLabel}]`,
    ]);

    const dialogTitle = `Proceed to delete ${label}?`;

    return (
        <EntityDeleteWarningDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={dialogTitle}
            deleteResource={deleteSeat}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
}

