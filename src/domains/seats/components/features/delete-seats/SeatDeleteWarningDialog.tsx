/**
 * @fileoverview Seat-specific confirmation dialog for deleting seats or layout elements with dynamic title generation.
 */

import {FC, ReactNode} from 'react';
import {Seat} from "@/domains/seats/schema/seat/Seat.types.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {SeatDetails} from "@/domains/seats/schema/seat/SeatDetails.types.ts";
import buildString from "@/common/utility/buildString.ts";
import SeatLayoutTypeLabelMap from "@/domains/seats/constants/SeatLayoutTypeLabelMap.ts";
import {useSeatDeleteMutation} from "@/domains/seats/_feat/crud-hooks";

/** Props for the SeatDeleteWarningDialog component. */
type WarningProps = OnDeleteMutationParams & {
    children: ReactNode;
    seat: Seat | SeatDetails;
};

/**
 * Renders a confirmation dialog that triggers a seat deletion mutation upon user approval.
 */
const SeatDeleteWarningDialog: FC<WarningProps> = ({children, seat, ...mutationProps}) => {
    const {_id, row, layoutType, x, y} = seat;

    const isSeat = layoutType === "SEAT";
    const layoutLabel = SeatLayoutTypeLabelMap[layoutType];

    const label = buildString([
        isSeat
            ? `${row}${seat.seatNumber}`
            : `${row} • ${layoutLabel} • X${x}, Y${y}`,
        (isSeat && seat.seatLabel) && `[${seat.seatLabel}]`,
    ]);

    const dialogTitle = `Proceed to delete ${label}?`;

    const {mutate} = useSeatDeleteMutation(mutationProps);
    const deleteSeat = () => mutate({_id});

    return (
        <EntityDeleteWarningDialog title={dialogTitle} deleteResource={deleteSeat}>
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default SeatDeleteWarningDialog;