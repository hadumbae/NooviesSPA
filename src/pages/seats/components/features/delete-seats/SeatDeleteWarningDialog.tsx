import { FC, ReactNode } from 'react';
import useSeatDeleteMutation from "@/pages/seats/hooks/features/admin/delete-seat-data/useSeatDeleteMutation.ts";
import { Seat } from "@/pages/seats/schema/seat/Seat.types.ts";
import { OnDeleteMutationParams } from "@/common/type/form/MutationDeleteParams.ts";
import EntityDeleteWarningDialog from "@/common/components/dialog/EntityDeleteWarningDialog.tsx";
import {SeatDetails} from "@/pages/seats/schema/seat/SeatDetails.types.ts";

/**
 * Props for {@link SeatDeleteWarningDialog}.
 */
type WarningProps = OnDeleteMutationParams & {
    /** React node(s) that trigger the delete dialog when clicked */
    children: ReactNode;
    /** The seat or seat details to be deleted */
    seat: Seat | SeatDetails;
};

/**
 * A delete confirmation dialog specifically for seat entities.
 *
 * Wraps {@link EntityDeleteWarningDialog} and integrates {@link useSeatDeleteMutation}
 * to handle API deletion, success/error callbacks, and mutation state.
 *
 * The dialog title is automatically generated based on seat information
 * (row, number, type, and optional label).
 *
 * @param props - Component props of type {@link WarningProps}.
 *
 * @example
 * ```tsx
 * <SeatDeleteWarningDialog
 *   seat={seat}
 *   successMessage="Seat deleted successfully."
 *   errorMessage="Failed to delete seat."
 * >
 *   <button>Delete Seat</button>
 * </SeatDeleteWarningDialog>
 * ```
 */
const SeatDeleteWarningDialog: FC<WarningProps> = ({ children, seat, ...mutationProps }) => {
    const { _id, row, seatNumber, seatLabel, seatType } = seat;

    const label = `${row}-${seatNumber} (${seatType})` + (seatLabel ? ` [${seatLabel}]` : "");
    const dialogTitle = `Proceed to delete ${label}?`;

    const { mutate } = useSeatDeleteMutation(mutationProps);

    const deleteSeat = () => {
        mutate({ _id });
    };

    return (
        <EntityDeleteWarningDialog
            title={dialogTitle}
            deleteResource={deleteSeat}
        >
            {children}
        </EntityDeleteWarningDialog>
    );
};

export default SeatDeleteWarningDialog;
