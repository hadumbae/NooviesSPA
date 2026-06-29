/**
 * @fileoverview Mutation hook for checking out client reservation tickets.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {toast} from "react-toastify";
import {patchCheckoutTicket} from "@/domains/reservations/_feat/update-client-reservations/repositories";
import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {
    UpdateClientReservationMutationKeys
} from "@/domains/reservations/_feat/update-client-reservations/mutations/mutationKeys.ts";

/**
 * Provides a mutation for checking out a ticket by its ID.
 */
export function useCheckoutClientReservationMutation(
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

    const checkout = async (_id: ObjectId) => {
        submitMessage && toast.info(submitMessage);
        onSubmit?.(_id);

        await patchCheckoutTicket(_id);
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
        mutationKey: UpdateClientReservationMutationKeys.checkout(),
        mutationFn: checkout,
        onSuccess,
        onError,
    });
}
