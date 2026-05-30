/**
 * @fileoverview Mutation hook for cancelling an existing reservation ticket.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {toast} from "react-toastify";
import {patchCancelReservation} from "@/domains/reservation/_feat/update-client-reservations/repositories";
import {
    UpdateClientReservationMutationKeys
} from "@/domains/reservation/_feat/update-client-reservations/mutations/mutationKeys.ts";
import {MutationResponseConfig} from "@/common/_feat/submit-data";

/**
 * Hook providing a mutation to cancel a reservation by its unique identifier.
 */
export function useCancelClientReservationMutation(
    params: MutationResponseConfig<void, ObjectId> = {}
): UseMutationResult<void, unknown, ObjectId> {
    const {
        onSubmit,
        submitMessage,
        onSubmitSuccess,
        onSubmitError,
        successMessage,
        errorMessage
    } = params;

    const cancel = async (_id: ObjectId) => {
        submitMessage && toast.success(submitMessage);
        onSubmit?.(_id);

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
        mutationKey: UpdateClientReservationMutationKeys.cancel(),
        mutationFn: cancel,
        onSuccess,
        onError,
    });
}
