/**
 * @file React Query mutation hook for cancelling an existing reservation ticket.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {TicketRepository} from "@/pages/reservation/repositories/ticket-repository/TicketRepository.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {toast} from "react-toastify";

type SubmitProps = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    /** Optional callback invoked after a successful cancellation. */
    onSubmitSuccess?: () => void;
};

/**
 * Provides a mutation for cancelling a reservation by its ID.
 *
 * @param props - Submission lifecycle handlers and optional toast messages.
 * @returns React Query mutation result for reservation cancellation.
 */
export function useCancelReservationMutation(
    {onSubmitSuccess, onSubmitError, successMessage, errorMessage}: SubmitProps = {}
): UseMutationResult<void, unknown, ObjectId> {
    const cancelReservation = async (_id: ObjectId) => {
        await TicketRepository.cancelReservation(_id);
    }

    const onSuccess = () => {
        successMessage && toast.success(successMessage);
        onSubmitSuccess?.();
    }

    const onError = (error: unknown) => {
        errorMessage && toast.error(errorMessage);
        onSubmitError?.(error);
    }

    return useMutation({
        mutationKey: ["reservations", "tickets", "cancel"],
        mutationFn: cancelReservation,
        onSuccess,
        onError,
    });
}
