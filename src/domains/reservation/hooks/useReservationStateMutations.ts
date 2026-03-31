/**
 * @file useReservationStateMutations.ts
 * Aggregates reservation cancel and checkout mutations.
 */

import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {UseMutationResult} from "@tanstack/react-query";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {
    useCancelClientReservationMutation,
    useCheckoutClientReservationMutation
} from "src/domains/reservation/features/update-client-reservations/mutations";

/**
 * Mutation params with optional success handler.
 */
type NoReturnParams = Omit<MutationOnSubmitParams, "onSubmitSuccess"> & {
    onSubmitSuccess?: () => void;
};

/**
 * Props for useReservationStateMutations
 */
type MutationParams = {
    onCancel?: NoReturnParams;
    onCheckout?: NoReturnParams;
}

/**
 * Return values for useReservationStateMutations
 */
type ReturnParams = {
    cancelMutation: UseMutationResult<void, unknown, ObjectId>;
    checkoutMutation: UseMutationResult<void, unknown, ObjectId>;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
}

/**
 * Combines reservation cancel and checkout mutations with shared state.
 */
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
