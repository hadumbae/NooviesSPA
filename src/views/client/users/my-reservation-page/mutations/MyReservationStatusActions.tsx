/**
 * @fileoverview Reservation status action buttons for checkout and cancellation.
 */

import {ReactElement} from "react";
import {ObjectId} from "@/common/_schemas";
import {Button} from "@/views/common/_comp/ui";
import {Loader} from "lucide-react";
import {handleMutateAsync, MutationResponseConfig} from "@/common/_feat";
import {ReservationStatus, useReservationStateMutations} from "@/domains/reservations";

/** Props for the MyReservationStatusActions component. */
type ActionProps = MutationResponseConfig<void, ObjectId> & {
    reservationID: ObjectId;
    status: ReservationStatus;
};

const BUTTON_CSS = "h-20";

/** Renders status-driven checkout and cancel actions for a specific reservation. */
export function MyReservationStatusActions(
    {reservationID, status, ...mutationParams}: ActionProps
): ReactElement {
    const {
        isPending,
        checkoutMutation: {isPending: isCheckingOut, mutateAsync: checkout},
        cancelMutation: {isPending: isCancelling, mutateAsync: cancel},
    } = useReservationStateMutations();

    const showLoader = (text: string, pending: boolean) => (
        pending ? <Loader className="animate-spin"/> : text
    );

    const handleCheckout = handleMutateAsync({mutateAsync: checkout, ...mutationParams});
    const handleCancel = handleMutateAsync({mutateAsync: cancel, ...mutationParams});

    const checkoutButton = (
        <Button
            type="button"
            variant="primary"
            onClick={() => handleCheckout(reservationID)}
            className={BUTTON_CSS}
            disabled={isPending}
        >
            {showLoader("Checkout", isCheckingOut)}
        </Button>
    );

    const cancelButton = (
        <Button
            type="button"
            variant="secondary"
            onClick={() => handleCancel(reservationID)}
            className={BUTTON_CSS}
            disabled={isPending}
        >
            {showLoader("Cancel", isCancelling)}
        </Button>
    );

    return (
        <div className="grid grid-cols-2 gap-4">
            {status === "RESERVED" ? checkoutButton : <div></div>}
            {status === "RESERVED" || status === "PAID" ? cancelButton : <div></div>}
        </div>
    );
}
