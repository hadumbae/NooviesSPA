/**
 * @file useCheckoutTicketMutation.ts
 * React Query mutation hook for checking out a reservation ticket.
 */

import {useMutation, UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {toast} from "react-toastify";
import {patchCheckoutTicket} from "@/domains/reservation/features/update-client-reservations/repositories";

type SubmitProps = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    /** Optional callback invoked after a successful checkout. */
    onSubmitSuccess?: () => void;
};

/**
 * Provides a mutation for checking out a ticket by its ID.
 *
 * @param props - Submission lifecycle handlers and optional toast messages.
 * @returns React Query mutation result for ticket checkout.
 */
export function useCheckoutTicketMutation(
    {onSubmitSuccess, onSubmitError, successMessage, errorMessage}: SubmitProps = {}
): UseMutationResult<void, unknown, ObjectId> {
    const checkout = async (_id: ObjectId) => {
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
        mutationKey: ["reservations", "tickets", "checkout"],
        mutationFn: checkout,
        onSuccess,
        onError,
    });
}
