/**
 * @fileoverview Aggregates reservation cancel and checkout mutations into a single stateful hook.
 */

import {MutationResponseConfig} from "@/common/_feat/submit-data";
import {UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    useCheckoutClientReservationMutation
} from "@/domains/reservations/_feat/update-client-reservations/mutations/useCheckoutClientReservationMutation.ts";
import {
    useCancelClientReservationMutation
} from "@/domains/reservations/_feat/update-client-reservations/mutations/useCancelClientReservationMutation.ts";

/** Props for the useReservationStateMutations hook. */
export type MutationParams = {
    onCancel?: MutationResponseConfig<void, ObjectId>;
    onCheckout?: MutationResponseConfig<void, ObjectId>;
}

/** Return values for the useReservationStateMutations hook. */
type ReturnParams = {
    cancelMutation: UseMutationResult<void, unknown, ObjectId>;
    checkoutMutation: UseMutationResult<void, unknown, ObjectId>;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
}

/** Combines reservation cancel and checkout mutations with shared loading and error states. */
export function useReservationStateMutations(
    {onCancel, onCheckout}: MutationParams = {}
): ReturnParams {
    const cancelMutation = useCancelClientReservationMutation(onCancel);
    const checkoutMutation = useCheckoutClientReservationMutation(onCheckout);

    const mutations = [cancelMutation, checkoutMutation];

    const isPending = mutations.some((m) => m.isPending);
    const isSuccess = mutations.some((m) => m.isSuccess);
    const isError = mutations.some((m) => m.isError);

    return {
        cancelMutation,
        checkoutMutation,
        isPending,
        isSuccess,
        isError
    };
}
