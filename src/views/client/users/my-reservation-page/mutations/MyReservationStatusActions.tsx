/**
 * @fileoverview Reservation status action buttons for checkout and cancellation.
 */

import {ObjectId} from "@/common/_schemas";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {Loader} from "lucide-react";
import {ReservationStatus} from "@/domains/reservations/_schema/model/fields/ReservationStatusEnumSchema.ts";
import {
    useReservationStateMutations
} from "@/domains/reservations/_feat/update-client-reservations/mutations/useReservationStateMutations.ts";
import {ReactElement} from "react";

/** Props for the MyReservationStatusActions component. */
type ActionProps = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    onSubmitSuccess?: () => void;
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
        checkoutMutation: {isPending: isCheckingOut, mutate: checkout},
        cancelMutation: {isPending: isCancelling, mutate: cancel},
    } = useReservationStateMutations({onCancel: mutationParams, onCheckout: mutationParams});

    const showLoader = (text: string, pending: boolean) => (
        pending ? <Loader className="animate-spin"/> : text
    );

    const checkoutButton = (
        <Button
            type="button"
            variant="primary"
            onClick={() => checkout(reservationID)}
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
            onClick={() => cancel(reservationID)}
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
