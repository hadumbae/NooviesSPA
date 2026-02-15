/**
 * @file MyReservationStatusActions.tsx
 * Reservation status action buttons for checkout and cancellation.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {useReservationStateMutations} from "@/pages/reservation/hooks/useReservationStateMutations.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {Loader} from "lucide-react";
import {ReservationStatus} from "@/pages/reservation/schema/enum/ReservationStatusEnumSchema.ts";

/**
 * @prop reservationID Target reservation identifier.
 * @prop status Current reservation state.
 * @prop onSubmitSuccess Optional success handler.
 */
type ActionProps = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    onSubmitSuccess?: () => void;
    reservationID: ObjectId;
    status: ReservationStatus;
};

/** Shared action button height. */
const BUTTON_CSS = "h-20";

/**
 * Renders status-driven checkout and cancel actions.
 */
const MyReservationStatusActions = (
    {reservationID, status, ...mutationParams}: ActionProps
) => {
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
};

export default MyReservationStatusActions;
