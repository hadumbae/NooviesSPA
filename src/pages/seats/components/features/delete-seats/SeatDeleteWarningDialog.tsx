import {FC, ReactNode} from 'react';
import useSeatDeleteMutation from "@/pages/seats/hooks/features/admin/delete-seat-data/useSeatDeleteMutation.ts";
import {Seat} from "@/pages/seats/schema/seat/Seat.types.ts";
import {OnDeleteMutationParams} from "@/common/type/form/MutationDeleteParams.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";
import buildString from "@/common/utility/buildString.ts";
import SeatLayoutTypeLabelMap from "@/pages/seats/constants/SeatLayoutTypeLabelMap.ts";
/**
 * ⚡ WarningProps
 *
 * Props for {@link SeatDeleteWarningDialog}. Extends {@link OnDeleteMutationParams}
 * to support delete mutation handlers and status messages.
 */
type WarningProps = OnDeleteMutationParams & {
    /** React node(s) that trigger opening the delete dialog */
    children: ReactNode;
    /** The seat (or structure-type seat) to be deleted */
    seat: Seat | SeatDetails;
};

/**
 * ⚡ SeatDeleteWarningDialog
 *
 * A seat-specific delete confirmation dialog.
 *
 * Wraps {@link EntityDeleteWarningDialog} and wires it to {@link useSeatDeleteMutation}
 * to perform API deletion and trigger success/error callbacks from
 * {@link OnDeleteMutationParams}.
 *
 * Automatically generates the dialog title based on seat details:
 * - For SEAT types: row, seat number, optional seat label
 * - For non-seat layout types: row, layout label, and coordinates
 *
 * @component
 * @param props - See {@link WarningProps}.
 *
 * @example
 * ```tsx
 * <SeatDeleteWarningDialog
 *   seat={seat}
 *   successMessage="Seat deleted successfully."
 *   errorMessage="Failed to delete seat."
 * >
 *   <button>Delete</button>
 * </SeatDeleteWarningDialog>
 * ```
 */
const SeatDeleteWarningDialog: FC<WarningProps> = ({children, seat, ...mutationProps}) => {
    // ⚡ Extract Props ⚡
    const {_id, row, layoutType, x, y} = seat;

    // ⚡ Dialog Metadata ⚡
    const isSeat = layoutType === "SEAT";
    const layoutLabel = SeatLayoutTypeLabelMap[layoutType];

    const label = buildString([
        isSeat
            ? `${row}${seat.seatNumber}`
            : `${row} • ${layoutLabel} • X${x}, Y${y}`,
        (isSeat && seat.seatLabel) && `[${seat.seatLabel}]`,
    ]);

    const dialogTitle = `Proceed to delete ${label}?`;

    // ⚡ Mutation Handler ⚡
    const {mutate} = useSeatDeleteMutation(mutationProps);
    const deleteSeat = () => mutate({_id});

    // ⚡ Render ⚡
    return (
        <EntityDeleteWarningDialog title={dialogTitle} deleteResource={deleteSeat}>
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default SeatDeleteWarningDialog;
