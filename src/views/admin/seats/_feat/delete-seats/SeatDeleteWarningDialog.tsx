/**
 * @fileoverview Seat-specific confirmation dialog for deleting seats or layout elements with dynamic title generation.
 */

import {ReactElement, ReactNode} from 'react';
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import buildString from "@/common/utility/buildString.ts";
import {SeatLayoutTypeLabelMap} from "@/domains/seats/_schema/constants";
import {Seat, SeatDetails} from "@/domains/seats/_schema/model";
import {useDeleteSeatSubmitHandler} from "@/domains/seats";

/** Props for the SeatDeleteWarningDialog component. */
type WarningProps = OnDeleteMutationParams & {
    children: ReactNode;
    seat: Seat | SeatDetails;
};

/**
 * Renders a confirmation dialog that triggers a seat deletion mutation upon user approval.
 */
export function SeatDeleteWarningDialog(
    {children, seat, ...submitConfig}: WarningProps
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
        <EntityDeleteWarningDialog title={dialogTitle} deleteResource={deleteSeat}>
            {children}
        </EntityDeleteWarningDialog>
    );
}

