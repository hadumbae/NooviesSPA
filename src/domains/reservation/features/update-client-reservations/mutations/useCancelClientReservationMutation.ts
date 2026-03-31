/**
 * @file React Query mutation hook for cancelling an existing reservation ticket.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {toast} from "react-toastify";
import {patchCancelReservation} from "@/domains/reservation/features/update-client-reservations/repositories";

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
export function useCancelClientReservationMutation(
    {onSubmitSuccess, onSubmitError, successMessage, errorMessage}: SubmitProps = {}
): UseMutationResult<void, unknown, ObjectId> {
    const cancel = async (_id: ObjectId) => {
        await patchCancelReservation(_id);
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
        mutationFn: cancel,
        onSuccess,
        onError,
    });
}
